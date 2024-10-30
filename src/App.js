import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import SideBar from "./components/SideBar";
import Home from "./pages/Home";
// import Home from "./components/Home";

import Signup from "./components/Signup";
import Login from "./components/Login";
import Main from "./pages/Main";
import Shortlist from "./components/Shortlist";
import ProfileDisplay from "./components/ProfileDisplay";

function AppContent() {
  const [shortlistedCandidates, setShortlistedCandidates] = useState([]);

  const handleShortlist = (candidate) => {
    setShortlistedCandidates((prevShortlisted) => {
      const isAlreadyShortlisted = prevShortlisted.some(
        (shortlisted) => shortlisted.full_name === candidate.full_name
      );

      if (isAlreadyShortlisted) {
        // Remove from shortlist if already present
        return prevShortlisted.filter(
          (shortlisted) => shortlisted.full_name !== candidate.full_name
        );
      } else {
        // Add to shortlist
        return [...prevShortlisted, candidate];
      }
    });
  };

  const location = useLocation(); // Get the current route

  const hideSidebarRoutes = ["/", "/login", "/signup"]; // Routes where Sidebar shouldn't render

  return (
    <div className="overflow-x-hidden flex">
      {/* Conditionally render SideBar based on the current route */}
      {!hideSidebarRoutes.includes(location.pathname) && <SideBar />}

      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <Route exact path="/profile" element={<ProfileDisplay/>} /> */}
        <Route
          exact
          path="/main"
          element={
            <Main
              shortlistedCandidates={shortlistedCandidates} // Pass shortlisted candidates
              onShortlist={handleShortlist} // Pass shortlist handler
            />
          }
        />
        <Route
          exact
          path="/shortlist"
          element={<Shortlist shortlistedCandidates={shortlistedCandidates} />} // Pass shortlisted candidates
        />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
