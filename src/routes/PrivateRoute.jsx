import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const auth = null; // determine if authorized, from context or however you're doing it
  return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
