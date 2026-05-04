import "./styles.scss";
import React from "react";

import Button from "components/Button";
import { Link } from "gatsby";

const Content = () => {
  return (
    <section className="login-unavailable-content">
      <div className="container">
        <h1 className="fs-48 margin-b-32">
          Aplikacja nie jest jeszcze <br />
          dostępna
        </h1>
        <p className="fs-20 margin-b-32">Zapraszamy wkrótce!</p>
        <Link to="/" className="btn btn--primary">
          Strona główna
        </Link>
      </div>
    </section>
  );
};

export default Content;
