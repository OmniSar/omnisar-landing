import { withPrefix } from "gatsby";
import React from "react";

const Seo = ({ title }) => {
  return (
    <>
      <html lang="pl" />
      <title>{title} | OmniSar</title>
      <meta property="og:image" content={withPrefix("/og-image.png")} />
      <meta property="og:title" content={`${title} | OmniSar`} />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"></link>
    </>
  );
};

export default Seo;
