import React, { useState, useEffect, useRef } from "react";
import {
  HomeIcon,
  FolderIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ChartBarIcon,
  CogIcon,
  UserCircleIcon,
  UserAddIcon,
} from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const [isHrShopOpen, setIsHrShopOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("HRShop");
  const [activeHrShopSearch, setActiveHrShopSearch] = useState(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [showAllSearches, setShowAllSearches] = useState(false);
  const profileDropdownRef = useRef(null);

  const [searches, setSearches] = useState([]);
  const navigate = useNavigate();

  // Fetch user searches on component mount
  useEffect(() => {
    const fetchSearches = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_HOST}/api/v1/search/get`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        const data = await response.json();

        if (response.ok && Array.isArray(data)) {
          setSearches(data);
          // Navigate to the first search item if available on initial load
          if (data.length > 0) {
            navigate(`/main/${data[0]._id}`);
            setActiveHrShopSearch(data[0].searchName);
          }
        } else {
          setSearches([]);
          console.error("Unexpected response format:", data);
        }
      } catch (error) {
        console.error("Failed to fetch searches:", error);
        setSearches([]);
      }
    };
    fetchSearches();
  }, []);

  const handleAddSearch = async () => {
    const newSearchName = `Search ${searches.length + 1}`;
    try {
      const response = await fetch(`${process.env.REACT_APP_HOST}/api/v1/search/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ searchName: newSearchName }),
      });
      const data = await response.json();

      if (response.ok && data.searches) {
        setSearches(data.searches);
      } else {
        console.error("Failed to add search:", data);
      }
    } catch (error) {
      console.error("Failed to add search:", error);
    }
  };

  const toggleHrShop = () => {
    setIsHrShopOpen((prev) => !prev);
    setActiveItem("HRShop");
    if (searches.length > 0) {
      navigate(`/main/${searches[0]._id}`);
      setActiveHrShopSearch(searches[0].searchName);
    }
  };

  const handleSidebarItemClick = (item) => {
    setActiveItem(item);
    setActiveHrShopSearch(null);
  
    // Navigate to dashboard when "Integrations" is clicked
    if (item === "Integrations") {
      navigate("/dashboard");
    }
  };
  

  const handleHrShopSearchClick = (search) => {
    setActiveHrShopSearch(search.searchName);
    navigate(`/main/${search._id}`);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    // Close the dropdown when clicking outside of it
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-64 min-w-64 max-w-64 h-full min-h-screen bg-gradient-to-b from-purple-900 to-purple-800 text-white flex flex-col justify-between p-4 space-y-6 shadow-lg font-sans">
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
            onClick={toggleHrShop}
          >
            <div className="flex items-center space-x-3">
              <FolderIcon className="h-5 w-5" />
              <span className="font-medium text-sm">HRShop</span>
            </div>
            <UserAddIcon onClick={handleAddSearch} className="h-5 w-5" />
          </div>

          {isHrShopOpen && searches.length > 0 && (
            <div className="ml-4 mt-2 space-y-2">
              {(showAllSearches ? searches : searches.slice(0, 4)).map(
                (search) => (
                  <div
                    key={search._id}
                    className={`flex items-center cursor-pointer hover:bg-purple-700 p-2 rounded-lg transition duration-200 ease-in-out ${
                      activeHrShopSearch === search.searchName
                        ? "bg-purple-700"
                        : ""
                    }`}
                    onClick={() => handleHrShopSearchClick(search)}
                  >
                    <span className="text-sm">{search.searchName}</span>
                  </div>
                )
              )}

              {searches.length > 4 && (
                <button
                  className="text-purple-300 hover:text-white text-sm mt-2"
                  onClick={() => setShowAllSearches((prev) => !prev)}
                >
                  {showAllSearches ? "Show Less" : "Show More"}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Shortlist Section */}
        <div
          className={`flex items-center space-x-3 cursor-pointer hover:bg-purple-700 p-3 rounded-lg transition duration-200 ease-in-out ${
            activeItem === "Shortlist" ? "bg-purple-700" : ""
          }`}
          onClick={() => {
            handleSidebarItemClick("Shortlist");
            navigate("/shortlist");
          }}
        >
          <UserGroupIcon className="h-5 w-5" />
          <span className="font-medium text-sm">Shortlist</span>
        </div>
      </div>

      {/* Additional Sections */}
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

      {/* Profile and Logout */}
      <div className="bg-slate-100 w-full h-0.5"></div>
      <div className="space-y-6">
        <div
          className={`mt-auto flex items-center space-x-3 cursor-pointer hover:bg-purple-700 p-3 rounded-lg transition duration-200 ease-in-out border border-purple-700 relative ${
            activeItem === "Profile" ? "bg-purple-600" : ""
          }`}
          onClick={handleProfileClick}
          ref={profileDropdownRef}
        >
          <UserCircleIcon className="h-5 w-5" />
          <div>
            <span className="block font-semibold text-sm">Ajay Dornala</span>
            <span className="block text-xs text-gray-400">
              Ajay's Workspace
            </span>
          </div>

          {isProfileDropdownOpen && (
            <div className="absolute bottom-12 right-0 w-40 bg-purple-900 text-white rounded-lg shadow-lg z-10">
              <div
                className="p-2 hover:bg-purple-700 cursor-pointer transition duration-200 ease-in-out"
                onClick={() => navigate("/profile")}
              >
                View Profile
              </div>
              <div
                className="p-2 hover:bg-purple-700 cursor-pointer transition duration-200 ease-in-out"
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
