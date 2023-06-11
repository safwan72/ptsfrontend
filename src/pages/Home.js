import React from "react";
import HOC from "./HOC";
import Carousal from "../components/Home/Carousal";
import AllMenu from "../components/Home/AllMenu";
import Feedback from "../components/Home/Feedback";
const Home = () => {
  return (
    <HOC>
      <Carousal />
      <AllMenu home={true}/>
      <Feedback/>
    </HOC>
  );
};

export default Home;
