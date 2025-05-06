// src/pages/History.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";

function History() {
  const [history, setHistory] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("http://localhost:8000/analyze/history", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setHistory(res.data);
      } catch (err) {
        console.error("Geçmiş yüklenemedi", err);
      }
    };

    fetchHistory();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Analiz Geçmişi 📚</h1>

      {history.map((item) => {
        const [description, codeBlock] = item.result.split("```");

        return (
          <div key={item.id} className="mb-4 border rounded-lg bg-white shadow">
            <button
              onClick={() => toggleExpand(item.id)}
              className="w-full text-left px-4 py-3 bg-indigo-100 hover:bg-indigo-200 font-semibold rounded-t"
            >
              {item.title} — <span className="text-sm text-gray-600">{new Date(item.created_at).toLocaleString()}</span>
            </button>

            {expandedId === item.id && (
              <div className="p-4 space-y-4">
                <ReactMarkdown
                  components={{
                    h2: ({node, ...props}) => <h2 className="text-xl font-bold my-2" {...props} />,
                    p: ({node, ...props}) => <p className="mb-2 leading-relaxed" {...props} />,
                    li: ({node, ...props}) => <li className="list-disc ml-6 mb-1" {...props} />,
                  }}
                >
                  {description}
                </ReactMarkdown>

                {codeBlock && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm text-blue-600 hover:underline">
                      Kod Önerisini Göster
                    </summary>
                    <SyntaxHighlighter language={item.language} style={oneDark} className="mt-2 rounded">
                      {codeBlock}
                    </SyntaxHighlighter>
                  </details>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default History;
