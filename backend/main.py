from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv
import os
import json

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class QuestionRequest(BaseModel):
    role: str
    difficulty: str

class EvaluateRequest(BaseModel):
    role: str
    question: str
    answer: str

@app.post("/generate-questions")
async def generate_questions(req: QuestionRequest):
    prompt = f"""
    You are a senior technical interviewer.
    Generate exactly 5 interview questions for a {req.role} position at {req.difficulty} difficulty.
    Return ONLY a JSON array of 5 strings, no extra text, no markdown.
    Example: ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5"]
    """
    response = model.generate_content(prompt)
    questions = json.loads(response.text.strip())
    return {"questions": questions}

@app.post("/evaluate-answer")
async def evaluate_answer(req: EvaluateRequest):
    prompt = f"""
    You are a senior technical interviewer evaluating a candidate for a {req.role} position.
    Question: {req.question}
    Candidate's Answer: {req.answer}
    
    Evaluate the answer and return ONLY a JSON object with no extra text, no markdown:
    {{
        "score": <integer from 0 to 10>,
        "feedback": "<2-3 sentences of constructive feedback>",
        "strong_points": "<what they did well>",
        "improvement": "<what they should improve>"
    }}
    """
    response = model.generate_content(prompt)
    result = json.loads(response.text.strip())
    return result

@app.get("/")
async def root():
    return {"message": "MockForge API is live"}