import "./styles.scss";
import React from "react";
import { motion } from "framer-motion";

import DiamondMark from "components/DiamondMark";
import RevealText from "components/RevealText";

import { PROCESS_STEPS } from "./data";

const Process = () => {
  return (
    <section id="proces" className="process p-128">
      <div className="container">
        <div className="process__title margin-b-64">
          <DiamondMark />
          <h2 className="fs-64">
            <RevealText>Działanie projektu</RevealText>
          </h2>
        </div>

        <ol className="process__list">
          {PROCESS_STEPS.map((step, index) => (
            <motion.li
              key={step.title}
              className="process__item"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
            >
              <span className="process__index" aria-hidden>
                {index + 1}
              </span>
              <div>
                <h3 className="process__item-title">{step.title}</h3>
                <p className="process__item-text fs-18">{step.description}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Process;
