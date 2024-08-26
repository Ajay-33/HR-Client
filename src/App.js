import React from "react";
import "./App.css";
import LinkedIn from "./components/LinkedIn";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Twitter from "./components/Twitter";
import Github from "./components/Github";
// Testinggggggggggggg
function App() {
  return (
    <div>
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<LinkedIn />} />
        <Route exact path="/twitter" element={<Twitter />} />
        <Route exact path="/github" element={<Github/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
