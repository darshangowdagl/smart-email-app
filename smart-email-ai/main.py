from fastapi import FastAPI
from pydantic import BaseModel
import os
from groq import Groq
from dotenv import load_dotenv
from Summerizer import summarize_email
from Categorizer import categorize_email
from Reply_Generator import generate_reply

load_dotenv()
client = Groq(api_key=os.getenv("OOAD_AI_API_KEY"))

app = FastAPI()

class EmailRequest(BaseModel):
    text: str

@app.post("/ai-api/summarize")
def summarize(request: EmailRequest):
    return {"summary": summarize_email(request.text)}

@app.post("/ai-api/categorize")
def categorize(request: EmailRequest):
    return {"category": categorize_email(request.text)}

@app.post("/ai-api/suggestReply")
def suggest_reply(request: EmailRequest):
    return {"reply": generate_reply(request.text)}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 3000))  # fallback for local dev
    uvicorn.run(app, host="0.0.0.0", port=port)
