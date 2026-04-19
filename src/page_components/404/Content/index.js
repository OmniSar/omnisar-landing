import "./styles.scss";
import React from "react";

import Button from "components/Button";

const Content = () => {
  return (
    <section className="not-found-content">
      <div className="container">
        <h1 className="fs-48 margin-b-32">Nie znaleziono strony</h1>
        <p className="fs-20 margin-b-16">Przykro nam, strona o tym adresie nie istnieje.</p>
        <Button href="/">Strona główna</Button>
      </div>
    </section>
  );
};

export default Content;
