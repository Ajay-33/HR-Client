import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa"; // Importing GitHub and Email icons

function Shortlist({ shortlistedCandidates }) {
  return (
    <div className="w-full max-h-screen overflow-auto flex flex-col items-center justify-start p-8" style={{ background: "#f8f9fa" }}> {/* Updated background */}
      {shortlistedCandidates.length > 0 ? (
        shortlistedCandidates.map((candidate, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 border border-gray-300 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl text-gray-800 mb-6 w-full max-w-4xl"
            style={{
              minHeight: "250px", // Set a consistent card height
            }}
          >
            {/* Candidate Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold truncate">
                {candidate.full_name}
              </h2>
              <div className="flex space-x-3">
                {candidate.linkedin && (
                  <a href={candidate.linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="text-blue-700 hover:text-blue-800 transition-colors duration-300" size={28} />
                  </a>
                )}
                {candidate.github && (
                  <a href={candidate.github} target="_blank" rel="noopener noreferrer">
                    <FaGithub className="text-gray-600 hover:text-gray-800 transition-colors duration-300" size={28} />
                  </a>
                )}
                {candidate.email && (
                  <a href={`mailto:${candidate.email}`}>
                    <FaEnvelope className="text-red-500 hover:text-red-600 transition-colors duration-300" size={28} />
                  </a>
                )}
              </div>
            </div>

            {/* Candidate Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm mb-2">
                  <strong className="text-gray-700">Location: </strong>
                  <span className="truncate block max-w-full">
                    {candidate.location || "Location not provided"}
                  </span>
                </p>
                <p className="text-sm mb-2">
                  <strong className="text-gray-700">Current Position: </strong>
                  <span className="truncate block max-w-full">
                    {candidate.current_position_1 || "N/A"}
                  </span>
                </p>
              </div>

              <div>
                <p className="text-sm mb-2">
                  <strong className="text-gray-700">Skills: </strong>
                  <span className="truncate block max-w-full">
                    {Array.isArray(candidate.skills) ? candidate.skills.join(", ") : "No skills listed"}
                  </span>
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-0.5 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 mt-4" />
          </div>
        ))
      ) : (
        <div className="text-center col-span-full">
          <p className="text-gray-500">No shortlisted candidates yet.</p>
        </div>
      )}
    </div>
  );
}

export default Shortlist;
