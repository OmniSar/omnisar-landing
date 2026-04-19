import { withPrefix } from "gatsby";
import React from "react";

const Seo = ({ title }) => {
  return (
    <>
      <html lang="pl" />
      <title>{title} | OmniSar</title>
      <meta property="og:url" content="https://omnisar.netlify.app" />
      <meta property="og:image" content="https://omnisar.netlify.app/og-image.png" />
      <meta property="og:title" content={`${title} | OmniSar`} />
      <meta property="og:description" content="Portal do ogólnokrajowego monitorowania wykopalisk przy użyciu optycznych danych satelitarnych i SAR." />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"></link>
    </>
  );
};

export default Seo;
