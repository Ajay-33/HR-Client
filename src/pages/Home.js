import React from "react";
import HeroSection from "../components/HeroSection";
import LinkedIn from "../components/LinkedIn";
// import GPT from "../components/GPT";
// import Twitter from "../components/Twitter";
// import GitHub from "../components/Github";

function Home() {
  return (
    <div className="relative bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-900">
      <HeroSection />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-teal-400 rounded-full opacity-60 mix-blend-multiply animate-pulse"></div>

        <div className="absolute bottom-32 right-8 w-24 h-24 bg-purple-500 rounded-full opacity-40 mix-blend-multiply animate-pulse"></div>
        <div className="absolute top-2/3 left-8 w-56 h-56 bg-pink-500 rounded-full opacity-40 mix-blend-multiply animate-pulse"></div>
      </div>

      <div className="relative z-10">
        <LinkedIn />
      </div>
    </div>
  );
}

export default Home;
