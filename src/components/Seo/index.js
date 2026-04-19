import React from "react";

const Seo = ({ title }) => {
  return (
    <>
      <html lang="pl" />
      <title>{title} | OmniSar</title>
      <meta property="og:image" content="/og-image.png" />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"></link>
    </>
  );
};

export default Seo;
