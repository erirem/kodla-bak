import React, { useEffect, useState } from "react";
import axios from "axios";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/analyze/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHistory(response.data);
      } catch (error) {
        console.error("Geçmiş yüklenemedi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Kod Analiz Geçmişi</h2>
      {history.length === 0 ? (
        <p>Henüz analiz yapılmamış.</p>
      ) : (
        <ul className="space-y-4">
          {history.map((item) => (
            <li key={item.id} className="p-4 border rounded bg-white shadow">
              <p className="text-sm text-gray-500 mb-1">
                {new Date(item.created_at).toLocaleString()}
              </p>
              <pre className="bg-gray-100 p-2 rounded mb-2 overflow-x-auto">
                {item.code}
              </pre>
              <p><strong>Sonuç:</strong> {item.result}</p>
              <p className="text-sm text-right italic text-gray-500">{item.language.toUpperCase()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
