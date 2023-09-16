import React from "react";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "../../services/apiClient.jsx";

const AuthContext = React.createContext()
function AuthProvider(props) {

  const navigate = useNavigate();

  const [isInvalid, setIsInvalid] = React.useState(false);

  const login = (data) => {
      window.localStorage.setItem('token', JSON.stringify({...data, isAuthenticated: true}));
      setAccessToken(data.access);
      setIsInvalid(false);
      navigate("/us/portfolio-analysis", { replace: true });
  }
  const register = () => {} // register the user
  const logout = () => {
    // clear the token in localStorage and the user data
    window.localStorage.clear()
    navigate("/", { replace: true });
  }

  const isAuthenticated = () => {
    const localToken = window.localStorage.getItem('token');
    const token = JSON.parse(localToken);
    return !!(token && token.isAuthenticated);
  }



  return (
    <AuthContext.Provider value={{ login, logout, register, isAuthenticated, isInvalid}} {...props} >
      {props.children}
    </AuthContext.Provider>
  )
}

const useAuth = () => React.useContext(AuthContext)

export {AuthProvider, useAuth}
