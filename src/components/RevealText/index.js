"use client";
import React from "react";
import { motion } from "framer-motion";

import "./styles.scss";

const RevealText = ({ children, className, delay = 0, duration = 1.2 }) => {
  return (
    <motion.div
      className={className ? `reveal-text ${className}` : "reveal-text"}
      initial={{ y: 28, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, amount: 1.0, margin: "0px 0px -20% 0px" }}
    >
      {children}
    </motion.div>
  );
};

export default RevealText;
