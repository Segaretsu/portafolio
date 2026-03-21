import styled from "styled-components";
import HeroLogo from "@modules/portfolio/components/HeroLogo";
import HeroPhoto from "@modules/portfolio/components/HeroPhoto";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import { useRef } from "react";
import HeroText from "@modules/portfolio/components/HeroText";
import AboutContent from "@modules/portfolio/components/AboutContent";
import useIsMobile from "@modules/shared/hooks/useIsMobile";
import { useGSAPContext } from "src/context/GSAPProvider";

const HeroWrapper = styled.section`
  @supports (aspect-ratio: 1) {
    body {
      --framer-aspect-ratio-supported: auto;
    }
  }
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 100vh;
  background: #f2f2f2;
  overflow: hidden;
  padding: 0 2rem;
  padding-bottom: 6rem;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-end;
    background: #f2f2f2;
    padding-bottom: 4rem;
  }
`;

// 👉 Overlay oscuro solo para móvil
const DarkOverlay = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000000;
    //background: linear-gradient(180deg, #14141400 30%, #141414 60%);
    background: linear-gradient(180deg, #14141400 40%, #141414 70%);
    z-index: 1;
  }
`;

export default function HeroSection() {
  const heroRef = useRef(null);
  const isMobile = useIsMobile();
  const gsapContext = useGSAPContext();

  useGSAP(() => {
    if (!gsapContext) return;
    const { gsap, ScrollTrigger, SplitText } = gsapContext;

    const animate = () => {

      const start = isMobile ? "top top" : "top top";

      const titleSplit = new SplitText(".hero__title", { type: "words" });
      const subtitleSplit = new SplitText(".hero_subtitles", { type: "lines" });

      gsap.set(".hero__title, .hero_subtitles", { visibility: "visible" });

      // 🔹 Animaciones al cargar (sin scroll)
      const introTimeline = gsap.timeline({ defaults: { ease: "expo.out" } });

      introTimeline.fromTo(
        titleSplit.words,
        {
          opacity: 0,
          yPercent: 100,
        },
        {
          opacity: 1,
          yPercent: 0,
          duration: 1.8,
          stagger: 0.06,
          onStart: function () {
            // Asegura que todos los words sean visibles antes de animar
            titleSplit.words.forEach((el) => (el.style.visibility = "visible"));
          },
        },
        "fadeStart+=1"
      );

      introTimeline.from(
        subtitleSplit.lines,
        {
          opacity: 0,
          yPercent: 100,
          duration: 1.3,
          stagger: 0.06,
        }, // empieza medio segundo después del título
        "fadeStart+=1.5"
      );

      // Hero logo
      if (isMobile) {
        introTimeline.from(
          ".hero__logo-img",
          {
            opacity: 0,
            duration: 4,
            xPercent: -100,
            stagger: 0.06,
          },
          "fadeStart"
        );
      } else {
        introTimeline.from(
          ".hero__logo-img",
          {
            opacity: 0,
            duration: 4,
            xPercent: 100,
            stagger: 0.06,
          },
          "fadeStart"
        );
      }

      // Hero zoom
      introTimeline.fromTo(
        ".hero__photo", // 👉 le damos una clase al wrapper
        { scale: 1.1 },
        { scale: 1, duration: 3, ease: "power1.inOut" },
        "fadeStart" // 🔹 sincronizado con el resto
      );

      gsap.set(".about__title, .about__desc", { autoAlpha: 0 });

      // 🔹 Animación controlada por scroll
      const heroTimeline = gsap.timeline({
        defaults: { ease: "power1.inOut" },
        scrollTrigger: {
          trigger: heroRef.current,
          start,
          end: "+=1800",
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const titleHeroDuration = 6; // Reducido para que termine antes
      const aboutTextDuration = 4; // Duración específica para el texto about

      // Hero sale

      heroTimeline.to(
        ".hero__subtitle-fade",
        {
          x: isMobile ? "100vw" : "-100vw",
          duration: titleHeroDuration,
          ease: "power1.out",
        },
        "fadeStart"
      ); // empieza un poquito después
      heroTimeline.to(
        ".hero__title-fade",
        {
          x: isMobile ? "100vw" : "-100vw",
          duration: titleHeroDuration,
          ease: "power1.out",
        },
        "fadeStart+=0.2"
      ); // etiqueta de control

      heroTimeline.fromTo(
        ".hero__logo-img",
        {
          opacity: 1,
        },
        {
          opacity: 0,
          duration: 4,
          transformOrigin: "center center",
        },
        "fadeStart"
      );

      // About entra
      if (isMobile) {
        // 👉 Animación del fondo (zoom + desplazamiento)
        heroTimeline.fromTo(
          ".hero__photo",
          {
            scale: 1,
          },
          {
            scale: 1.05, // zoom suave
            x: () => window.innerWidth * 0.02,
            duration: 10,
            transformOrigin: "center center",
            ease: "none", // 🔹 importante: sin easing, responde lineal al scroll
          },
          "fadeStart"
        );
        // Mobile: entra desde abajo
        heroTimeline.fromTo(
          ".about__title",
          {
            yPercent: 100,
            autoAlpha: 0,
          },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: aboutTextDuration,
          },
          `fadeStart+=${titleHeroDuration - 0.2}`
        );

        heroTimeline.fromTo(
          ".about__desc",
          {
            position: "absolute",
            yPercent: 50,
            autoAlpha: 0,
          },
          {
            position: "relative",
            yPercent: 0,
            autoAlpha: 1,
            duration: aboutTextDuration * 0.8,
          },
          ">0.2"
        );
      } else {
        // 👉 Animación del fondo (zoom + desplazamiento)
        heroTimeline.fromTo(
          ".hero__photo",
          {
            scale: 1,
          },
          {
            scale: 1.1, // zoom suave
            x: () => window.innerWidth * 0.2,
            duration: 10,
            transformOrigin: "center center",
            ease: "none", // 🔹 importante: sin easing, responde lineal al scroll
          },
          "fadeStart"
        );
        // Desktop: entra desde la derecha
        heroTimeline.fromTo(
          ".about__title",
          {
            opacity: 1,
            xPercent: 100,
            autoAlpha: 0,
          },
          {
            opacity: 1,
            xPercent: 0,
            autoAlpha: 1,
            duration: aboutTextDuration,
            ease: "power1.out",
          },
          `fadeStart+=${titleHeroDuration - 5}`
        );
        heroTimeline.fromTo(
          ".about__desc",
          {
            position: "relative",
            yPercent: 300,
            autoAlpha: 0,
          },
          {
            position: "relative",
            yPercent: 0,
            autoAlpha: 1,
            duration: aboutTextDuration * 0.8,
          },
          ">0.2"
        );
      }
    };

    animate();
  }, { dependencies: [gsapContext, isMobile] });

  return (
    <HeroWrapper ref={heroRef} id="hero">
      <HeroLogo />
      <HeroPhoto />
      {/* Overlay oscuro solo en móvil */}
      <DarkOverlay />
      <HeroText />
      <AboutContent />
    </HeroWrapper>
  );
}
