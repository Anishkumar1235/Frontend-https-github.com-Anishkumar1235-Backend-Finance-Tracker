// import React, { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { login } = useContext(AuthContext);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await axios.post("http://localhost:5001/api/auth/login", {
//         email,
//         password,
//       });

//       login(response.data.token); // Save token and set authenticated state
//       toast.success("Login successful!");
//     } catch (error) {
//       toast.error(error.response?.data || "Login failed!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="max-w-md w-full bg-white p-6 rounded shadow-md">
//         <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label className="block text-gray-700 font-bold mb-1">Email</label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 font-bold mb-1">Password</label>
//             <input
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ${
//               loading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             disabled={loading}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//         <p className="mt-4 text-center text-gray-600">
//           Don't have an account?{" "}
//           <button
//             onClick={() => navigate("/signup")}
//             className="text-blue-500 hover:underline"
//           >
//             Sign Up
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/login",
        {
          email,
          password,
        }
      );

      login(response.data.token);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 bg-opacity-50 backdrop-blur-lg flex items-center justify-center px-4">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white p-6 md:p-8 lg:p-10 rounded shadow-md">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6">
          Login
        </h1>
        <form onSubmit={handleLogin}>
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
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-500 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
