import React, { useState } from "react";
import SearchModal from "./SearchModal"; 

function KeywordExtractor({ setSavedSearches,savedSearches }) {
  const [sentence, setSentence] = useState("");
  const [extractedInfo, setExtractedInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedQuery, setGeneratedQuery] = useState("");

  const handleGoToGoogle = (generatedQuery) => {
    window.open(generatedQuery, "_blank");
  };

  const generateLink = (extractedInfo) => {
    const baseURL = "https://www.google.com/search?q=";
  
    const queryParts = [
      extractedInfo["job titles"]?.length ? `${extractedInfo["job titles"].join(" OR ")}` : "",
      extractedInfo.location?.length ? `${extractedInfo.location.join(" ")}` : "",
      extractedInfo.education?.length ? `${extractedInfo.education.join(" ")}` : "",
      extractedInfo["experience year"]?.length ? `${extractedInfo["experience year"].join(" ")} years experience` : "",
      extractedInfo.skills?.length ? `${extractedInfo.skills.join(", ")}` : "",
      extractedInfo.gender?.length ? `${extractedInfo.gender.join(" ")}` : "",
      `-intitle:profiles`,
      `-inurl:dir/`,
      `(site:in.linkedin.com/in/ OR site:in.linkedin.com/pub/ OR (site:twitter.com -inurl:(search|favorites|status|statuses|jobs) -intitle:(job|jobs) -recruiter -HR -careers))`,
    ];
  
    const query = queryParts.filter(Boolean).join(" ");
  
    return `${baseURL}${encodeURIComponent(query)}`;
  };

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

      let extractedInfo;
      try {
        extractedInfo = JSON.parse(data.extractedInfo);
      } catch (e) {
        console.error("Failed to parse extractedInfo:", e);
        extractedInfo = {};
      }

      setExtractedInfo(extractedInfo);

      const generatedQuery = generateLink(extractedInfo);
      setGeneratedQuery(generatedQuery);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error extracting keywords:", error);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedQuery);
  };



  const handleSaveSearch = () => {
    const link = generatedQuery;
    if (link && !savedSearches.some((search) => search.link === link)) {
      const updatedSearches = [...savedSearches, { jobTitle:extractedInfo["job titles"], link }];
      setSavedSearches(updatedSearches);
      localStorage.setItem("savedSearches", JSON.stringify(updatedSearches));
      setIsModalOpen(false);
    }
  };

  const handleOpenGoogle = () => {
    handleGoToGoogle(generatedQuery);
  };

  return (
    <div className="mb-4">
      <form className="grid grid-cols-1 gap-6">
        <div className="relative flex flex-col">
          <input
            type="text"
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
            className="p-4 bg-white/10 text-white border border-transparent rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-white/70 transition-all duration-300"
            placeholder="e.g., I am looking for a Python developer who lives in Delhi and has 5 years experience"
          />
        </div>
      </form>
      <div className="mt-8">
        <button
          type="button"
          onClick={handleExtract}
          className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-pink-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 text-white py-3 px-8 rounded-full shadow-lg"
        >
          Find Profiles
        </button>
      </div>
      <div className="mt-8">
        <h2 className="font-semibold text-white mb-2">Extracted Information:</h2>
        <pre className="bg-white/10 text-white p-4 rounded-lg shadow-lg">
          {extractedInfo ? JSON.stringify(extractedInfo, null, 2) : "No extracted information yet."}
        </pre>
      </div>

      {/* SearchModal Component */}
      <SearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        query={generatedQuery}
        onCopy={handleCopyLink}
        onSave={handleSaveSearch}
        onOpen={handleOpenGoogle}
      />
    </div>
  );
}

export default KeywordExtractor;
