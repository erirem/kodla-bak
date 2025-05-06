# app/schemas/analyze.py
from pydantic import BaseModel

class AnalyzeRequest(BaseModel):
    code: str
    language: str

class AnalyzeResponse(BaseModel):
    result: str
