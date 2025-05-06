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
async def analyze_code(request: AnalyzeRequest, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    ai_result = await analyze_code_with_ai(request.code, request.language)

    new_analysis = Analysis(
        code=request.code,
        result=ai_result,
        language=request.language,
        user_id=current_user.id
    )
    db.add(new_analysis)
    db.commit()
    db.refresh(new_analysis)

    return new_analysis


@router.get("/history", response_model=List[AnalyzeResponse])
def get_analysis_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return db.query(Analysis).filter(Analysis.user_id == current_user.id).order_by(Analysis.created_at.desc()).all()