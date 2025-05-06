from fastapi import APIRouter, Depends, HTTPException
from app.schemas.code import CodeInput
from app.services.gemini_service import analyze_code_with_ai

router = APIRouter()

@router.post("/")
async def analyze_code(code_input: CodeInput):

    result = await analyze_code_with_ai(code_input.code, code_input.language)
    if not result:
        raise HTTPException(status_code=500, detail="Kod analizi başarısız.")
    return {"result": result}
