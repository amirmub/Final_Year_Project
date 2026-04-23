const axios = require("axios");
exports.checkSimilarity = async (text, title, studentName) => {
  try {
    const res = await axios.post(
      "https://abdinkoo-abdinan-kebede.hf.space/check_plagiarism",
      {
        text,
        title: title || "Project Title",
        student_name: studentName || "Student",
        year: "2026",
      },
      {
        timeout: 10000, // 10 seconds max
      },
    );

    return res.data.reports || [];
  } catch (error) {
    console.error("AI ERROR FULL:", error);

    return [
      { similarity_percent: 0, gemini_report: "AI service unavailable" },
      { similarity_percent: 0, gemini_report: "AI service unavailable" },
      { similarity_percent: 0, gemini_report: "AI service unavailable" },
    ];
  }
};
