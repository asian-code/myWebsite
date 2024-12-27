document
  .getElementById("contact-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

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
        alert("Your message has been sent successfully!");
        document.getElementById("char-count").textContent = "0/700";
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