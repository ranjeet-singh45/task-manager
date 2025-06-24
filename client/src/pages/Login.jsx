import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/login`, { email: email.toLowerCase(), password });
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("User not found or incorrect password");
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-300 to-purple-400">
      <div className="relative bg-white p-8 rounded-[2rem] shadow-xl w-full max-w-sm overflow-hidden">
        <div className="absolute top-[-50px] right-[-50px] w-35 h-35 bg-gradient-to-br from-cyan-300 to-purple-500 rounded-full"></div>
        <div className="absolute bottom-[-50px] left-[-50px] w-35 h-35 bg-gradient-to-br from-cyan-300 to-purple-500 rounded-full"></div>

        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-center text-cyan-600 mb-1">Login</h2>
          <p className="text-sm text-center text-gray-500 mb-6">Enter your credentials</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">E mail Address</label>
              <input
                type="email"
                className="mt-1 w-full border-b border-cyan-300 bg-transparent outline-none py-1 focus:border-purple-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="mt-1 w-full border-b border-cyan-300 bg-transparent outline-none py-1 focus:border-purple-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-[80%] ml-7 mt-5 bg-gradient-to-r from-cyan-300 to-purple-400 text-white font-semibold py-2 rounded 
              shadow hover:opacity-90 transition cursor-pointer"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have account?{' '}
            <Link to="/signup" className="text-cyan-600 hover:underline">
              signup here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
