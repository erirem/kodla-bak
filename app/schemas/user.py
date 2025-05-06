from pydantic import BaseModel, EmailStr, constr

class UserCreate(BaseModel):
    email: EmailStr
    password: constr(min_length=6)

class UserLogin(BaseModel):
    email: EmailStr
    password: str
