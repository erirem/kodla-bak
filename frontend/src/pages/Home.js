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

  const handleSubmit = async () => {
  try {
    const data = await analyzeCode(code, language);
    const { text, code: suggestion } = parseAnalysisResult(data.result);
    setResultText(text);
    setCodeBlock(suggestion);
    setShowCodeBlock(false);
  } catch (err) {
    setResultText("⚠️ Analiz hatası.");
    setCodeBlock("");
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

        {(resultText || codeBlock) && (
          <div className="bg-white p-4 mt-4 rounded-lg border">
            <h2 className="font-bold mb-2">AI Geri Bildirim:</h2>

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
