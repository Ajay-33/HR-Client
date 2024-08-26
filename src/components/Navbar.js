import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div className="flex flex-col bg-red-100 ">
      <div className="flex justify-between p-4 mb-8">
        <div className="flex">
          <div className="text-3xl"> HR Shop </div>
        </div>
        <div className="flex gap-x-3 text-xl">
          <div>About</div>
          <div>Login</div>
          <div>Signup</div>
        </div>
      </div>
      <div className="bg-red-100 flex">
        <div className="w-1/2 flex justify-between p-4 text-xl">
          <Link to="/">LinkedIn</Link>
          <Link to="/github">Github</Link>
          <Link to="/twitter">Twitter</Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
