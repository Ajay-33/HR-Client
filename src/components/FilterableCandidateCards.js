import React, { useState } from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { MdClose } from "react-icons/md"; // Close button icon
import candidate_data_cleaned from "../candidate_data_cleaned.js";

function FilterableCandidateCards({
  searchLocation,
  searchEducation,
  searchSkills,
  searchJobTitles,
  onShortlist,
  shortlistedCandidates,
}) {
  const [selectedCandidate, setSelectedCandidate] = useState(null); // State to handle selected candidate

  const filterCandidates = () => {
    // Logging the input search criteria
    console.log("Search Criteria:");
    console.log(`Locations: ${JSON.stringify(searchLocation)}`);
    console.log(`Education: ${JSON.stringify(searchEducation)}`);
    console.log(`Skills: ${JSON.stringify(searchSkills)}`);
    console.log(`Job Titles: ${JSON.stringify(searchJobTitles)}`);
    console.log(`----------------------`);
  
    return candidate_data_cleaned.filter((candidate) => {
      // Location Matching
      const matchesLocation =
        candidate.location &&
        Array.isArray(searchLocation) &&
        searchLocation.length > 0 &&
        searchLocation.some(
          (loc) => candidate.location.toLowerCase().includes(loc.toLowerCase())
        );
      
      // Debug Location
      console.log(`Candidate Name: ${candidate.full_name}`);
      console.log(`Candidate Location: ${candidate.location}`);
      console.log(`Search Location: ${searchLocation}`);
      console.log(`Matches Location: ${matchesLocation}`);
  
      // Education Matching
      // const matchesEducation =
      //   searchEducation.length === 0 || // No education provided, skip check
      //   (candidate.education_1 &&
      //     searchEducation.some(
      //       (edu) => candidate.education_1.toLowerCase().includes(edu.toLowerCase())
      //     )) ||
      //   (candidate.education_2 &&
      //     searchEducation.some(
      //       (edu) => candidate.education_2.toLowerCase().includes(edu.toLowerCase())
      //     ));
      
      // // Debug Education
      // console.log(`Candidate Education 1: ${candidate.education_1}`);
      // console.log(`Candidate Education 2: ${candidate.education_2}`);
      // console.log(`Matches Education: ${matchesEducation}`);
  
      // Skills Matching
      const matchesSkills =
        candidate.skills &&
        typeof candidate.skills === "string" &&
        searchSkills.some((searchSkill) =>
          candidate.skills.toLowerCase().includes(searchSkill.toLowerCase())
        );
      
      // Debug Skills
      console.log(`Candidate Skills: ${candidate.skills}`);
      console.log(`Matches Skills: ${matchesSkills}`);
  
      // Job Titles Matching
      const matchesJobTitles = searchJobTitles.some(
        (jobTitle) =>
          candidate.current_position_1 &&
          typeof candidate.current_position_1 === "string" &&
          candidate.current_position_1
            .toLowerCase()
            .includes(jobTitle.toLowerCase())
      );
      
      // Debug Job Titles
      console.log(`Candidate Current Position: ${candidate.current_position_1}`);
      console.log(`Matches Job Titles: ${matchesJobTitles}`);
      console.log(`----------------------`);
  
      // Returning only based on Location match for now as per your previous example
      return matchesLocation && matchesSkills ; // You can adjust this condition as needed.
    });
  };
  
  

  // Helper function to truncate text
  const truncateText = (text, limit) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  // Function to handle card click and display the side panel
  const handleCardClick = (candidate) => {
    setSelectedCandidate(candidate); // Set the selected candidate for the side panel
  };

  // Function to close the side panel
  const closeSidePanel = () => {
    setSelectedCandidate(null); // Reset the selected candidate, closing the panel
  };

  // Get filtered candidates based on search inputs
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

              const skillsArray =
                candidate.skills && typeof candidate.skills === "string"
                  ? candidate.skills.split(",")
                  : [];

              return (
                <div
                  key={index}
                  className="bg-white border border-gray-300 rounded-lg shadow-md p-4 flex flex-col space-y-4 cursor-pointer hover:bg-gray-50 transition-all duration-200"
                  onClick={() => handleCardClick(candidate)}
                >
                  <div className="flex items-center space-x-4">
                    {/* Placeholder Image */}
                    <img
                      src={`https://picsum.photos/seed/${candidate.full_name}/50`}
                      alt={candidate.full_name}
                      className="w-12 h-12 rounded-full"
                    />
                    {/* Candidate Info */}
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
                      <strong className="text-gray-700">Current Position: </strong>
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

                  {/* Actions Section */}
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
                        onShortlist(candidate);
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
              <p className="text-gray-500">No profiles match your search criteria.</p>
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
