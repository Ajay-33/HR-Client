import React from "react";
import "./App.css";
import LinkedIn from "./components/LinkedIn";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Twitter from "./components/Twitter";
import Github from "./components/Github";
import Footer from "./components/Footer";
import Sidebar from "./components/SideBar";
import HeroSection from "./components/HeroSection";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
