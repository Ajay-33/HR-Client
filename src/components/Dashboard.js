import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [emailCounts, setEmailCounts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmailCounts = JSON.parse(localStorage.getItem("emailCounts")) || {};
    setEmailCounts(storedEmailCounts);
  }, []);

  const redirectToEmailForm = () => {
    navigate("/emailform");
  };

  // Prepare data for total emails sent today
  const dailyEmailsData = {
    labels: ["Today"], 
    datasets: [
      {
        label: "Total Emails Sent",
        data: [Object.values(emailCounts).reduce((acc, item) => acc + item.count, 0)],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  // Prepare data for individual email counts
  const individualEmailsData = {
    labels: Object.keys(emailCounts),
    datasets: [
      {
        label: "Emails Sent",
        data: Object.values(emailCounts).map(item => item.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Email Dashboard</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left font-semibold text-gray-600">Name</th>
              <th className="px-4 py-2 border-b text-left font-semibold text-gray-600">Email</th>
              <th className="px-4 py-2 border-b text-left font-semibold text-gray-600">Count</th>
              <th className="px-4 py-2 border-b text-left font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(emailCounts).map(email => (
              <tr key={email} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-700">{emailCounts[email].name}</td>
                <td className="px-4 py-2 text-gray-700">{email}</td>
                <td className="px-4 py-2 text-gray-700">{emailCounts[email].count}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={redirectToEmailForm}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Send Email
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Button to navigate to the email form */}
      <button
        onClick={redirectToEmailForm}
        className="inline-block mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
      >
        Send New Email
      </button>

      {/* Side-by-Side Charts */}
      <div className="flex flex-wrap gap-4 mt-6">
        <div className="w-full md:w-1/2 lg:w-1/2" style={{ maxWidth: '17cm', maxHeight: '9cm' }}>
          <h2 className="text-lg font-semibold mb-2 text-center">Total Emails Sent Today</h2>
          <div style={{ height: '100%', width: '100%' }}>
            <Bar data={dailyEmailsData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/2" style={{ maxWidth: '15cm', maxHeight: '9cm' }}>
          <h2 className="text-lg font-semibold mb-2 text-center">Individual Email Counts</h2>
          <div style={{ height: '100%', width: '100%' }}>
            <Bar data={individualEmailsData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
