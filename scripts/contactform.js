document
  .getElementById("contact-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Check if form is locked
    const lastSubmitTime = localStorage.getItem('lastFormSubmit');
    const cooldownPeriod = 2 * 60 * 1000; // 2 minutes in milliseconds
    
    if (lastSubmitTime && Date.now() - parseInt(lastSubmitTime) < cooldownPeriod) {
      const remainingTime = Math.ceil((parseInt(lastSubmitTime) + cooldownPeriod - Date.now()) / 1000);
      alert(`Please wait ${remainingTime} seconds before submitting again.`);
      return;
    }

    try {
      // Get reCAPTCHA token
      const token = await grecaptcha.execute('6LfMYKcqAAAAAI_7AXyr5QhmMKvip8VjV4zdoRoN', {action: 'submit'});

      // Collect form data
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
        recaptchaToken: token
      };

      // Disable submit button while processing
      const submitButton = this.querySelector('button[type="submit"]');
      submitButton.disabled = true;

      // Send data to your API
      const response = await fetch(
        "https://mpvaohi1pc.execute-api.us-east-1.amazonaws.com/prod/m",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        // Store submission time
        localStorage.setItem('lastFormSubmit', Date.now().toString());
        
        // Clear the form fields
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";
        document.getElementById("char-count").textContent = "0/700";
        
        alert("Your message has been sent successfully!");
        
        // Start cooldown timer
        updateCooldownTimer();
      } else {
        const errorData = await response.json();
        alert(`Failed to send message: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert(
        "A client LOGIC error occurred while sending your message. Please try again later."
      );
    } finally {
      // Re-enable submit button
      const submitButton = this.querySelector('button[type="submit"]');
      submitButton.disabled = false;
    }
  });

// Add this function to update the cooldown timer
function updateCooldownTimer() {
  const submitButton = document.querySelector('#contact-form button[type="submit"]');
  const lastSubmitTime = parseInt(localStorage.getItem('lastFormSubmit'));
  const cooldownPeriod = 2 * 60 * 1000; // 2 minutes in milliseconds

  if (lastSubmitTime) {
    const updateTimer = () => {
      const now = Date.now();
      const timeElapsed = now - lastSubmitTime;
      const timeRemaining = cooldownPeriod - timeElapsed;

      if (timeRemaining > 0) {
        const secondsRemaining = Math.ceil(timeRemaining / 1000);
        submitButton.textContent = `Wait ${secondsRemaining}s`;
        submitButton.disabled = true;
        setTimeout(updateTimer, 1000);
      } else {
        submitButton.textContent = 'Send';
        submitButton.disabled = false;
        localStorage.removeItem('lastFormSubmit');
      }
    };

    updateTimer();
  }
}

// Add this line to check cooldown status when page loads
document.addEventListener('DOMContentLoaded', updateCooldownTimer);