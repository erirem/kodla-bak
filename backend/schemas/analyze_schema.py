from pydantic import BaseModel
from datetime import datetime

class AnalyzeRequest(BaseModel):
    code: str
    language: str

class AnalyzeResponse(BaseModel):
    id: int
    title: str
    result: str
    created_at: datetime
