import React, { useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import FilterableCandidateCards from "../components/FilterableCandidateCards";

function Main({ shortlistedCandidates, onShortlist }) {
  const [sentence, setSentence] = useState("");
  const [extractedInfo, setExtractedInfo] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [searchInitiated, setSearchInitiated] = useState(false);

  const handleExtract = async () => {
    try {
      setIsFetching(true);
      setSearchInitiated(true);
      const response = await fetch("http://localhost:8000/api/v1/search/gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sentence }),
      });

      const data = await response.json();
      const extractedInfoObj = JSON.parse(data.extractedInfo);

      setExtractedInfo(extractedInfoObj);
      setIsFetching(false);
    } catch (error) {
      console.error("Error extracting keywords:", error);
      setIsFetching(false);
    }
  };

  return (
    <div
      className="w-full max-h-screen overflow-auto flex flex-col items-center justify-start p-8"
      style={{ background: "#f8f9fa" }} // Updated to a light background
    >
      {/* Search Box */}
      <div className={`relative w-full sm:w-1/2 lg:w-3/4 mb-6 transition-all duration-700 ease-in-out ${searchInitiated ? "fixed bottom-0 z-50" : ""}`}>
        <input
          type="text"
          placeholder="Search for candidates, e.g. Python Developer in Delhi with 5 years experience"
          className="w-full px-5 py-4 pr-14 rounded-full bg-white text-gray-800 shadow-lg border-2 border-gray-300 hover:border-gray-400 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all duration-500 ease-in-out"
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleExtract()}
        />
        <button
          className="absolute right-4 z-40 top-1/2 transform -translate-y-1/2 border-2 border-gray-300 bg-gradient-to-r from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500 text-white p-2 rounded-full transition-all duration-500 ease-in-out hover:shadow-lg hover:scale-110"
          onClick={handleExtract}
        >
          <SearchIcon className="w-5 h-5 text-gray-700 transition-transform duration-500 ease-in-out" />
        </button>
      </div>

      {/* Show loading state */}
      {isFetching && <p className="text-gray-500 mt-4">Fetching candidates...</p>}

      {/* Render FilterableCandidateCards */}
      {extractedInfo && (
        <div className="mt-16 w-full">
          <FilterableCandidateCards
            searchLocation={extractedInfo.location || []}
            searchEducation={extractedInfo.education || []}
            searchSkills={extractedInfo.skills || []}
            searchJobTitles={extractedInfo["job titles"] || []}
            shortlistedCandidates={shortlistedCandidates} // Pass the shortlisted candidates from props
            onShortlist={onShortlist} // Pass shortlist handler from props
          />
        </div>
      )}
    </div>
  );
}

export default Main;
