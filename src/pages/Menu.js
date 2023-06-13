import React from "react";
import HOC from "./HOC";
import AllMenu from "../components/Home/AllMenu";


const Menu = () => {
  return (
    <HOC>
<AllMenu home={false}/>
    </HOC>
  );
};

export default Menu;
