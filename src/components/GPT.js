import React, { useState } from "react";

function KeywordExtractor() {
  const [sentence, setSentence] = useState("");
  const [extractedInfo, setExtractedInfo] = useState("");

  const handleExtract = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/search/gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sentence }),
      });

      const data = await response.json();
      setExtractedInfo(data.extractedInfo);
    } catch (error) {
      console.error("Error extracting keywords:", error);
    }
  };

  return (
    <>
      <form className="grid grid-cols-1 gap-6">
        <div className="relative flex flex-col">
          <label className="font-semibold text-white mb-2">Search :</label>
          <input
            type="text"
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
            className="p-4 bg-white/10 text-white border border-transparent rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-white/70 transition-all duration-300"
            placeholder="e.g., I am looking for a Python developer who lives in Delhi and has 5 years experience"
          />
          <div className="absolute top-3/4 right-6 text-xl transform -translate-y-3/4 text-white/40 pointer-events-none"></div>
        </div>
      </form>
      <div className="mt-8">
        <button
          type="button"
          onClick={handleExtract}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-8 rounded-full shadow-lg hover:from-cyan-400 hover:to-blue-500 transition duration-300 transform hover:scale-105"
        >
          Extract Keywords
        </button>
      </div>
      <div className="mt-8">
        <h2 className="font-semibold text-white mb-2">Extracted Information:</h2>
        <pre className="bg-white/10 text-white p-4 rounded-lg shadow-lg">{extractedInfo}</pre>
      </div>
    </>
  );
}

export default KeywordExtractor;
