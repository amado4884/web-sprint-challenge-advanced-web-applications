import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import useAuth from "../hooks/useAuth";

// The token here is only for testing.
const BubblePage = ({ token }) => {
  const [colorList, setColorList] = useState([]);
  const axiosAuth = useAuth("token", false, token ? token : null);

  useEffect(() => {
    axiosAuth
      .get("http://localhost:5000/api/colors")
      .then((res) => {
        setColorList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {colorList && <ColorList colors={colorList} updateColors={setColorList} />}
      {colorList && <Bubbles colors={colorList} />}
    </>
  );
};

export default BubblePage;
