import React, { useState } from "react";
import SearchModal from "./SearchModal"; // Import the modal component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"; // Import the cross icon

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
    const baseURL = "https://www.google.com/search?q=site:github.com+\"joined+on\"+-intitle:\"at+master\"+-inurl:\"tab\"+-inurl:\"jobs.\"+-inurl:\"articles\"";
    const query = [
      skills ? `+"${skills}"` : "",
      location ? `+location:"${location}"` : "",
    ]
      .filter(Boolean)
      .join("");
  
    return `${baseURL}${encodeURIComponent(query)}`;
  };
  

  const handleSearchClick = () => {
    const query = generateLink();
    setGeneratedQuery(query);
    setIsModalOpen(true); // open the modal
  };

  const handleSaveSearch = () => {
    const link = generatedQuery;
    if (link && !savedSearches.some((search) => search.link === link)) {
      const updatedSearches = [...savedSearches, { skills, location, link }];
      setSavedSearches(updatedSearches);
      localStorage.setItem(
        "savedGitHubSearches",
        JSON.stringify(updatedSearches)
      );
      setIsModalOpen(false); // close the modal
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedQuery);
    setIsModalOpen(false);
  };

  const handleGoToGoogle = () => {
    window.open(generatedQuery, "_blank");
    
  };

  const handleDeleteSearch = (index) => {
    const updatedSearches = savedSearches.filter((_, i) => i !== index);
    setSavedSearches(updatedSearches);
    localStorage.setItem(
      "savedGitHubSearches",
      JSON.stringify(updatedSearches)
    );
  };

  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-br from-blue-100 to-blue-300 items-start justify-between p-8 mx-auto shadow-lg w-full pb-12">
      {/* Left side form */}
      <div className="w-full md:w-2/3 px-4 border-r-2">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800">
          Easily Use Google to Search Profiles on GitHub
        </h1>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">
              Skills to Include:
            </label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., JavaScript, Python"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">
              City or Country:
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., San Francisco, United States"
            />
          </div>
        </form>
        <div className="flex justify-center mt-8">
          <button
            type="button"
            onClick={handleSearchClick}
            className="bg-gradient-to-r from-green-400 to-green-600 text-white py-3 px-8 rounded-lg shadow-md hover:from-green-500 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Find the Right People on GitHub
          </button>
        </div>
      </div>

      <div className="w-full md:w-1/3 mx-auto md:pl-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Saved Searches</h2>
        <div className="space-y-4">
          {savedSearches.length > 0 ? (
            savedSearches.map((search, index) => (
              <div
                key={index}
                className="flex justify-between items-center space-x-4 bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-lg shadow-sm transition-opacity duration-300 hover:opacity-80"
              >
                <span
                  onClick={() => handleGoToGoogle(search.link)}
                  className="text-blue-600 font-medium truncate hover:underline hover:cursor-pointer"
                >
                  {search.skills} in {search.location}
                </span>
                <div
                  className="space-x-4 text-sm hover:cursor-pointer"
                  onClick={() => handleDeleteSearch(index)} // Call delete function here
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </div>
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
