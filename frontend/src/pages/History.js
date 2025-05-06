import React, { useEffect, useState } from "react";
import { fetchHistory } from "../services/analysisService";
import HistoryItem from "../components/HistoryItem";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory()
      .then(setHistory)
      .catch((err) => console.error("Geçmiş yüklenemedi", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Analiz Geçmişi 📚</h1>

      {history.map((item) => (
        <HistoryItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default History;
