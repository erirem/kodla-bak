export const parseAnalysisResult = (raw) => {
  const parts = raw.split("```");
  return {
    text: parts[0],
    code: parts[1] || "",
  };
};
