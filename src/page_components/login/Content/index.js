import "./styles.scss";
import React from "react";

import Button from "components/Button";

const Content = () => {
  return (
    <section className="login-unavailable-content">
      <div className="container">
        <h1 className="fs-48 margin-b-32">Aplikacja nie jest jeszcze dostępna</h1>
        <p className="fs-20 margin-b-16">Zapraszamy wkrótce.</p>
        <Button href="/">Strona główna</Button>
      </div>
    </section>
  );
};

export default Content;
