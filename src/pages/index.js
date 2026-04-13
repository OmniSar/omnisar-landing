import React from "react";

import Layout from "components/Layout";
import { Hero, Team } from "page_components/home";

const Home = () => {
  return (
    <Layout>
      <Hero />
      <Team />
    </Layout>
  );
};

export default Home;
