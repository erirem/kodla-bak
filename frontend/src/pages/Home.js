// src/pages/Home.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home({ onLogout }) {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/analyze",
        { code, language },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setResult(res.data.result);
    } catch (err) {
      setResult("⚠️ Analiz hatası.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">KodlaBak 🔍</h1>
        <div className="space-x-2">
          <button
            onClick={() => navigate("/history")}
            className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300"
          >
            Geçmiş
          </button>
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Çıkış Yap
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        <textarea
          className="w-full h-60 p-4 border border-gray-300 rounded-lg"
          placeholder="Kodunuzu buraya yazın..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <select
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
          <option value="csharp">C#</option>
        </select>

        <button
          onClick={handleSubmit}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg"
        >
          Analiz Et
        </button>

        {result && (
          <div className="bg-white p-4 mt-4 rounded-lg border">
            <h2 className="font-bold mb-2">AI Geri Bildirim:</h2>
            <pre className="whitespace-pre-wrap">{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
