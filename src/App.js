import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import SideBar from "./components/SideBar";
import Home from "./pages/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Main from "./pages/Main";
import Shortlist from "./components/Shortlist";
import Dashboard from "./components/Dashboard";
import EmailForm from "./components/EmailForm";

function AppContent() {
  const [shortlistedCandidates, setShortlistedCandidates] = useState([]);

  const handleShortlist = (candidate) => {
    setShortlistedCandidates((prevShortlisted) => {
      const isAlreadyShortlisted = prevShortlisted.some(
        (shortlisted) => shortlisted.full_name === candidate.full_name
      );

      if (isAlreadyShortlisted) {
        return prevShortlisted.filter(
          (shortlisted) => shortlisted.full_name !== candidate.full_name
        );
      } else {
        return [...prevShortlisted, candidate];
      }
    });
  };

  const location = useLocation();
  const hideSidebarRoutes = ["/", "/login", "/signup"];

  return (
    <div className="overflow-x-hidden flex">
      {!hideSidebarRoutes.includes(location.pathname) && <SideBar />}

      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* Dynamic route to match /main/{id} */}
        <Route
          path="/main/:id"
          element={
            <Main
              shortlistedCandidates={shortlistedCandidates}
              onShortlist={handleShortlist}
            />
          }
        />
        <Route
          exact
          path="/shortlist"
          element={<Shortlist shortlistedCandidates={shortlistedCandidates} />}
        />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/emailform" element={<EmailForm />} />
        
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
