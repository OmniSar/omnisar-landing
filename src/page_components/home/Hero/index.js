import "./styles.scss";
import React from "react";

import Button from "components/Button";
import { Scene } from "./components";

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero__content">
          <p className="hero__eyebrow margin-b-16 fs-20">Ogólnokrajowe monitorowanie wykopalisk</p>

          <h1 className="hero__title fs-72 margin-b-32">
            Omni<span className="hero__title-accent">SAR</span>
          </h1>
          <p className="hero__subtitle margin-b-16 fs-20">Portal do ogólnokrajowego monitorowania wykopalisk przy użyciu optycznych danych satelitarnych i SAR.</p>

          <div className="hero__badges margin-b-24">
            <span className="hero__badge">Radarowa detekcja zmian</span>
            <span className="hero__badge">Walidacja optyczna</span>
            <span className="hero__badge">Ogólnokrajowe pokrycie</span>
          </div>

          <div className="hero__actions">
            <Button href="#proces" variant="primary">
              Proces
            </Button>
            <Button href="#zespol" variant="outline">
              Zespół
            </Button>
          </div>
        </div>
      </div>

      <Scene />
    </section>
  );
};

export default Hero;
