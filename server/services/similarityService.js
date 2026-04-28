const axios = require("axios");

// ✅ Professional Mock Report 
function generateProfessionalSummary(p, title, student, year) {
  const similarity = Number(p.similarity || 0);
  const source = p.source || "Unknown academic source";
  const author = p.author || "Unknown author";
  const sourceYear = p.source_year || "Unknown year";

  let riskLevel = "";
  let analysis = "";
  let recommendations = "";

  if (similarity >= 70) {
    riskLevel = "HIGH ❌";

    analysis = `
The reported similarity score of ${similarity}% for "${title}" is extremely high and raises serious concerns regarding academic integrity.

A significant portion of this work appears to match existing material from "${source}", authored by ${author} (${sourceYear}). This suggests that large sections may have been copied directly or insufficiently paraphrased.

Such similarity levels typically indicate a lack of originality and may violate university academic policies.
`;

    recommendations = `
1. Immediate investigation should be conducted.
2. The student must provide explanation for the high similarity.
3. All copied sections must be rewritten in original form.
4. Proper citations must be added for all referenced materials.
5. Supervisor review is required before resubmission.
6. Failure to reduce similarity may result in academic penalties.
`;
  }

  else if (similarity >= 40) {
    riskLevel = "MEDIUM ⚠️";

    analysis = `
The similarity score of ${similarity}% for "${title}" indicates a moderate level of overlap with existing academic sources.

The detected source "${source}" (${author}, ${sourceYear}) suggests that some parts of the document may be closely aligned with previously published work. This may be due to weak paraphrasing or missing citations.

While not necessarily full plagiarism, the document requires careful revision.
`;

    recommendations = `
1. Review all highlighted sections carefully.
2. Improve paraphrasing using original wording.
3. Add proper citations for borrowed ideas.
4. Expand on personal analysis and implementation.
5. Consult supervisor for feedback.
6. Recheck similarity after revision.
`;
  }

  else {
    riskLevel = "LOW ✅";

    analysis = `
The similarity score of ${similarity}% for "${title}" is relatively low and generally acceptable.

The minor overlap with "${source}" (${author}, ${sourceYear}) may result from common academic phrases, definitions, or properly referenced materials.

The document appears to maintain a good level of originality.
`;

    recommendations = `
1. Perform a final review of matched sections.
2. Ensure all references are properly cited.
3. Maintain originality in explanations.
4. Improve clarity and formatting where needed.
5. The project is acceptable if other requirements are met.
`;
  }

  return `
📘 Academic Plagiarism Report – Jimma University

📄 Project Title: ${title}
👨‍🎓 Student: ${student}
📅 Year: ${year}

📊 Similarity Score: ${similarity}%
🚦 Risk Level: ${riskLevel}

📚 Source Details:
- Source Title: ${source}
- Author: ${author}
- Year: ${sourceYear}

🧠 Analysis:
${analysis}

📌 Recommendations:
${recommendations}
`;
}

// ✅ CALL API ONCE
exports.checkSimilarity = async (text, title, studentName) => {
  try {
    const res = await axios.post(
      "https://abdinkoo-abdinan-kebede.hf.space/check_plagiarism",
      {
        text,
        title,
        student_name: studentName,
        year: "2026",
      }
    );

    // console.log("✅ FULL API:", res.data);

    return res.data?.results || [];
  } catch (error) {
    console.error("❌ API ERROR:", error.message);

    return [];
  }
};

exports.generateProfessionalSummary = generateProfessionalSummary;