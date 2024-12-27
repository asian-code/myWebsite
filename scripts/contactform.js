 document.getElementById('contact-form').addEventListener('submit', async function(event) {
            event.preventDefault(); // Prevent the default form submission

            // Collect form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            try {
                // Send data to the API
                const response = await fetch('https://mpvaohi1pc.execute-api.us-east-1.amazonaws.com/prod/m', {
                    method: 'POST',
                    // mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                // Check if the response is successful
                if (response.ok) {
                    alert('Your message has been sent successfully!');
                } else {
                    const errorData = await response.json();
                    alert(`Failed to send message: ${errorData.message || 'Unknown error'}`);
                }
            } catch (error) {
                console.error('Error sending message:', error);
                alert('An error occurred while sending your message. Please try again later.');
            }
        });