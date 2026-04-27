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
      }
    );

    //  DEBUG (remove in production)
    console.log(" FULL AI RESPONSEs:", res.data);

    const results = res.data?.results || [];

    // Map API response → your schema
    return results.map((r) => ({
      similarity_percent: r.similarity || 0,
      gemini_report: r.ai_analysis || "No AI analysis",
    }));

  } catch (error) {
    console.error("❌ AI ERROR FULL:", error?.response?.data || error.message);

    return [
      { similarity_percent: 0, gemini_report: "AI service unavailable" },
      { similarity_percent: 0, gemini_report: "AI service unavailable" },
      { similarity_percent: 0, gemini_report: "AI service unavailable" },
    ];
  }
};