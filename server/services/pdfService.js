const pdfParse = require("pdf-parse");

exports.extractTextFromPDF = async (buffer) => {
  try {
    const data = await pdfParse(buffer);

    // console.log("✅ PDF extracted successfully");
    // console.log("📄 First 200 chars:", data.text.slice(0, 200));

    return data.text;
  } catch (error) {
    console.error("❌ PDF ERROR FULL:", error);
    return "";
  }
};