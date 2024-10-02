import React, { useState } from "react";
import {
  HomeIcon,
  FolderIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ChartBarIcon,
  CogIcon,
  UserCircleIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/outline";

function SideBar() {
  const [isHrShopOpen, setIsHrShopOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("HRShop"); // To track the active main sidebar item
  const [activeHrShopSearch, setActiveHrShopSearch] = useState(null); // To track the active HRShop search item

  const hrShopSearches = [
    { id: 1, name: "Search 1" },
    { id: 2, name: "Search 2" },
    { id: 3, name: "Search 3" },
  ];

  const toggleHrShop = () => {
    setIsHrShopOpen(!isHrShopOpen);
  };

  const handleSidebarItemClick = (item) => {
    setActiveItem(item);
    setActiveHrShopSearch(null); // Reset HRShop search when a main item is clicked
  };

  const handleHrShopSearchClick = (searchId) => {
    setActiveHrShopSearch(searchId);
  };

  return (
    <div className="w-80 h-full min-h-screen bg-gradient-to-b from-purple-900 to-purple-800 text-white flex flex-col justify-between p-4 space-y-6 shadow-lg font-sans">
      {/* Projects and HRShop Section */}
      <div className="flex flex-col space-y-4">
        {/* Projects Section */}
        <div className="space-y-3">
          <div
            className={`flex items-center space-x-3 cursor-pointer hover:bg-purple-700 p-3 rounded-lg transition duration-200 ease-in-out ${
              activeItem === "Projects" ? "bg-purple-700" : ""
            }`}
            onClick={() => handleSidebarItemClick("Projects")}
          >
            <HomeIcon className="h-5 w-5" />
            <span className="font-medium text-sm">Projects</span>
          </div>
        </div>

        {/* HRShop Section */}
        <div className="space-y-2">
          <div
            className={`flex items-center justify-between cursor-pointer hover:bg-purple-700 p-3 rounded-lg transition duration-200 ease-in-out ${
              activeItem === "HRShop" ? "bg-purple-700" : ""
            }`}
            onClick={() => {
              handleSidebarItemClick("HRShop");
              toggleHrShop();
            }}
          >
            <div className="flex items-center space-x-3">
              <FolderIcon className="h-5 w-5" />
              <span className="font-medium text-sm">HRShop</span>
            </div>
            {isHrShopOpen ? (
              <ChevronUpIcon className="h-5 w-5" />
            ) : (
              <ChevronDownIcon className="h-5 w-5" />
            )}
          </div>

          {isHrShopOpen && (
            <div className="ml-4 mt-2 space-y-2">
              {hrShopSearches.map((search) => (
                <div
                  key={search.id}
                  className={`flex items-center cursor-pointer hover:bg-purple-700 p-2 rounded-lg transition duration-200 ease-in-out ${
                    activeHrShopSearch === search.id ? "bg-purple-700" : ""
                  }`}
                  onClick={() => handleHrShopSearchClick(search.id)}
                >
                  <span className="text-sm">{search.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Shortlist Section */}
        <div
          className={`flex items-center space-x-3 cursor-pointer hover:bg-purple-700 p-3 rounded-lg transition duration-200 ease-in-out ${
            activeItem === "Shortlist" ? "bg-purple-700" : ""
          }`}
          onClick={() => handleSidebarItemClick("Shortlist")}
        >
          <UserGroupIcon className="h-5 w-5" />
          <span className="font-medium text-sm">Shortlist</span>
        </div>
      </div>

      {/* Sequences, Analytics, and Integrations */}
      <div className="bg-slate-100 w-full h-0.5"></div>
      <div className="space-y-4">
        <div
          className={`flex items-center space-x-3 cursor-pointer hover:bg-purple-700 p-3 rounded-lg transition duration-200 ease-in-out ${
            activeItem === "Sequences" ? "bg-purple-700" : ""
          }`}
          onClick={() => handleSidebarItemClick("Sequences")}
        >
          <CheckCircleIcon className="h-5 w-5" />
          <span className="font-medium text-sm">Sequences</span>
        </div>

        <div
          className={`flex items-center space-x-3 cursor-pointer hover:bg-purple-700 p-3 rounded-lg transition duration-200 ease-in-out ${
            activeItem === "Analytics" ? "bg-purple-700" : ""
          }`}
          onClick={() => handleSidebarItemClick("Analytics")}
        >
          <ChartBarIcon className="h-5 w-5" />
          <span className="font-medium text-sm">Analytics</span>
        </div>

        <div
          className={`flex items-center space-x-3 cursor-pointer hover:bg-purple-700 p-3 rounded-lg transition duration-200 ease-in-out ${
            activeItem === "Integrations" ? "bg-purple-700" : ""
          }`}
          onClick={() => handleSidebarItemClick("Integrations")}
        >
          <CogIcon className="h-5 w-5" />
          <span className="font-medium text-sm">Integrations</span>
        </div>
      </div>

      <div className="bg-slate-100 w-full h-0.5"></div>

      {/* Refer, Support, and Profile */}
      <div className="space-y-6">
        <div className="flex flex-col space-y-3">
        <span
            className={`cursor-pointer hover:bg-purple-700 p-3 rounded-lg transition duration-200 ease-in-out text-sm ${
              activeItem === "Refer" ? "bg-purple-600" : ""
            }`}
            onClick={() => handleSidebarItemClick("Refer")}
          >
            Refer and Earn
          </span>
          <span
            className={`cursor-pointer hover:bg-purple-700 p-3 rounded-lg transition duration-200 ease-in-out text-sm ${
              activeItem === "Support" ? "bg-purple-600" : ""
            }`}
            onClick={() => handleSidebarItemClick("Support")}
          >
            Contact Support
          </span>
        </div>

        <div
          className={`mt-auto flex items-center space-x-3 cursor-pointer hover:bg-purple-700 p-3 rounded-lg transition duration-200 ease-in-out border border-purple-700 ${
            activeItem === "Profile" ? "bg-purple-600" : ""
          }`}
          onClick={() => handleSidebarItemClick("Profile")}
        >
          <UserCircleIcon className="h-5 w-5" />
          <div>
            <span className="block font-semibold text-sm">Ajay Dornala</span>
            <span className="block text-xs text-gray-400">
              Ajay's Workspace
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
