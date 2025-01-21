import React, { useState } from "react";

const AuthForm = ({ onSubmit, buttonText }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ email, password });
      }}
      className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white shadow-md rounded p-4 sm:p-6 md:p-8 mx-auto"
    >
      <div className="mb-4">
        <label className="block font-bold text-sm sm:text-base text-gray-700 mb-1">
          Email:
        </label>
        <input
          type="email"
          className="w-full p-2 sm:p-3 border rounded focus:outline-none focus:ring focus:ring-blue-200"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold text-sm sm:text-base text-gray-700 mb-1">
          Password:
        </label>
        <input
          type="password"
          className="w-full p-2 sm:p-3 border rounded focus:outline-none focus:ring focus:ring-blue-200"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 sm:p-3 rounded hover:bg-blue-600 transition"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default AuthForm;
