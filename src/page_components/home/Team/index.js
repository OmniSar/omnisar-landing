"use client";
import React from "react";
import "./styles.scss";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { User, Mail } from "lucide-react";

import DiamondMark from "components/DiamondMark";
import RevealText from "components/RevealText";

const TEAM = [
  {
    name: "Jakub Klimek",
    role: "Project lead & Imagery Analysis",
    description:
      "Kieruje realizacją projektu: planuje i nadzoruje harmonogram prac, rozdziela zadania oraz współpracuje z zespołem przy ustalaniu zakresu dostaw. Odpowiada za analizę i ocenę danych obrazowych, w tym za weryfikację jakości materiałów wejściowych, spójność etapów przetwarzania oraz poprawność wyników pośrednich i końcowych. Uczestniczy w opracowywaniu wymagań funkcjonalnych i niefunkcjonalnych oraz doprecyzowuje zapisy w dokumentacji projektowej.",
    imageSrc: "/jakub.jpg",
    linkedin: "https://www.linkedin.com/in/jakub-klimek-b643071b1",
    email: "jakub.klimek@example.com",
  },
  {
    name: "Michał Proć",
    role: "DevOps & Backend developer",
    description:
      "Zajmuje się przygotowaniem, konfiguracją i utrzymaniem środowisk developerskich, testowych i produkcyjnych oraz automatyzacją procesów budowania i wdrażania oprogramowania. Nadzoruje monitoring, rejestrowanie zdarzeń i obsługę incydentów eksploatacyjnych związanych z infrastrukturą. Rozwija i utrzymuje warstwę serwerową aplikacji: interfejsy programistyczne (API), logikę biznesową po stronie serwera oraz integracje z zewnętrznymi systemami; dba o wydajność, dostępność usług i zgodność wdrożeń z przyjętymi standardami bezpieczeństwa.",
    imageSrc: "/michal.jpg",
    linkedin: "https://www.linkedin.com/in/michal-proc",
    email: "michal.proc@example.com",
  },
  {
    name: "Bartłomiej Woźniczka",
    role: "Fullstack Developer & UI Lead",
    description:
      "Odpowiada za projektowanie oraz implementację interfejsu użytkownika: układ ekranów, typografię, stany interakcji, responsywność oraz spójność wizualną produktu. Nadzoruje jakość warstwy prezentacji z punktu widzenia użyteczności i dostępności. Realizuje zadania programistyczne w modelu fullstack: rozwój logiki po stronie klienta i serwera, integracja z API oraz utrzymanie kodu zgodnie z przyjętymi w projekcie konwencjami. Współpracuje przy optymalizacji czasu ładowania i renderowania widoków oraz przy porządkowaniu biblioteki komponentów współdzielonych przez zespół.",
    imageSrc: "/bartus.png",
    linkedin: "https://www.linkedin.com/in/bwozniczka",
    email: "bartlomiej.wozniczka@example.com",
  },
];

const Team = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
    <section ref={sectionRef} className="team">
      <div className="team__sticky">
        <div className="container">
          <div className="team__title margin-b-64">
            <DiamondMark />
            <h2 className="fs-64">
              <RevealText>Zespół</RevealText>
            </h2>
          </div>

          <div className={`row align-items-center${photoOnRight ? " flex-row-reverse" : ""}`}>
            <div className={`col-lg-6 col-xl-4 d-flex align-items-center${photoOnRight ? " justify-content-md-end" : ""}`}>
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
                key={member.name}
                initial={{ opacity: 0, x: photoOnRight ? 50 : -50, filter: "blur(5px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0)" }}
                exit={{ opacity: 0, x: photoOnRight ? 50 : -50, filter: "blur(5px)" }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="team__card">
                  <p className="team__eyebrow fs-18 margin-b-16">{member.role}</p>
                  <h2 id="team-heading" className="fs-48 margin-b-32">
                    {member.name}
                  </h2>

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
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
