import json
import requests
import os
from typing import Dict, Any

def verify_recaptcha(token: str) -> bool:
    """
    Verify the reCAPTCHA token with Google's API.
    
    Args:
        token (str): The reCAPTCHA token to verify.
        
    Returns:
        bool: True if verification successful, False otherwise.
    """
    recaptcha_secret = os.environ.get('RECAPTCHA_SECRET_KEY')
    if not recaptcha_secret:
        raise ValueError("reCAPTCHA secret key not configured")

    verification_url = "https://www.google.com/recaptcha/api/siteverify"
    response = requests.post(
        verification_url,
        data={
            'secret': recaptcha_secret,
            'response': token
        },
        timeout=5
    )
    
    result = response.json()
    return result.get('success', False) and result.get('score', 0) >= 0.5  # Adjust threshold as needed

def lambda_handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    AWS Lambda function to process incoming JSON and send it to a Discord webhook.
    Includes reCAPTCHA verification and character limits.
    """
    # Get webhook URL from environment variable
    discord_webhook_url = os.environ.get('DISCORD_WEBHOOK_URL')
    if not discord_webhook_url:
        return {
            "statusCode": 500,
            "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "https://www.eric-n.com"
                    },
            "body": json.dumps({
                "message": "Discord webhook URL not configured"
            })
        }

    try:
        # Validate required fields
        required_fields = ["name", "email", "message", "recaptchaToken"]
        if not all(field in event for field in required_fields):
            return {
                "statusCode": 400,
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "https://www.eric-n.com"
                    },
                "body": json.dumps({
                    "message": "Missing required fields",
                    "required": required_fields
                })
            }
            
        # Verify reCAPTCHA first
        if not verify_recaptcha(event["recaptchaToken"]):
            return {
                "statusCode": 400,
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "https://www.eric-n.com"
                    },
                "body": json.dumps({
                    "message": "reCAPTCHA verification failed"
                })
            }

        # Validate field lengths
        field_limits = {
            "name": 50,
            "email": 70,
            "message": 700
        }
        
        for field, limit in field_limits.items():
            if len(event[field]) > limit:
                return {
                    "statusCode": 400,
                    "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "https://www.eric-n.com"
                    },
                    "body": json.dumps({
                        "message": f"{field.capitalize()} exceeds maximum length of {limit} characters",
                        "current_length": len(event[field])
                    })
                }

        # Create the message payload for Discord
        discord_message = {
            "embeds": [{
                "title": "New Contact Form Submission",
                "color": 5814783,  # Blue color
                "fields": [
                    {
                        "name": "Name",
                        "value": event["name"],
                        "inline": True
                    },
                    {
                        "name": "Email",
                        "value": event["email"],
                        "inline": True
                    },
                    {
                        "name": "Message",
                        "value": event["message"]
                    }
                ]
            }]
        }

        # Send the data to Discord webhook
        response = requests.post(
            discord_webhook_url,
            headers={"Content-Type": "application/json"},
            json=discord_message,
            timeout=5
        )

        # Check if request was successful
        response.raise_for_status()
        
        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "https://www.eric-n.com"
            },
            "body": json.dumps({
                "message": "Message sent successfully"
            })
        }

    except requests.exceptions.RequestException as e:
        return {
            "statusCode": 502,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "https://www.eric-n.com"
            },
            "body": json.dumps({
                "message": "Failed to send message to Discord",
                "error": str(e)
            })
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "https://www.eric-n.com"
            },
            "body": json.dumps({
                "message": "Internal server error",
                "error": str(e)
            })
        }