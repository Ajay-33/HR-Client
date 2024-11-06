import React, { useState } from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { MdClose } from "react-icons/md"; // Close button icon
import candidate_data_cleaned from "../candidate_data_cleaned.js";
import { useParams } from "react-router-dom";

function FilterableCandidateCards({
  searchLocation,
  searchEducation,
  searchSkills,
  searchJobTitles,
  onShortlist,
  shortlistedCandidates,
}) {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const { id } = useParams(); // Get search ID from route params

  // Function to handle database update for shortlisting
  const updateShortlistInDatabase = async (candidate) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/api/v1/search/updateShortlist/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            searchId: id,
            candidate: {
              name: candidate.full_name,
              role: candidate.current_position_1 || "Unknown Role",
              organization: candidate.company_name || "Unknown Organization",
              education: candidate.education_1 || "Not Specified",
              location: candidate.location || "Unknown Location",
              status: "Not Contacted",  
              linkedin: candidate.linkedin || null,
              github: candidate.github || null,
              email: candidate.email || null,
              phone: candidate.phone || null,
            },
          }),
        }
      );

      if (!response.ok)
        throw new Error("Failed to update shortlist in database");
      console.log("Shortlist updated in the database successfully.");
    } catch (error) {
      console.error("Error updating shortlist in database:", error);
    }
  };

  // Shortlist handler to update both UI and database
  const handleShortlist = (candidate) => {
    updateShortlistInDatabase(candidate); // Update database
    onShortlist(candidate); // Update UI shortlist
  };

  // Candidate filter logic
  const filterCandidates = () => {
    return candidate_data_cleaned.filter((candidate) => {
      // Location Matching
      const matchesLocation =
        candidate.location &&
        Array.isArray(searchLocation) &&
        searchLocation.length > 0 &&
        searchLocation.some((loc) =>
          candidate.location.toLowerCase().includes(loc.toLowerCase())
        );

      // Skills Matching with type check for string
      const matchesSkills =
        typeof candidate.skills === "string" &&
        searchSkills.some((searchSkill) =>
          candidate.skills.toLowerCase().includes(searchSkill.toLowerCase())
        );

      // Job Titles Matching
      const matchesJobTitles = searchJobTitles.some(
        (jobTitle) =>
          candidate.current_position_1 &&
          typeof candidate.current_position_1 === "string" &&
          candidate.current_position_1
            .toLowerCase()
            .includes(jobTitle.toLowerCase())
      );

      return matchesLocation && matchesSkills; // Adjust condition as needed
    });
  };

  // Helper function to truncate text
  const truncateText = (text, limit) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  const handleCardClick = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const closeSidePanel = () => {
    setSelectedCandidate(null);
  };

  const filteredCandidates = filterCandidates();

  return (
    <div className="relative flex w-full h-full">
      {/* Main Cards Section */}
      <div
        className={`transition-all duration-300 p-4 overflow-y-auto ${
          selectedCandidate ? "w-3/4" : "w-full"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map((candidate, index) => {
              const isShortlisted = shortlistedCandidates.some(
                (shortlisted) => shortlisted.full_name === candidate.full_name
              );

              const skillsArray = candidate.skills?.split(",") || [];

              return (
                <div
                  key={index}
                  className="bg-white border border-gray-300 rounded-lg shadow-md p-4 flex flex-col space-y-4 cursor-pointer hover:bg-gray-50 transition-all duration-200"
                  onClick={() => handleCardClick(candidate)}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={`https://picsum.photos/seed/${candidate.full_name}/50`}
                      alt={candidate.full_name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800 truncate">
                        {candidate.full_name}
                      </h2>
                      <p className="text-sm text-gray-500 truncate">
                        {candidate.location || "Location not provided"}
                      </p>
                    </div>
                  </div>

                  <div className="flex-grow">
                    <p className="text-sm">
                      <strong className="text-gray-700">
                        Current Position:{" "}
                      </strong>
                      {truncateText(candidate.current_position_1 || "N/A", 80)}
                    </p>

                    {skillsArray.length > 0 && (
                      <p className="text-sm mt-2">
                        <strong className="text-gray-700">Skills: </strong>
                        {truncateText(skillsArray.join(", "), 120)}
                      </p>
                    )}

                    {candidate.about && (
                      <p className="text-sm mt-2">
                        <strong className="text-gray-700">About: </strong>
                        {truncateText(candidate.about, 180)}
                      </p>
                    )}
                  </div>

                  <div className="flex space-x-4 items-center">
                    <div className="flex space-x-2">
                      {candidate.linkedin && (
                        <a
                          href={candidate.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-blue-500 hover:text-blue-600"
                        >
                          <FaLinkedin size={18} />
                        </a>
                      )}
                      {candidate.github && (
                        <a
                          href={candidate.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-gray-600 hover:text-gray-700"
                        >
                          <FaGithub size={18} />
                        </a>
                      )}
                      {candidate.email && (
                        <a
                          href={`mailto:${candidate.email}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-red-500 hover:text-red-600"
                        >
                          <FaEnvelope size={18} />
                        </a>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent opening panel on button click
                        handleShortlist(candidate); // Use the modified shortlist handler
                      }}
                      className={`${
                        isShortlisted
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-purple-600 hover:bg-purple-700"
                      } text-white px-3 py-1 rounded-lg text-sm transition duration-300`}
                    >
                      {isShortlisted ? "Shortlisted" : "Shortlist"}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center col-span-full">
              <p className="text-gray-500">
                No profiles match your search criteria.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Side Panel for Selected Candidate */}
      {selectedCandidate && (
        <div className="w-1/4 bg-white shadow-lg z-50 p-6 overflow-y-auto fixed top-0 right-0 bottom-0 transition-all duration-300">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">
              {selectedCandidate.full_name}
            </h2>
            <button
              onClick={closeSidePanel}
              className="text-gray-500 hover:text-gray-700"
            >
              <MdClose size={24} />
            </button>
          </div>
          <p className="text-sm text-gray-500">
            {selectedCandidate.location || "Location not provided"}
          </p>
          <p className="mt-4">
            <strong className="text-gray-700">Current Position:</strong>{" "}
            {selectedCandidate.current_position_1 || "N/A"}
          </p>
          <p className="mt-4">
            <strong className="text-gray-700">Skills:</strong>{" "}
            {selectedCandidate.skills || "No skills listed"}
          </p>
          <p className="mt-4">
            <strong className="text-gray-700">About:</strong>{" "}
            {selectedCandidate.about || "No description available"}
          </p>

          <div className="flex space-x-4 mt-4">
            {selectedCandidate.linkedin && (
              <a
                href={selectedCandidate.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors duration-300"
                title="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
            )}
            {selectedCandidate.github && (
              <a
                href={selectedCandidate.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-full transition-colors duration-300"
                title="GitHub"
              >
                <FaGithub size={20} />
              </a>
            )}
            {selectedCandidate.email && (
              <a
                href={`mailto:${selectedCandidate.email}`}
                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors duration-300"
                title="Email"
              >
                <FaEnvelope size={20} />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterableCandidateCards;
