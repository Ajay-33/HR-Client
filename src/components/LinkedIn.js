import React, { useState } from "react";
import SearchModal from "./SearchModal"; // Import the modal component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"; // Import the cross icon

const LinkedIn = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [keywords, setKeywords] = useState("");
  const [country, setCountry] = useState("");
  const [education, setEducation] = useState("");
  const [currentEmployer, setCurrentEmployer] = useState("");
  const [savedSearches, setSavedSearches] = useState(() => {
    const searches = localStorage.getItem("savedSearches");
    return searches ? JSON.parse(searches) : [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedQuery, setGeneratedQuery] = useState("");

  const generateLink = () => {
    const baseURL = "https://www.google.com/search?q=";
    const query = [
      jobTitle ? `"${jobTitle}"` : "", // Job title in quotes
      location ? `"${location}"` : "", // Location in quotes
      `site:in.linkedin.com/in/ OR site:in.linkedin.com/pub/`, // Specific LinkedIn site filter
      `-intitle:"profiles"`, // Exclude "profiles" in title
      `-inurl:"dir/"`, // Exclude "dir/" in URL
      currentEmployer ? `"Current * ${currentEmployer}"` : "", // Current employer with wildcard and quotes
      keywords ? `-"${keywords}"` : "", // Exclude keywords (with minus sign)
    ]
      .filter(Boolean)
      .join(" ");

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
      const updatedSearches = [...savedSearches, { jobTitle, link }];
      setSavedSearches(updatedSearches);
      localStorage.setItem("savedSearches", JSON.stringify(updatedSearches));
      setIsModalOpen(false); // close the modal
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedQuery);
    setIsModalOpen(false);
  };

  const handleGoToGoogle = () => {
    window.open(generatedQuery, "_blank");
    // setIsModalOpen(false); // close the modal
  };

  const handleDeleteSearch = (index) => {
    const updatedSearches = savedSearches.filter((_, i) => i !== index);
    setSavedSearches(updatedSearches);
    localStorage.setItem("savedSearches", JSON.stringify(updatedSearches));
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 items-start justify-between p-8 mx-auto  shadow-lg w-full pb-12 ">
      {/* Left side form */}
      {/* <Sidebar/> */}
      <div className="w-full md:w-2/3 px-4  border-r-2">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800">
          Find LinkedIn Profiles with Ease
        </h1>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">Country:</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., United States"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">
              Job Title:
            </label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Software Engineer"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">
              Location or Keywords:
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., San Francisco, Remote"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">
              Exclude Keywords:
            </label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Manager, Executive"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">
              Education:
            </label>
            <input
              type="text"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Bachelor's, Master's"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">
              Current Employer:
            </label>
            <input
              type="text"
              value={currentEmployer}
              onChange={(e) => setCurrentEmployer(e.target.value)} // Handler for demo
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Google, Microsoft"
            />
          </div>
        </form>
        <div className="flex justify-center mt-8">
          <button
            type="button"
            onClick={handleSearchClick} // open the modal instead of saving directly
            className="bg-gradient-to-r from-green-400 to-green-600 text-white py-3 px-8 rounded-lg shadow-md hover:from-green-500 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Find the Right People on LinkedIn
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
                  {search.jobTitle}
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

export default LinkedIn;
