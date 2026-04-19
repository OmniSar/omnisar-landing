import React, { useEffect, useRef, useState } from "react";
import "./styles.scss";

import clsx from "clsx";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { User, Mail } from "lucide-react";

import DiamondMark from "components/DiamondMark";
import RevealText from "components/RevealText";

import { TEAM } from "./data";

const SCROLL_LAYOUT_MIN_PX = 1200;

const TeamMemberContent = ({ member }) => (
  <div className="team__card">
    <p className="team__eyebrow fs-18 margin-b-16">{member.role}</p>
    <h2 className="fs-48 margin-b-32">{member.name}</h2>

    {member.description ? <p className="team__description margin-b-64 fs-18">{member.description}</p> : null}

    <div className="team__links">
      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} na LinkedIn`}>
        <User size={22} strokeWidth={1.5} aria-hidden />
      </a>
      <a href={`mailto:${member.email}`} aria-label={`Wyślij e-mail do: ${member.name}`}>
        <Mail size={22} strokeWidth={1.5} aria-hidden />
      </a>
    </div>
  </div>
);

const Team = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrollLayout, setIsScrollLayout] = useState(() => typeof window !== "undefined" && window.matchMedia(`(min-width: ${SCROLL_LAYOUT_MIN_PX}px)`).matches);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${SCROLL_LAYOUT_MIN_PX}px)`);
    const onChange = () => setIsScrollLayout(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = Math.min(TEAM.length - 1, Math.floor(latest * TEAM.length));
    setActiveIndex((prev) => (prev === next ? prev : next));
  });

  const member = TEAM[activeIndex];
  const photoOnRight = activeIndex % 2 === 1;

  return (
    <section ref={sectionRef} id="zespol" className={clsx("team", isScrollLayout ? "team--scroll" : "team--stacked")}>
      <div className="team__sticky">
        <div className="container">
          <div className="team__title margin-b-64">
            <DiamondMark />
            <h2 className="fs-64">
              <RevealText>Zespół</RevealText>
            </h2>
          </div>

          {isScrollLayout ? (
            <div className={`row align-items-stretch${photoOnRight ? " flex-row-reverse" : ""}`}>
              <div className={`col-lg-6 col-xl-4 d-flex align-items-stretch${photoOnRight ? " justify-content-md-end" : ""}`}>
                <motion.div
                  className="team__photo"
                  key={member.name}
                  initial={{ opacity: 0, filter: "blur(5px)" }}
                  animate={{ opacity: 1, filter: "blur(0)" }}
                  exit={{ opacity: 0, filter: "blur(5px)" }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img src={member.imageSrc} alt="" />
                </motion.div>
              </div>
              <div className="col-lg-12 col-xl-8">
                <motion.div
                  className="h-100"
                  key={member.name}
                  initial={{ opacity: 0, x: photoOnRight ? 50 : -50, filter: "blur(5px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0)" }}
                  exit={{ opacity: 0, x: photoOnRight ? 50 : -50, filter: "blur(5px)" }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <TeamMemberContent member={member} />
                </motion.div>
              </div>
            </div>
          ) : (
            <div className="team__stack" role="list">
              {TEAM.map((m, ix) => (
                <article key={ix} className="team__tile" role="listitem">
                  <motion.div
                    className="team__photo"
                    initial={{ opacity: 0, filter: "blur(5px)" }}
                    whileInView={{ opacity: 1, filter: "blur(0)" }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.img animate={activeIndex == ix ? { filter: "grayscale(0.25)" } : { filter: "grayscale(1)" }} src={m.imageSrc} alt="" />
                  </motion.div>
                  <TeamMemberContent member={m} />
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Team;
