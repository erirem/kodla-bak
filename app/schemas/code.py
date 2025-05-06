from pydantic import BaseModel

class CodeInput(BaseModel):
    code: str
    language: str  # Python, Solidity, JS vs.
