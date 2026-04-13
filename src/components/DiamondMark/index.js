import "./styles.scss";
import React from "react";
import { motion } from "framer-motion";

const DIAMOND_PATH = "M50 6 L94 50 L50 94 L6 50 Z";

const DiamondMark = ({ className, size = 56, strokeWidth = 2, duration = 1.1 }) => {
  return (
    <svg className={className ? `diamond-mark ${className}` : "diamond-mark"} width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <motion.path
        d={DIAMOND_PATH}
        stroke="var(--diamond-mark-stroke, #8cffd2)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: { duration, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.25 },
        }}
        viewport={{ once: true, amount: 0.35 }}
      />
    </svg>
  );
};

export default DiamondMark;
