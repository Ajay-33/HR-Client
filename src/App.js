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
import Signup from "./components/Signup";
import Login from "./components/Login";
import Main from "./pages/Main";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/main" element={<Main/>}/>
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
