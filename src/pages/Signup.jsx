import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:5001/api/auth/register", {
        name,
        email,
        password,
      });

      toast.success("Signup successful! Please log in.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 bg-opacity-50 backdrop-blur-lg flex items-center justify-center px-4">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white p-6 sm:p-8 lg:p-10 rounded shadow-md">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6">
          Sign Up
        </h1>
        <form onSubmit={handleSignup}>
          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:underline"
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
