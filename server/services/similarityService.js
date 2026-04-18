const axios = require("axios");

exports.checkSimilarity = async (text) => {
  try {
    const res = await axios.post(
      "https://abdinan-jimma.hf.space/check_plagiarism",
      {
        text,
        title: "Project Title",
        student_name: "Student",
        year: "2026",
      }
    );

    return {
      similarity_percent: res.data.similarity_percent,
      gemini_report: res.data.gemini_report || "",
    };

  } catch (error) {
    console.error("AI ERROR:", error.message);
    return {
      similarity_percent: 0,
      gemini_report: "AI unavailable",
    };
  }
};