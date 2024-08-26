import React from "react";
import "./App.css";
import LinkedIn from "./components/LinkedIn";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Twitter from "./components/Twitter";
import Github from "./components/Github";
import Footer from "./components/Footer";
// Testinggggggggggggg
function App() {
  return (
    <div className="">
    <Router>
      <Navbar />
      <Routes >
        <Route exact path="/" element={<LinkedIn />} />
        <Route exact path="/twitter" element={<Twitter />} />
        <Route exact path="/github" element={<Github/>}/>
      </Routes>
      <Footer/>
    </Router>
    </div>
  );
}

export default App;
