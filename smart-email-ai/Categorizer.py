import os
import re
from groq import Groq
from dotenv import load_dotenv

load_dotenv()
client = Groq(api_key=os.getenv("OOAD_AI_API_KEY"))

def remove_think_content(response: str) -> str:
    # Use regex to remove everything between <think> and </think>\n\n
    cleaned_response = re.sub(r"<think>.*?</think>\n\n", "", response, flags=re.DOTALL)
    return cleaned_response

def categorize_email(text: str):
    response = client.chat.completions.create(
        model="deepseek-r1-distill-llama-70b",
        messages=[{"role": "system", "content": "(Respond only with Output)Categorize this email as Work, Personal, Spam, or Promotions."},
                  {"role": "user", "content": text}]
    )
    return remove_think_content(response.choices[0].message.content)
