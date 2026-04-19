import React, { useEffect } from "react";
import "scss/app.scss";

import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  useEffect(() => {
    let rafId = null;
    let lenis = null;
    let isDisposed = false;

    const startLenis = async () => {
      const { default: Lenis } = await import("lenis");
      if (isDisposed) return;

      lenis = new Lenis({
        duration: 1.1,
        smoothWheel: true,
        smoothTouch: false,
      });

      const raf = (time) => {
        lenis.raf(time);
        rafId = window.requestAnimationFrame(raf);
      };

      rafId = window.requestAnimationFrame(raf);
    };

    startLenis();

    return () => {
      isDisposed = true;
      if (rafId) window.cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
    };
  }, []);

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
