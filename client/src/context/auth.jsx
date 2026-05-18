// client/src/context/auth.jsx
import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // Configure default axios headers for request interceptions
  useEffect(() => {
    if (auth?.token) {
      axios.defaults.headers.common["Authorization"] = auth.token;
    }
  }, [auth?.token]);

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        user: parseData.user,
        token: parseData.token,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom consumer hook
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    return [{ user: null, token: "" }, () => {}]; // Safe fallback pattern
  }
  return context;
};

export { useAuth, AuthProvider };