import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL;

const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token) return;
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };
    fetchUser();
  }, []);

  let payload = null;
  if (token) {
    try {
      payload = JSON.parse(atob(token.split(".")[1]));
    } catch (err) {
      console.error("Invalid token", err);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-300 to-purple-400">
      <div className="bg-gradient-to-r from-purple-300 to-cyan-400 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-cyan-700">User Profile</h1>

        {user ? (
          <div className="bg-white/30 backdrop-blur-lg border border-gray-300 p-5 rounded-xl shadow-lg text-gray-800 text-sm space-y-2">
            <p><span className="font-semibold">Name:</span> {user.name}</p>
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">User ID:</span> {user.id}</p>
            <p><span className="font-semibold">Created At:</span> {new Date(user.createdAt).toLocaleString()}</p>
            <p><span className="font-semibold">Expires At:</span> {new Date(payload.exp * 1000).toLocaleString()}</p>
          </div>
        ) : (
          <p className="text-red-500 text-center">Loading user info...</p>
        )}

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 w-[80%] ml-9 bg-gradient-to-r from-cyan-300 to-purple-400 hover:opacity-90 
          text-green-800 py-2 rounded shadow cursor-pointer transition"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Profile;
