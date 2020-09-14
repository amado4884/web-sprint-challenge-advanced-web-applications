import React from "react";
import useAuth from "../hooks/useAuth";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const auth = useAuth("token", true);
  return auth.loggedIn() ? <Route {...rest}>{children}</Route> : <Redirect to="/" />;
};

export default PrivateRoute;
