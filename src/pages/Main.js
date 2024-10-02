import React, { useState } from "react";
import SideBar from "../components/SideBar";
import SearchModal from "../components/SearchModal";
import { ArrowRightIcon, SearchIcon } from "@heroicons/react/outline";

function Main() {
  const [sentence, setSentence] = useState(""); // Search input
  const [extractedInfo, setExtractedInfo] = useState(null); // Extracted information
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility
  const [generatedQuery, setGeneratedQuery] = useState(""); // Generated query string
  const [savedSearches, setSavedSearches] = useState([]); // Save search queries

  // Generate Google search link based on extracted info
  const generateLink = (extractedInfo) => {
    const baseURL = "https://www.google.com/search?q=";
    const queryParts = [
      extractedInfo["job titles"]?.length
        ? `${extractedInfo["job titles"].join(" OR ")}`
        : "",
      extractedInfo.location?.length
        ? `${extractedInfo.location.join(" ")}`
        : "",
      extractedInfo.education?.length
        ? `${extractedInfo.education.join(" ")}`
        : "",
      extractedInfo["experience year"]?.length
        ? `${extractedInfo["experience year"].join(" ")} years experience`
        : "",
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
      const updatedSearches = [
        ...savedSearches,
        { jobTitle: extractedInfo["job titles"], link },
      ];
      setSavedSearches(updatedSearches);
      localStorage.setItem("savedSearches", JSON.stringify(updatedSearches));
      setIsModalOpen(false);
    }
  };

  const handleGoToGoogle = () => {
    window.open(generatedQuery, "_blank");
  };

  return (
    <div className="flex">
      {/* Sidebar remains unchanged */}
      <SideBar />

      {/* Main content area */}
      <div className="w-full h-screen bg-white flex flex-col items-center justify-center p-8">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-12">
          {/* Logo Section */}
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6n_g2TSG3nIieVot6Pb9PlIB1Dm5lyaLiLg&s"
            alt="Logo"
            className="w-28 h-28 mb-6 rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105" // Logo adjustments
          />

          {/* Heading Section */}
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 tracking-wide mb-2 drop-shadow-md">
            Discover Talented Profiles
          </h1>

          {/* Subheading or Caption */}
          <p className="text-lg font-medium text-gray-500 text-center max-w-md leading-relaxed">
            Simplify your search and find the best candidates tailored to your
            needs with ease and precision.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-1/2 lg:w-3/4 mb-6">
          <input
            type="text"
            placeholder="Search for candidates, e.g. Python Developer in Delhi with 5 years experience"
            className="w-full px-5 py-4 pr-14 rounded-full text-gray-800 shadow-lg border-2 border-purple-400 hover:border-purple-500 focus:outline-none transition duration-300 ease-in-out"
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
          />
          <button
            className="absolute right-4 z-40 top-1/2 transform -translate-y-1/2 border-2 border-purple-500 bg-transparent hover:bg-purple-500 text-white p-2 rounded-full transition duration-300 ease-in-out group"
            onClick={handleExtract}
          >
            <svg
              className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium transition duration-300 ease-in-out"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              style={{ width: "20px", height: "20px" }}
              fill="currentColor" // Ensures the color is inherited from the parent
            >
              <path
                className="group-hover:fill-white fill-black transition duration-300"
                d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"
              ></path>
            </svg>
          </button>
        </div>

        {/* SearchModal Component */}
        <SearchModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          query={generatedQuery}
          onCopy={handleCopyLink}
          onSave={handleSaveSearch}
          onOpen={handleGoToGoogle}
        />
      </div>
    </div>
  );
}

export default Main;
