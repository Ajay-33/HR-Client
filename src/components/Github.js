import React, { useState } from "react";
import SearchModal from "./SearchModal"; // Import the modal component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faCode, faMapMarkerAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons"; // Import icons

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
      localStorage.setItem("savedGitHubSearches", JSON.stringify(updatedSearches));
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
    localStorage.setItem("savedGitHubSearches", JSON.stringify(updatedSearches));
  };

  return (
    <div className="relative flex flex-col md:flex-row items-start justify-between p-8 mx-auto w-full pb-12 ">

      {/* Left side form */}
      <div className="relative z-10 w-full md:w-2/3 px-4 border-r-2 border-white/20">
        <h1 className="text-4xl font-extrabold mb-6 text-white">
          Find GitHub Profiles with Ease
        </h1>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative flex flex-col">
            <label className="font-semibold text-white mb-2">Skills:</label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="p-4 bg-white/10 text-white border border-transparent rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-white/70 transition-all duration-300"
              placeholder="e.g., JavaScript, Python"
            />
            <div className="absolute top-3/4 right-6 text-xl transform -translate-y-3/4 text-white/40 pointer-events-none">
              <FontAwesomeIcon icon={faCode} />
            </div>
          </div>
          <div className="relative flex flex-col">
            <label className="font-semibold text-white mb-2">Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="p-4 bg-white/10 text-white border border-transparent rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-white/70 transition-all duration-300"
              placeholder="e.g., San Francisco, United States"
            />
            <div className="absolute top-3/4 right-6 text-xl transform -translate-y-3/4 text-white/40 pointer-events-none">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </div>
          </div>
        </form>
        <div className="flex justify-center mt-8">
          <button
            type="button"
            onClick={handleSearchClick}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-8 rounded-full shadow-lg hover:from-cyan-400 hover:to-blue-500 transition duration-300 transform hover:scale-105"
          >
            Find the Right People on GitHub
          </button>
        </div>
      </div>

      <div className="relative z-10 w-full md:w-1/3 mx-auto md:pl-8 mt-12 md:mt-0">
        <h2 className="text-2xl font-bold text-white mb-4">Saved Searches</h2>
        <div className="space-y-4">
          {savedSearches.length > 0 ? (
            savedSearches.map((search, index) => (
              <div
                key={index}
                className="flex justify-between items-center space-x-4 bg-white/20 backdrop-blur-lg p-4 rounded-lg shadow-lg transition-opacity duration-300 hover:opacity-80"
              >
                <span
                  onClick={() => handleGoToGoogle(search.link)}
                  className="text-white font-medium truncate hover:underline hover:cursor-pointer"
                >
                  {search.skills} in {search.location}
                </span>
                <div
                  className="space-x-4 text-white/80 hover:cursor-pointer"
                  onClick={() => handleDeleteSearch(index)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </div>
              </div>
            ))
          ) : (
            <p className="text-white/70">No saved searches yet.</p>
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
