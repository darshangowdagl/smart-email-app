import os
import re
from groq import Groq
from dotenv import load_dotenv

load_dotenv()
client = Groq(api_key=os.getenv("OOAD_AI_API_KEY"))

def format_reply(response: str):
    # Remove the <think> part if it exists
    response = re.sub(r"<think>.*?</think>\n\n", "", response, flags=re.DOTALL)
    
    # Extract the Subject
    subject_match = re.search(r"(?i)\*\*Subject:\*\* (.+)", response)
    subject = subject_match.group(1).strip() if subject_match else "No Subject Found"
    
    # Extract the Body
    body_match = re.search(r"(?i)\*\*Subject:\*\* .+\n\n(.+?)\n\nBest regards,", response, flags=re.DOTALL)
    body = body_match.group(1).strip() if body_match else "No Body Found"
    
    # Extract the Signature
    signature_match = re.search(r"(?i)Best regards,\s*\n(.+)", response, flags=re.DOTALL)
    signature = signature_match.group(1).strip() if signature_match else "No Signature Found"
    
    return {
        "Subject": subject,
        "Body": body,
        "Signature": signature
    }


def generate_reply(text: str):
    response = client.chat.completions.create(
        model="deepseek-r1-distill-llama-70b",
        messages=[{"role": "system", "content": "Generate a professional and relevant reply to this email. Make sure to format the email into Subject, Body, and Signature. The reply should be concise and to the point."},
                  {"role": "user", "content": text}]
    )
    return format_reply(response.choices[0].message.content)
