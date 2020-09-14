import React, { useState } from "react";
import useAuth from "./hooks/useAuth";
import { Route, Switch, useHistory } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from "./components/BubblePage";

import Login from "./components/Login";
import "./styles.scss";

function App() {
  let history = useHistory();
  const authAxios = useAuth("token", false);
  const [message, setMessage] = useState("");
  const logIn = async (login) => {
    const response = await authAxios.login("http://localhost:5000/api/login", login, (data) => {
      return data.payload;
    });

    if (response.success) history.push("/bubbles");
    else setMessage(response.error);
  };
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Login logIn={logIn} />
          {message && message}
        </Route>
        <PrivateRoute exact path="/bubbles">
          <BubblePage />
        </PrivateRoute>
      </Switch>
    </div>
  );
}

export default App;
