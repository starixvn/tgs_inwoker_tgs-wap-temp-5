import React from "react";
import config from "@/config/config";
import Default from "./default";
import WGHK from "./wghk";

// if you want to add custom home page by site, add here
const homeComponentBrandMapping = {
  WGHK: WGHK,
};

const Home = (props) => {
  const HomeComponent = homeComponentBrandMapping[config.brand] || Default;

  return (
    <HomeComponent navigate={props.navigate} appHistory={props.appHistory} />
  );
};

export default Home;
