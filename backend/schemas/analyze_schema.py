from pydantic import BaseModel
from datetime import datetime


class AnalyzeRequest(BaseModel):
    code: str
    language: str


class AnalyzeResponse(BaseModel):
    id: int
    title: str
    result: str


class AnalyzeHistoryResponse(BaseModel):
    id: int
    title: str
    code: str
    result: str
    language: str
    created_at: datetime
