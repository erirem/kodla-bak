import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=API_KEY)

model = genai.GenerativeModel("models/gemini-1.5-pro")

async def analyze_code_with_ai(code: str, language: str) -> dict:
    prompt = f"""
Sen deneyimli bir yazılım mentorusun. Öğrencinin yazdığı {language} kodunu değerlendir:

1. Kod ne yapıyor?
2. SOLID veya Clean Code prensiplerine göre hatalar var mı?
3. Kodun hangi bölümleri geliştirilmeli?
4. Daha iyi bir çözüm ya da refactor önerin var mı?

Kod önerisi yaparsan markdown formatında, üçlü tırnak (```) içinde göster.
Ayrıca bu analizi özetleyen kısa bir başlık üret:
Başlık: [5-6 kelimelik başlık]

Kod:
{code}
    """
    try:
        response = model.generate_content(prompt)
        text = response.text

        lines = text.strip().split("\n")
        title_line = next((line for line in lines if line.lower().startswith("başlık:")), "Başlık: Analiz")
        title = title_line.replace("Başlık:", "").strip()

        body = "\n".join([line for line in lines if not line.lower().startswith("başlık:")])

        return {
            "title": title,
            "result": body
        }
    except Exception as e:
        print("Gemini hatası:", e)
        return {
            "title": "Analiz Hatası",
            "result": "AI'dan yanıt alınamadı."
        }
