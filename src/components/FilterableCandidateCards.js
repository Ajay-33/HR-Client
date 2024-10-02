import React, { useState } from "react";
import candidate_data_cleaned from "../candidate_data_cleaned.js";

function FilterableCandidateCards() {
  const [searchLocation, setSearchLocation] = useState("");
  const [searchEducation, setSearchEducation] = useState("");
  const [searchSkills, setSearchSkills] = useState("");

  // Function to handle filtering based on inputs
  const filterCandidates = () => {
    return candidate_data_cleaned.filter((candidate) => {
      const matchesLocation =
        candidate.location &&
        candidate.location.toLowerCase().includes(searchLocation.toLowerCase());

      const matchesEducation =
        (candidate.education_1 &&
          typeof candidate.education_1 === "string" &&
          candidate.education_1
            .toLowerCase()
            .includes(searchEducation.toLowerCase())) ||
        (candidate.education_2 &&
          typeof candidate.education_2 === "string" &&
          candidate.education_2
            .toLowerCase()
            .includes(searchEducation.toLowerCase()));

      const matchesSkills =
        candidate.skills &&
        typeof candidate.skills === "string" &&
        candidate.skills.toLowerCase().includes(searchSkills.toLowerCase());

      return matchesLocation && matchesEducation && matchesSkills;
    });
  };

  // Get filtered candidates based on search inputs
  const filteredCandidates = filterCandidates();

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      {/* Search Filters Section */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Search Filters</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Location Filter */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Location
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter location"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
          </div>

          {/* Education Filter */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Education
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter education"
              value={searchEducation}
              onChange={(e) => setSearchEducation(e.target.value)}
            />
          </div>

          {/* Skills Filter */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Skills
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter skills"
              value={searchSkills}
              onChange={(e) => setSearchSkills(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Display Filtered Profiles */}
      <div className="max-w-7xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCandidates.length > 0 ? (
          filteredCandidates.map((candidate, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105"
            >
              {/* Candidate Header */}
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 text-purple-600 p-2 rounded-full">
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4.354a4 4 0 100 7.292 4 4 0 000-7.292zM12 12.354a9.354 9.354 0 100 7.292 9.354 9.354 0 000-7.292z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    {candidate.full_name}
                  </h2>
                  <p className="text-sm text-gray-500">{candidate.location}</p>
                </div>
              </div>

              {/* Industry */}
              <div className="text-gray-700 mb-2">
                <p className="font-semibold">Industry:</p>
                <p>{candidate.industry || "N/A"}</p>
              </div>

              {/* Email */}
              <div className="text-gray-700 mb-2">
                <p className="font-semibold">Email:</p>
                <a
                  href={`mailto:${candidate.email}`}
                  className="text-purple-500 hover:text-purple-700"
                >
                  {candidate.email || "N/A"}
                </a>
              </div>

              {/* LinkedIn */}
              <div className="text-gray-700 mb-2">
                <p className="font-semibold">LinkedIn:</p>
                <a
                  href={candidate.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-500 hover:text-purple-700"
                >
                  LinkedIn Profile
                </a>
              </div>

              {/* Company */}
              <div className="text-gray-700 mb-2">
                <p className="font-semibold">Company:</p>
                <p>{candidate.company_name || "N/A"}</p>
                <p className="text-sm text-gray-500">
                  {candidate.company_location_1 || "N/A"}
                </p>
              </div>

              {/* Current Position */}
              <div className="text-gray-700 mb-2">
                <p className="font-semibold">Current Position:</p>
                <p>{candidate.current_position_1 || "N/A"}</p>
              </div>

              {/* Skills */}
              <div className="text-gray-700 mb-2">
                <p className="font-semibold">Skills:</p>
                <p>
                  {typeof candidate.skills === "string"
                    ? candidate.skills.split(",").slice(0, 5).join(", ")
                    : "N/A"}
                  ...
                </p>
              </div>

              {/* Education */}
              <div className="text-gray-700 mb-4">
                <p className="font-semibold">Education:</p>
                <p>{candidate.education_1 || "N/A"}</p>
                <p>{candidate.education_2 || ""}</p>
              </div>

              {/* View Profile Button */}
              <div className="flex mt-4">
                <a
                  href={candidate.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-700"
                >
                  View Profile
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center col-span-3">
            <p className="text-gray-600">No profiles match your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterableCandidateCards;
