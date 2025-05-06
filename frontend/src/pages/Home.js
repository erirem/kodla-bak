import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from 'react-markdown';
import { analyzeCode } from "../services/analysisService";
import { parseAnalysisResult } from "../utils/parseResult";
import MarkdownRenderer from "../components/MarkdownRenderer";

function Home({ onLogout }) {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [resultText, setResultText] = useState("");
  const [codeBlock, setCodeBlock] = useState("");
  const [showCodeBlock, setShowCodeBlock] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
  setLoading(true);
  try {
    const data = await analyzeCode(code, language);
    const { text, code: suggestion } = parseAnalysisResult(data.result);
    setResultText(text);
    setCodeBlock(suggestion);
    setShowCodeBlock(false);
  } catch (err) {
    setResultText("⚠️ Analiz hatası.");
    setCodeBlock("");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
       <h1 className="text-3xl font-extrabold tracking-tight text-indigo-600">KodlaBak 🔍</h1>
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
          className="w-full h-60 p-4 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Kodunuzu buraya yazın..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <select
          className="w-full p-3 border border-gray-300 rounded-lg bg-white shadow-sm"
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
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium shadow transition hover:shadow-lg disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Analiz Ediliyor..." : "Analiz Et"}
          </button>
        {loading && (
  <div className="flex items-center justify-center text-sm text-gray-500 mt-2">
    <svg className="animate-spin h-5 w-5 mr-2 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
    Kod analiz ediliyor...
  </div>
)}


        {(resultText || codeBlock) && (
          <div className="bg-white p-4 mt-4 rounded-lg border">
          <h2 className="text-lg font-semibold text-indigo-700 border-l-4 border-indigo-600 pl-4 mb-3">AI Geri Bildirim</h2>

            <MarkdownRenderer>{resultText}</MarkdownRenderer>

            {codeBlock && (
              <>
                <button
                  onClick={() => setShowCodeBlock((prev) => !prev)}
                  className="mb-2 text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded"
                >
                  {showCodeBlock ? "Kod Önerisini Gizle" : "Kod Önerisi"}
                </button>

                {showCodeBlock && (
                  <SyntaxHighlighter
                    language={language}
                    style={oneDark}
                    customStyle={{ borderRadius: "0.5rem" }}
                  >
                    {codeBlock}
                  </SyntaxHighlighter>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
