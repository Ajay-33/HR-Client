import React from "react";
import { Link } from "react-router-dom";
// import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";

function Sidebar() {
  return (
    <div className=" w-20 flex flex-col bg-gray-800 shadow-lg">
      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        {/* LinkedIn */}
        <Link
          to="/"
          className="text-gray-400 hover:text-white transition duration-300"
          title="LinkedIn"
        >
          <div className="p-3 bg-gray-700 rounded-full hover:bg-red-500 transition duration-300">
            <FontAwesomeIcon icon={LinkedInLogoIcon} />
          </div>
        </Link>

        {/* GitHub */}
        <Link
          to="/github"
          className="text-gray-400 hover:text-white transition duration-300"
          title="GitHub"
        >
          <div className="p-3 bg-gray-700 rounded-full hover:bg-red-500 transition duration-300">
            <FontAwesomeIcon icon={LinkedInLogoIcon} />
          </div>
        </Link>

        {/* Twitter */}
        <Link
          to="/twitter"
          className="text-gray-400 hover:text-white transition duration-300"
          title="Twitter"
        >
          <div className="p-3 bg-gray-700 rounded-full hover:bg-red-500 transition duration-300">
            <FontAwesomeIcon icon={LinkedInLogoIcon} />
          </div>
        </Link>
      </div>

      {/* Optional Footer or Additional Links */}
      <div className="pb-8 flex justify-center">
        <span className="text-gray-600 text-sm">© 2024 HR Shop</span>
      </div>
    </div>
  );
}

export default Sidebar;
