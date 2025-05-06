# app/schemas/analyze.py
from pydantic import BaseModel
from datetime import datetime

class AnalyzeRequest(BaseModel):
    code: str
    language: str


class AnalyzeResponse(BaseModel):
    id: int
    code: str
    result: str
    language: str
    created_at: datetime

    class Config:
        orm_mode = True
