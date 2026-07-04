# 🎭 MockForge

[![GitHub License](https://img.shields.io/github/license/H8rsh100/mockforge?style=for-the-badge&color=blue)](LICENSE)
[![Python Version](https://img.shields.io/badge/python-3.10%20%7C%203.11%20%7C%203.12-green?style=for-the-badge&logo=python)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Gemini](https://img.shields.io/badge/Gemini-1.5%20Flash-8E75C2?style=for-the-badge&logo=google-gemini&logoColor=white)](https://deepmind.google/technologies/gemini/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)](https://react.dev/)

> **"Practice makes perfect. MockForge leverages Google's Gemini LLMs to simulate production-grade technical interviewers, providing real-time evaluation, scoring, and tailored feedback."**

MockForge is an AI-powered simulation platform for technical interviews. It generates role-specific interview questions, analyzes typed candidate responses, scores answers from 1-10, and presents actionable recommendations for improvement.

---

## 🗺️ Architectural Workflow

```mermaid
graph TD
    A[Candidate Setup] -->|Selects Role & Difficulty| B[React Frontend]
    B -->|POST /generate-questions| C[FastAPI Backend]
    C -->|Orchestrate Prompt| D[Gemini 1.5 Flash 8b]
    D -->|Return JSON Questions List| C
    C -->|Receive Questions Array| B
    
    B -->|Submit Answer| E[POST /evaluate-answer]
    E -->|Analyze Content & Grade| D
    D -->|Return Detailed Feedback JSON| E
    E -->|Render Evaluation Dashboard| B
```

---

## ✨ Features

- **Dynamic Question Synthesis**: Role-specific, difficulty-tuned question generation utilizing structured LLM outputs.
- **Detailed Scoring Matrix**: Immediate grading from 0 to 10 on correctness, depth, and domain knowledge.
- **Micro-Feedback System**: Separates strong points, areas of improvement, and concrete advice in 2-3 sentences.
- **Minimalist Modern Dark UI**: Sleek terminal-inspired UI themed around clean, zero-distraction focus.

---

## 📂 Repository Structure

```
mockforge/
├── frontend/          # React + Tailwind + Vite Interface
├── backend/           # Python FastAPI Server
└── README.md
```

---

## ⚙️ Configuration & Environment Setup

Create a `.env` file in the `backend/` directory:

```bash
GEMINI_API_KEY=your_google_gemini_api_key
```

---

## 🚀 Running mockforge locally

### 1. Backend Server Setup
Requires Python 3.10+.

```bash
cd backend
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start backend server
python -m uvicorn main:app --port 8000 --reload
```

Backend API will be running on `http://localhost:8000`. You can inspect Swagger schemas at `http://localhost:8000/docs`.

### 2. Frontend Dashboard Setup

```bash
cd frontend
# Install dependencies
npm install

# Start local server
npm run dev
```

Open `http://localhost:5173/` to practice your interviews.

---

## 🤝 License

Distributed under the [MIT License](LICENSE).
