import React from "react";
import "./App.css";
import LinkedIn from "./components/LinkedIn";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Twitter from "./components/Twitter";
import Github from "./components/Github";
import Footer from "./components/Footer";
// import Sidebar from "./components/SideBar";
import HeroSection from "./components/HeroSection";
import Home from "./pages/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Main from "./pages/Main";
import CandidateCards from "./components/CandidateCards";
import FilterableCandidateCards from "./components/FilterableCandidateCards";

function App() {
  return (
    <div className="overflow-x-hidden">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          {/* <Route exact path="/main" element={<Main/>}/> */}
          {/* <Route exact path="/main" element={<CandidateCards/>}/> */}
          <Route exact path="/main" element={<FilterableCandidateCards/>}/>
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
