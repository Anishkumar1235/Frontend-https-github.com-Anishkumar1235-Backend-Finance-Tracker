import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./Components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TransactionTable from "./components/TransactionTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <TransactionTable /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/" : "/login"} />}
        />
      </Routes>
    </>
  );
};

export default App;
