import React from "react";

import Layout from "components/Layout";
import Seo from "components/Seo";

import { Hero, Process, Team } from "page_components/home";

const Home = () => {
  return (
    <Layout>
      <Hero />
      <Process />
      <Team />
    </Layout>
  );
};

export default Home;

export const Head = () => <Seo />