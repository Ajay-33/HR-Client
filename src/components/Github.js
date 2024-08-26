import React, { useState } from "react";
import SearchModal from "./SearchModal"; // import the modal component

const GitHub = () => {
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");
  const [savedSearches, setSavedSearches] = useState(() => {
    const searches = localStorage.getItem("savedGitHubSearches");
    return searches ? JSON.parse(searches) : [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedQuery, setGeneratedQuery] = useState("");

  const generateLink = () => {
    const baseURL = "https://www.google.com/search?q=site:github.com";
    const query = [
      skills ? `${skills}` : "",
      location ? `location:"${location}"` : "",
    ]
      .filter(Boolean)
      .join(" ");

    return `${baseURL} ${encodeURIComponent(query)}`;
  };

  const handleSearchClick = () => {
    const query = generateLink();
    setGeneratedQuery(query);
    setIsModalOpen(true); // open the modal
  };

  const handleSaveSearch = () => {
    const link = generatedQuery;
    if (link && !savedSearches.some(search => search.link === link)) {
      const updatedSearches = [...savedSearches, { skills, location, link }];
      setSavedSearches(updatedSearches);
      localStorage.setItem("savedGitHubSearches", JSON.stringify(updatedSearches));
      setIsModalOpen(false); // close the modal
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedQuery);
  };

  const handleGoToGoogle = () => {
    window.open(generatedQuery, "_blank");
    setIsModalOpen(false); // close the modal
  };

  return (
    <div className="p-10 my-20 max-w-8xl mx-auto bg-white rounded-xl flex justify-between">
      {/* Left side form */}
      <div className="w-2/3">
        <h1 className="text-2xl font-bold mb-4">Easily use Google to search profiles on GitHub</h1>
        <form className="grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">Skills to Include:</label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">City or Country:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>
        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={handleSearchClick} // open the modal instead of saving directly
            className="bg-green-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Find the right people on GitHub
          </button>
        </div>
      </div>
      
      {/* Right side saved searches */}
      <div className="w-1/4 pl-6 border-l border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Saved Searches</h2>
        <div className="space-y-4">
          {savedSearches.length > 0 ? (
            savedSearches.map((search, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow-sm"
              >
                <span className="text-blue-500 truncate">
                  {search.skills} in {search.location}
                </span>
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
      <SearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        query={generatedQuery}
        onCopy={handleCopyLink}
        onSave={handleSaveSearch}
        onOpen={handleGoToGoogle}
      />
    </div>
  );
};

export default GitHub;
