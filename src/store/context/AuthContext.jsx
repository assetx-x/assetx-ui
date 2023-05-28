import React from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext()
function AuthProvider(props) {

  const navigate = useNavigate();

  const login = (user, password) => {
    if (user === 'admini@assetx.com' && password === 'admin15') {
      window.localStorage.setItem('token', JSON.stringify({isAuthenticated: true}));
      navigate("/us/portfolio-analysis", { replace: true });
    }


  } // make a login request
  const register = () => {} // register the user
  const logout = () => {} // clear the token in localStorage and the user data

  const isAuthenticated = () => {
    const localToken = window.localStorage.getItem('token');
    const token = JSON.parse(localToken);
    return token && token.isAuthenticated;
  }

  return (
    <AuthContext.Provider value={{ login, logout, register, isAuthenticated}} {...props} >
      {props.children}
    </AuthContext.Provider>
  )
}

const useAuth = () => React.useContext(AuthContext)

export {AuthProvider, useAuth}
