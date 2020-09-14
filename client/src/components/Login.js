import React, { useState } from "react";
import { useInput } from "../hooks/useInput";
const Login = ({ logIn }) => {
  const [username, setUsername, usernameChanges] = useInput("Lambda School");
  const [password, setPassword, passwordChanges] = useInput("i<3Lambd4");
  return (
    <>
      <input value={username} placeholder="Username" onChange={usernameChanges} />
      <input value={password} placeholder="Password" onChange={passwordChanges} />
      <button
        className="App-link"
        onClick={() => {
          logIn({ username, password });
        }}
      >
        Log In
      </button>
    </>
  );
};

export default Login;
