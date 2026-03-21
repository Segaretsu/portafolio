import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import portfolioProjects from "@constants/portfolio";
import CardWrapper from "@components/commons/CardWrapper";
import useIsMobile from "@modules/shared/hooks/useIsMobile";
import { useGSAPContext } from "src/context/GSAPProvider";

const Section = styled.section`
  min-height: 100vh;
  padding: 6rem 0;
  background: var(--body-color);
  color: var(--title-color);
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
`;

const LeftCopy = styled.div`
  grid-column: span 4;
  align-self: center;
  position: relative;
  z-index: 0;
  transition: transform 0.4s ease;

  @media (max-width: 1024px) {
    grid-column: span 12;
    position: flex;
  }

  h2 {
    font-size: clamp(2.5rem, 6vw, 5rem);
    line-height: 0.95;
    margin: 0 0 1.5rem;
    color: var(--first-color);
    font-weight: var(--font-semi-bold);
  }

  p {
    color: var(--text-color);
    max-width: 38ch;
    font-size: var(--normal-font-size);
    line-height: 1.6;
  }
`;

const RightRail = styled.div`
  grid-column: span 8;
  position: relative;
  overflow: visible;

  @media (max-width: 1024px) {
    grid-column: span 12;
    overflow-x: hidden;
  }
`;

const Cards = styled.div`
  display: grid;
  gap: 2rem;
  grid-auto-flow: column;
  grid-auto-columns: minmax(560px, 50vw);
  padding-right: 4rem;

  @media (max-width: 1024px) {
    grid-auto-columns: 100%;
    padding-right: 0;
  }
`;

const ShowNotTellMobile = styled.div`
  display: none;
  flex-direction: column;
  width: 100%;
  max-width: 550px;
  min-height: 820px;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
    max-width: 100%;
    min-height: 570px;
  }
`;

const ProjectsShowcase = () => {
  const railRef = useRef(null);
  const sectionRef = useRef(null);
  const leftCopyRef = useRef(null);
  const animationRef = useRef(null);

  const isMobile = useIsMobile();

  const gsapContext = useGSAPContext();

  useEffect(() => {
    if (typeof window === "undefined" || !gsapContext) return;

    let cleanup = () => {};

    const setup = () => {
      try {
        const rail = railRef.current;
        const leftCopy = leftCopyRef.current;
        if (!rail) return;

        const start = isMobile ? "top -5%" : "top top";
        const { gsap } = gsapContext;

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start,
            end: () => `+=${rail.scrollWidth - rail.clientWidth + window.innerHeight * 0.3}`,
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(rail, { x: () => -(rail.scrollWidth - rail.clientWidth) });

        if (!isMobile && leftCopy) {
          tl.to(
            leftCopy,
            {
              x: () => -(rail.scrollWidth - rail.clientWidth) * 0.3, // dinámico
              ease: "none",
            },
            0
          );
        }

        animationRef.current = tl;
        cleanup = () => {
          tl.kill();
        };
      } catch (e) {
        console.warn("Horizontal scroll not initialized:", e);
      }
    };

    // Inicializar sin delay para evitar layouts shifts cuando el usuario ya ha empezado a hacer scroll
    setup();

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
      cleanup();
    };
  }, [gsapContext, isMobile]);

  return (
    <>
      <Section id="projects" ref={sectionRef}>
        <Grid>
          {!isMobile && (
            <LeftCopy ref={leftCopyRef}>
              <h2>
                Show
                <br />
                not tell
              </h2>
              <p>
                Selected work spanning product, web and platform engineering.
                Click any project to see the full story, architecture and
                impact.
              </p>
            </LeftCopy>
          )}

          <RightRail>
            <Cards ref={railRef}>
              <ShowNotTellMobile key={"ejempl"}>
                <LeftCopy>
                  <h2>
                    Show
                    <br />
                    not tell
                  </h2>
                  <p>
                    Selected work spanning product, web and platform
                    engineering. Click any project to see the full story,
                    architecture and impact.
                  </p>
                </LeftCopy>
              </ShowNotTellMobile>
              {portfolioProjects.map((project) => {
                const { background, description, img, job, slug, title } =
                  project;
                const exploreLink = `/projects/${
                  slug || encodeURIComponent(p.title.toLowerCase())
                }`;
                const imageProject = `/images/projects/${img}`;
                return (
                  <CardWrapper
                    title={title}
                    subtitle={job || null}
                    description={description}
                    image={imageProject}
                    bg={background}
                    link={exploreLink}
                  />
                );
              })}
            </Cards>
          </RightRail>
        </Grid>
      </Section>
    </>
  );
};

export default ProjectsShowcase;
