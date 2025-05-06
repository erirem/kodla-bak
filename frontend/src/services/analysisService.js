import api from "./api";

export const analyzeCode = async (code, language) => {
  const response = await api.post("/analyze", { code, language });
  return response.data;
};

export const fetchHistory = async () => {
  const response = await api.get("/history");
  return response.data;
};
