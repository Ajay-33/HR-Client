import React, { useState } from "react";

const LinkedIn = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [keywords, setKeywords] = useState("");
  const [country, setCountry] = useState("");
  const [education, setEducation] = useState("");
  const [savedSearches, setSavedSearches] = useState(() => {
    const searches = localStorage.getItem("savedSearches");
    return searches ? JSON.parse(searches) : [];
  });

  const generateLink = () => {
    const baseURL = "https://www.google.com/search?q=site:linkedin.com";
    const query = [
      jobTitle ? `intitle:"${jobTitle}"` : "",
      location ? `location:"${location}"` : "",
      keywords ? `keywords:"${keywords}"` : "",
      country ? `country:"${country}"` : "",
      education ? `education:"${education}"` : "",
    ]
      .filter(Boolean)
      .join(" ");

    return `${baseURL} ${encodeURIComponent(query)}`;
  };

  const handleSaveSearch = () => {
    const link = generateLink();
    if (link && !savedSearches.some(search => search.link === link)) {
      const updatedSearches = [...savedSearches, { jobTitle, link }];
      setSavedSearches(updatedSearches);
      localStorage.setItem("savedSearches", JSON.stringify(updatedSearches));
    }
  };

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link);
  };

  const handleGoToGoogle = (link) => {
    window.open(link, "_blank");
  };

  return (
    
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-xl shadow-lg flex justify-between">
      {/* Left side form */}
      <div className="w-2/3">
        <h1 className="text-2xl font-bold mb-4">Easily use Google to search profiles on LinkedIn</h1>
        <form className="grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">Country:</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">Job Title:</label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">Location or Keywords to Include:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">Keywords to Exclude:</label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">Education:</label>
            <input
              type="text"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">Current Employer:</label>
            <input
              type="text"
              value={location}  // Use location state as placeholder for demonstration
              onChange={(e) => setLocation(e.target.value)}  // Use location handler for demonstration
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>
        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={handleSaveSearch}
            className="bg-green-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Find the right people on LinkedIn
          </button>
        </div>
      </div>
      
      {/* Right side saved searches */}
      <div className="w-1/3 pl-6 border-l border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Saved Searches</h2>
        <div className="space-y-4">
          {savedSearches.length > 0 ? (
            savedSearches.map((search, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow-sm"
              >
                <span className="text-blue-500 truncate">{search.jobTitle}</span>
                <button
                  onClick={() => handleCopyLink(search.link)}
                  className="bg-gray-200 p-2 rounded-lg text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Copy
                </button>
                <button
                  onClick={() => handleGoToGoogle(search.link)}
                  className="bg-green-500 p-2 rounded-lg text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Open
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No saved searches yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkedIn;
