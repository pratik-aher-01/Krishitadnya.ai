from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd

app = FastAPI()

# Load knowledge base
kb = pd.read_csv("knowledge.csv")

class Query(BaseModel):
    question: str

def search_knowledge_base(query):
    for _, row in kb.iterrows():
        if row["problem"] in query or row["crop"] in query:
            return row["solution"]
    return "क्षमस्व, सध्या उत्तर उपलब्ध नाही. कृपया कृषी अधिकारीशी संपर्क साधा."

@app.get("/")
def root():
    return {"message": "🌱 Marathi Farmer AI is running!"}

@app.post("/ask")
def ask_farmer(query: Query):
    answer = search_knowledge_base(query.question)
    return {"answer": answer}
