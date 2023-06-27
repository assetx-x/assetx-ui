import React from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext()
function AuthProvider(props) {

  const navigate = useNavigate();

  const [isInvalid, setIsInvalid] = React.useState(false);

  const enabledUsers = [
    {user: 'admini@assetx.com', password: 'admin15'},
    {user: 'asingh@tenerecapital.com', password: 'b3ta4'},
    {user: 'jsarrett@tenerecapital.com', password: 'b3ta14'},
  ]

  const login = (user, password) => {
    if (enabledUsers.find(u => u.user === user && u.password === password)) {
      window.localStorage.setItem('token', JSON.stringify({isAuthenticated: true}));
      setIsInvalid(false);
      navigate("/us/portfolio-analysis", { replace: true });

    }else{
      setIsInvalid(true);
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
    <AuthContext.Provider value={{ login, logout, register, isAuthenticated, isInvalid}} {...props} >
      {props.children}
    </AuthContext.Provider>
  )
}

const useAuth = () => React.useContext(AuthContext)

export {AuthProvider, useAuth}
