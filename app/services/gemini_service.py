import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=API_KEY)

for m in genai.list_models():
    print(m.name, m.supported_generation_methods)
model = genai.GenerativeModel("models/gemini-1.5-pro")

async def analyze_code_with_ai(code: str, language: str) -> str:
    prompt = f"""
Sen deneyimli bir yazılım mentorusun. Öğrencinin yazdığı {language} kodunu değerlendir:

1. Kod ne yapıyor?
2. SOLID veya Clean Code prensiplerine göre hatalar var mı?
3. Kodun hangi bölümleri geliştirilmeli?
4. Daha iyi bir çözüm ya da refactor önerin var mı?

Kod: {code}
"""

    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print("Gemini hatası:", e)
        return None
