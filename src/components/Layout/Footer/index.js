import "./styles.scss";
import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__inner">
          <p className="site-footer__brand">
            Omni<span className="site-footer__brand-accent">SAR</span>
          </p>
          <p className="site-footer__copy">© {year} OmniSAR.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
