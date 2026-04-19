import "./styles.scss";
import React, { useEffect, useId, useState } from "react";
import clsx from "clsx";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import Button from "components/Button";
import DiamondMark from "components/DiamondMark";

const LOGIN_HREF = "/login";

const items = [
  {
    label: "Proces",
    href: "#proces",
  },
  {
    label: "Zespół",
    href: "#zespol",
  },
  {
    label: "Przejdź do aplikacji",
    href: LOGIN_HREF,
    isCta: true,
  },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const menuId = useId();

  useEffect(() => {
    const handler = () => {
      if (window.scrollY > 10 && !isScrolled) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handler);

    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={clsx("site-header", (isScrolled || open) && "site-header--is-scrolled")}>
      <div className="container">
        <div className="site-header__bar">
          <a className="site-header__brand" href="/" onClick={close}>
            <span className="site-header__brand-text">
              Omni<span className="site-header__brand-accent">SAR</span>
            </span>
          </a>

          <nav className="site-header__nav" aria-label="Główna nawigacja">
            {items?.map((i, ix) =>
              i?.isCta ? (
                <Button key={ix} href={i.href} variant="primary">
                  {i.label}
                </Button>
              ) : (
                <a key={ix} className="site-header__link" href={i?.href}>
                  {i?.label}
                </a>
              ),
            )}
          </nav>

          <button type="button" className="site-header__toggle" aria-expanded={open} aria-controls={menuId} onClick={() => setOpen((v) => !v)}>
            {open ? <X size={24} strokeWidth={1.5} aria-hidden /> : <Menu size={24} strokeWidth={1.5} aria-hidden />}
            <span className="visually-hidden">{open ? "Zamknij menu" : "Otwórz menu"}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            initial={{ opacity: 0, maxHeight: 0 }}
            animate={{ opacity: 1, maxHeight: "280px" }}
            exit={{ opacity: 0, maxHeight: 0 }}
            className="site-header__drawer"
            aria-hidden={!open}
          >
            <div className="container">
              <nav className="site-header__drawer-nav" aria-label="Menu mobilne">
                {items?.map((i, ix) =>
                  i?.isCta ? (
                    <Button key={ix} href={i.href} variant="primary" className="site-header__drawer-cta-slot" onClick={close}>
                      {i.label}
                    </Button>
                  ) : (
                    <a key={ix} onClick={close} className="site-header__drawer-link" href={i?.href}>
                      {i?.label}
                    </a>
                  ),
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {open ? <button type="button" className="site-header__backdrop" aria-label="Zamknij menu" onClick={close} /> : null}
    </header>
  );
};

export default Header;
