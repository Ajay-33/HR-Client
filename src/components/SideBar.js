import React, { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GitHubLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";

function Sidebar() {
  const location = useLocation();
  const linkedinRef = useRef(null);
  const githubRef = useRef(null);
  const twitterRef = useRef(null);
  const sidebarRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Reset all icons to default styles
    linkedinRef.current.classList.remove("bg-red-500", "text-white");
    githubRef.current.classList.remove("bg-red-500", "text-white");
    twitterRef.current.classList.remove("bg-red-500", "text-white");

    // Apply active styles based on current path
    switch (location.pathname) {
      case "/":
        linkedinRef.current.classList.add("bg-red-500", "text-white");
        break;
      case "/github":
        githubRef.current.classList.add("bg-red-500", "text-white");
        break;
      case "/twitter":
        twitterRef.current.classList.add("bg-red-500", "text-white");
        break;
      default:
        break;
    }
  }, [location]);

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        setIsVisible(false); // Hide on scroll down
      } else {
        setIsVisible(true); // Show on scroll up
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={sidebarRef}
      className={`w-20 fixed  h-3/4  transition-all duration-500 ease-in-out transform ${
        isVisible ? "translate-x-0 opacity-75" : "-translate-x-full opacity-0"
      } flex flex-col rounded-r-full shadow-lg`}
    >
      <div className="flex-1 flex flex-col items-center justify-around space-y-12 py-8">
        
        <Link
          to="/"
          className="text-gray-400 hover:text-white transition duration-300"
          title="LinkedIn"
        >
          <div
            ref={linkedinRef}
            className="p-2 bg-gray-700 rounded-full hover:bg-red-500 transition duration-300 flex items-center justify-center"
          >
            <LinkedInLogoIcon className="w-6 h-6" />
          </div>
        </Link>

        <Link
          to="/github"
          className="text-gray-400 hover:text-white transition duration-300"
          title="GitHub"
        >
          <div
            ref={githubRef}
            className="p-2 bg-gray-700 rounded-full hover:bg-red-500 transition duration-300 flex items-center justify-center"
          >
            <GitHubLogoIcon className="w-6 h-6" />
          </div>
        </Link>

        <Link
          to="/twitter"
          className="text-gray-400 hover:text-white transition duration-300"
          title="Twitter"
        >
          <div
            ref={twitterRef}
            className="p-2 bg-gray-700 rounded-full hover:bg-red-500 transition duration-300 flex items-center justify-center"
          >
            <TwitterLogoIcon className="w-6 h-6" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
