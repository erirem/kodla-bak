# app/api/analyze.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.analysis import Analysis
from app.models.user import User
from app.schemas.analyze import AnalyzeRequest, AnalyzeResponse
from app.utils.auth import get_current_user
from app.services.gemini_service import analyze_code_with_ai
from typing import List

router = APIRouter()

@router.post("/", response_model=AnalyzeResponse)
async def analyze_code(
    data: AnalyzeRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    ai_response = await analyze_code_with_ai(data.code, data.language)

    analysis = Analysis(
        title=ai_response["title"],
        code=data.code,
        result=ai_response["result"],
        language=data.language,
        user_id=current_user.id
    )
    db.add(analysis)
    db.commit()
    db.refresh(analysis)

    return {
        "id": analysis.id,
        "title": analysis.title,
        "result": analysis.result
    }


# app/api/analyze.py

@router.get("/history", response_model=List[AnalyzeResponse])
def get_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    analyses = db.query(Analysis).filter(Analysis.user_id == current_user.id).order_by(Analysis.created_at.desc()).all()
    return analyses
