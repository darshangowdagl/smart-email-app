import re
import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()
client = Groq(api_key=os.getenv("OOAD_AI_API_KEY"))

def remove_think_content(response: str) -> str:
    # Use regex to remove everything between <think> and </think>\n\n
    cleaned_response = re.sub(r"<think>.*?</think>\n\n", "", response, flags=re.DOTALL)
    return cleaned_response

def summarize_email(text: str):
    response = client.chat.completions.create(
        model="deepseek-r1-distill-llama-70b",
        messages=[{"role": "system", 
                   "content": "Summarize the following email in a concise and professional manner. Respond only with the summary, STRICTLY don't include the <think> tags and ensure it is shorter and a perfect brief of the original text."},
                  {"role": "user", "content": text}]
    )
    # print(response.choices[0].message.content)
    return remove_think_content(response.choices[0].message.content)


