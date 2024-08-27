import React from "react";
import "./App.css";
import LinkedIn from "./components/LinkedIn";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Twitter from "./components/Twitter";
import Github from "./components/Github";
import Footer from "./components/Footer";
import Sidebar from "./components/SideBar";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <div className="flex bg-gradient-to-br from-blue-100 to-blue-300 space-x-2">
          <Sidebar />
          <Routes>
            <Route exact path="/" element={<LinkedIn />} />
            <Route exact path="/twitter" element={<Twitter />} />
            <Route exact path="/github" element={<Github />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
