import React from "react";
import candidate_data_cleaned from "../candidate_data_cleaned.js";

function CandidateCards() {
  const candidates = candidate_data_cleaned;

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {candidates.map((candidate, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105"
          >
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
            <div className="text-gray-700 mb-2">
              <p className="font-semibold">Industry: </p>
              <p>{candidate.industry || "N/A"}</p>
            </div>
            <div className="text-gray-700 mb-2">
              <p className="font-semibold">Email: </p>
              <a
                href={`mailto:${candidate.email}`}
                className="text-purple-500 hover:text-purple-700"
              >
                {candidate.email || "N/A"}
              </a>
            </div>
            <div className="text-gray-700 mb-2">
              <p className="font-semibold">LinkedIn: </p>
              <a
                href={candidate.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-500 hover:text-purple-700"
              >
                LinkedIn Profile
              </a>
            </div>
            <div className="text-gray-700 mb-2">
              <p className="font-semibold">Skills: </p>
              <p>
                {typeof candidate.skills === "string"
                  ? candidate.skills.split(",").slice(0, 5).join(", ")
                  : "N/A"}
                ...
              </p>
            </div>
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
        ))}
      </div>
    </div>
  );
}

export default CandidateCards;
