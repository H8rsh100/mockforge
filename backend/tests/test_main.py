from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
import json
import pytest

# Ensure dummy API key is present for import safety
import os
os.environ["GEMINI_API_KEY"] = "DUMMY_KEY"

from backend.main import app

client = TestClient(app)

def test_root_endpoint():
    """Verify that root livecheck message is correct."""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "MockForge API is live"}

@patch("backend.main.client.models.generate_content")
def test_generate_questions_endpoint(mock_generate_content):
    """Test question generator returns expected structure with mocked Gemini response."""
    # Mocking Gemini Client response
    mock_response = MagicMock()
    mock_response.text = '["Describe virtual DOM", "Explain hooks", "State vs Props", "FastAPI vs Flask", "Why Vite"]'
    mock_generate_content.return_value = mock_response

    response = client.post("/generate-questions", json={
        "role": "Frontend Engineer",
        "difficulty": "Mid"
    })
    
    assert response.status_code == 200
    data = response.json()
    assert "questions" in data
    assert len(data["questions"]) == 5
    assert data["questions"][0] == "Describe virtual DOM"
    
    # Assert model was called with correct structure
    mock_generate_content.assert_called_once()

@patch("backend.main.client.models.generate_content")
def test_evaluate_answer_endpoint(mock_generate_content):
    """Test candidate answer evaluator with mocked Gemini feedback response."""
    mock_response = MagicMock()
    mock_response.text = json.dumps({
        "score": 9,
        "feedback": "Excellent response explaining Virtual DOM rendering process.",
        "strong_points": "Accurate description of diffing algorithm.",
        "improvement": "Could mention key props role in list updates."
    })
    mock_generate_content.return_value = mock_response

    response = client.post("/evaluate-answer", json={
        "role": "Frontend Engineer",
        "question": "What is the Virtual DOM?",
        "answer": "It is a lightweight representation of the real DOM in memory."
    })

    assert response.status_code == 200
    data = response.json()
    assert data["score"] == 9
    assert "feedback" in data
    assert "strong_points" in data
    assert "improvement" in data
    mock_generate_content.assert_called_once()
