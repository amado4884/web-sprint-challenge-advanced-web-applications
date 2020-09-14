import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import useAuth from "../hooks/useAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const axiosAuth = useAuth("token", false);
  useEffect(() => {
    axiosAuth.get("http://localhost:5000/api/colors").then((res) => setColorList(res.data));
  }, []);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
