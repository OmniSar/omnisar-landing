import React from "react";

import Layout from "components/Layout";
import Seo from "components/Seo";

import { Content } from "page_components/login";

const Login = () => {
  return (
    <Layout>
      <Content />
    </Layout>
  );
};

export default Login;

export const Head = () => <Seo title="Aplikacja" />;
