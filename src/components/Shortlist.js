import React, { useEffect, useState } from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";

function Shortlist() {
  const [shortlistedCandidates, setShortlistedCandidates] = useState([]);

  useEffect(() => {
    const fetchShortlistedCandidates = async () => {
      try {
        const response = await fetch("http://localhost:8060/api/v1/search/getShortlist", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setShortlistedCandidates(data.shortlistedCandidates || []);
        } else {
          console.error("Failed to fetch shortlisted candidates");
        }
      } catch (error) {
        console.error("Error fetching shortlisted candidates:", error);
      }
    };

    fetchShortlistedCandidates();
  }, []);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const handleStatusChange = async (candidate, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8060/api/v1/candidate/updateStatus/${candidate.searchId}/${candidate._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setShortlistedCandidates((prevCandidates) =>
          prevCandidates.map((c) =>
            c._id === candidate._id ? { ...c, status: newStatus } : c
          )
        );
        console.log("Status updated successfully");
      } else {
        console.error("Failed to update candidate status");
      }
    } catch (error) {
      console.error("Error updating candidate status:", error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col overflow-x-auto bg-gray-50">
      <div className="p-6 flex justify-between items-center border-b bg-white shadow-sm">
        <h1 className="text-xl font-semibold text-gray-800">Shortlisted Candidates</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-sm font-semibold bg-gray-100 rounded-md hover:bg-gray-200">
            <span className="flex items-center space-x-1">
              <FiFilter />
              <span>Filter by Status</span>
            </span>
          </button>
        </div>
      </div>

      <div className="flex-grow overflow-x-auto px-6 py-4">
        <div className="inline-block min-w-full shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="min-w-full bg-white border-collapse">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-900 border-r">
                  <input type="checkbox" className="form-checkbox text-indigo-600" />
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900 border-r whitespace-nowrap">Search</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900 border-r whitespace-nowrap">Full Name</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900 border-r whitespace-nowrap">Profiles</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900 border-r whitespace-nowrap">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900 border-r whitespace-nowrap">Owner</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900 border-r whitespace-nowrap">Current Role</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900 border-r whitespace-nowrap">Organization</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900 border-r whitespace-nowrap">Education</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900 border-r whitespace-nowrap">Location</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900 whitespace-nowrap">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {shortlistedCandidates.length > 0 ? (
                shortlistedCandidates.map((candidate, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 border-r">
                      <input type="checkbox" className="form-checkbox text-indigo-600" />
                    </td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap border-r">{candidate.searchName || "N/A"}</td>
                    <td className="px-4 py-3 text-gray-900 font-medium border-r whitespace-nowrap">
                      {candidate.name}
                    </td>
                    <td className="px-4 py-3 border-r whitespace-nowrap">
                      <div className="flex space-x-2">
                        {candidate.linkedin && (
                          <a href={candidate.linkedin} target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className="text-blue-700" />
                          </a>
                        )}
                        {candidate.github && (
                          <a href={candidate.github} target="_blank" rel="noopener noreferrer">
                            <FaGithub className="text-gray-600" />
                          </a>
                        )}
                        {candidate.email && (
                          <a href={`mailto:${candidate.email}`}>
                            <FaEnvelope className="text-red-500" />
                          </a>
                        )}
                        {candidate.phone && (
                          <a href={`tel:${candidate.phone}`}>
                            <FaPhone className="text-green-500" />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700 border-r whitespace-nowrap">
                      <select
                        className="bg-transparent focus:outline-none"
                        value={candidate.status}
                        onChange={(e) => handleStatusChange(candidate, e.target.value)}
                      >
                        <option value="Not Contacted">Not Contacted</option>
                        <option value="Email Sent">Email Sent</option>
                        <option value="InMail Sent">InMail Sent</option>
                        <option value="Interested">Interested</option>
                        <option value="Interviewing">Interviewing</option>
                        <option value="Hired">Hired</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Not Interested">Not Interested</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-gray-700 border-r whitespace-nowrap">{candidate.owner}</td>
                    <td className="px-4 py-3 text-gray-700 border-r whitespace-nowrap">
                      {candidate.role}
                    </td>
                    <td className="px-4 py-3 text-gray-700 border-r whitespace-nowrap">{candidate.organization}</td>
                    <td className="px-4 py-3 text-gray-700 border-r whitespace-nowrap">
                      {candidate.education}
                    </td>
                    <td className="px-4 py-3 text-gray-700 border-r whitespace-nowrap">{candidate.location}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                      {formatDate(candidate.shortlistedDate)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="px-4 py-4 text-center text-gray-500">
                    No shortlisted candidates yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Shortlist;
