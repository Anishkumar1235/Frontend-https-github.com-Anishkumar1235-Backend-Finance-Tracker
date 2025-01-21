import { useNavigate } from "react-router-dom";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // useNavigate is valid now

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    navigate("/"); // Redirect to home after login
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
