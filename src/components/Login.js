import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/main");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/api/v1/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        }
      );

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message);
      }
      if (response.ok && json.success) {
        localStorage.setItem("token", json.token);
        localStorage.setItem("userName", json.user.firstName);
        console.log("double success");
        navigate("/main");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-900 relative overflow-hidden">
      {/* Background Blurred Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-36 h-36 bg-teal-400 rounded-full opacity-60 mix-blend-multiply animate-pulse blur-xl"></div>
        <div className="absolute bottom-32 right-8 w-20 h-20 bg-purple-500 rounded-full opacity-40 mix-blend-multiply animate-pulse blur-lg"></div>
        <div className="absolute top-2/3 left-8 w-44 h-44 bg-pink-500 rounded-full opacity-40 mix-blend-multiply animate-pulse blur-lg"></div>
      </div>

      {/* Translucent Form */}
      <div className="relative w-full max-w-sm p-6 mx-4 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg border border-purple-300">
        <h2 className="text-xl font-bold text-center text-white mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmission}>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-semibold mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 text-white bg-transparent border-b border-purple-300 placeholder-white focus:outline-none focus:border-purple-500"
              placeholder="shriya.sheri@example.com"
              required
              onChange={onChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-semibold mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 text-white bg-transparent border-b border-purple-300 placeholder-white focus:outline-none focus:border-purple-500"
              placeholder="********"
              required
              onChange={onChange}
            />
          </div>
          {/* Enhanced Login Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white font-semibold rounded-md shadow-lg focus:outline-none bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-pink-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105"
          >
            Login
          </button>
          {/* Sign in with Google Button */}
          <button
            type="button"
            className="w-full px-4 py-2 mt-4 text-purple-800 font-semibold rounded-md shadow-lg focus:outline-none bg-white hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.15 0 5.88 1.08 8.07 2.92l6-6C34.54 3.88 29.5 2 24 2 14.8 2 7.18 7.66 4.24 15.63l7.12 5.52C13.1 15.3 18.06 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.3 24.5c0-1.55-.14-3.04-.4-4.5H24v9h12.8c-.55 3.02-2.33 5.5-4.92 7.16l7.56 5.86c4.41-4.07 6.86-10.08 6.86-17.52z"
              />
              <path
                fill="#FBBC05"
                d="M11.36 28.02c-.88-2.56-.88-5.3 0-7.86L4.24 14.63C1.66 19.43 1.66 25.57 4.24 30.37l7.12-5.52z"
              />
              <path
                fill="#34A853"
                d="M24 44c5.54 0 10.2-1.83 13.6-4.98l-7.56-5.86C27.77 34.98 25.94 35.5 24 35.5c-5.94 0-10.9-5.8-11.64-12.65l-7.12 5.52C7.18 40.34 14.8 46 24 46z"
              />
              <path fill="none" d="M2 2h44v44H2z" />
            </svg>
            <span>Sign in with Google</span>
          </button>
        </form>
        {/* Don't have an account? */}
        <div className="mt-6 text-center">
          <p className="text-white">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-purple-400 hover:underline hover:text-purple-500"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
