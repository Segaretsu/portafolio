import Image from 'next/image';
import React, { useEffect } from 'react';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import Proyectos from '@constants/Proyects'
// import sr from '@utils/sr';
// import { srConfig } from '@config';

// ${({ theme }) => theme.mixins.resetList};
const StyledProjectsGrid = styled.ul`
  a {
    position: relative;
    z-index: 1;
  }
  max-width: 1200px;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

// const StyledAboutSection = styled.section`
//   max-width: 900px;
//   .inner {
//     display: grid;
//     grid-template-columns: 3fr 2fr;
//     grid-gap: 50px;
//     @media (max-width: 768px) {
//       display: block;
//     }
//   }
// `;

const StyledProject = styled.li`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;
  &:not(:last-of-type) {
    margin-bottom: 100px;
    @media (max-width: 768px) {
      margin-bottom: 70px;
    }
    @media (max-width: 480px) {
      margin-bottom: 30px;
    }
  }
  &:nth-of-type(odd) {
    .project-content {
      grid-column: 7 / -1;
      text-align: right;
      @media (max-width: 1080px) {
        grid-column: 5 / -1;
      }
      @media (max-width: 768px) {
        grid-column: 1 / -1;
        padding: 40px 40px 30px;
      }
      @media (max-width: 480px) {
        padding: 25px 25px 20px;
      }
    }
    .project-tech-list {
      justify-content: flex-end;
      li {
        margin: 0 0 5px 20px;
        @media (max-width: 768px) {
          margin: 0 0 5px 10px;
        }
      }
    }
    .project-links {
      justify-content: flex-end;
      margin-left: 0;
      margin-right: -10px;
    }
    .project-image {
      grid-column: 1 / 8;
      @media (max-width: 768px) {
        grid-column: 1 / -1;
      }
    }
  }
  .project-content {
    position: relative;
    grid-column: 1 / 7;
    grid-row: 1 / -1;
    @media (max-width: 1080px) {
      grid-column: 1 / 9;
    }
    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      grid-column: 1 / -1;
      padding: 40px 40px 30px;
      z-index: 5;
    }
    @media (max-width: 480px) {
      padding: 30px 25px 20px;
    }
  }
  .project-overline {
    margin: 10px 0;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 400;
  }
  .project-title {
    color: var(--lightest-slate);
    font-size: clamp(24px, 5vw, 28px);
    @media (min-width: 768px) {
      margin: 0 0 20px;
    }
    @media (max-width: 768px) {
      color: var(--white);
      a {
        position: static;
        &:before {
          content: '';
          display: block;
          position: absolute;
          z-index: 0;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      }
    }
  }
  .project-description {
    box-shadow: 0 10px 30px -15px var(--navy-shadow);
    transition: var(--transition);
    position: relative;
    z-index: 2;
    padding: 25px;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    color: var(--light-slate);
    font-size: var(--fz-lg);
    @media (max-width: 768px) {
      padding: 20px 0;
      background-color: transparent;
      box-shadow: none;
      &:hover {
        box-shadow: none;
      }
    }
    a {

    }
  }
  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    margin: 25px 0 10px;
    padding: 0;
    list-style: none;
    li {
      margin: 0 20px 5px 0;
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      white-space: nowrap;
    }
    @media (max-width: 768px) {
      margin: 10px 0;
      li {
        margin: 0 10px 5px 0;
        color: var(--lightest-slate);
      }
    }
  }
  .project-links {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 10px;
    margin-left: -10px;
    color: var(--lightest-slate);
    a {

      padding: 10px;
      &.external {
        svg {
          width: 22px;
          height: 22px;
          margin-top: -4px;
        }
      }
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
  .project-image {
    box-shadow: 0 10px 30px -15px var(--navy-shadow);
    transition: var(--transition);
    grid-column: 6 / -1;
    grid-row: 1 / -1;
    position: relative;
    z-index: 1;
    @media (max-width: 768px) {
      grid-column: 1 / -1;
      height: 100%;
      opacity: 0.25;
    }
    a {
      width: 100%;
      background-color: var(--green);
      border-radius: var(--border-radius);
      vertical-align: middle;
      &:hover,
      &:focus {
        background: transparent;
        outline: 0;
        &:before,
        .img {
          background: transparent;
          filter: none;
        }
      }
      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3;
        transition: var(--transition);
        background-color: var(--navy);
        mix-blend-mode: screen;
      }
    }
    .img {
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1) brightness(90%);
      @media (max-width: 768px) {
        object-fit: cover;
        width: 100%;
        height: 100%;
        filter: grayscale(100%) contrast(1) brightness(80%);
      }
    }
  }
`;

const Featured = () => {

    const featuredProjects = Proyectos;

    return (
        <section id="projects">
            <br></br>
            <h2 className="numbered-heading text-white">
                Proyectos personales
            </h2>
            <br></br>
            <StyledProjectsGrid>
                {featuredProjects &&
                    featuredProjects.map(({ node }, i) => {
                        const { frontmatter, html } = node;
                        const { external, title, tech, github, cover } = frontmatter;

                        return (
                            <StyledProject key={i}>
                                <div className="project-content">
                                    <div>
                                        <p className="project-overline">Proyecto destacado (en desarrollo)</p>

                                        <h3 className="project-title">
                                            <a className="text-light-slate" href={external}>{title}</a>
                                        </h3>

                                        <div
                                            className="project-description"
                                            dangerouslySetInnerHTML={{ __html: html }}
                                        />

                                        {tech.length && (
                                            <ul className="project-tech-list">
                                                {tech.map((tech, i) => (
                                                    <li key={i}>{tech}</li>
                                                ))}
                                            </ul>
                                        )}

                                        <div className="project-links">
                                            {github && (
                                                <a href={github} aria-label="GitHub Link" className="text-light-slate">
                                                    <Icon name="github" />
                                                </a>
                                            )}
                                            {external && (
                                                <a href={external} aria-label="External Link" className="external text-light-slate">
                                                    <Icon name="external" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="project-image">
                                    <a href={external ? external : github ? github : '#'}>
                                        <img
                                            className="img"
                                            src={`/images/projects/${cover}`}
                                            alt={title}
                                        />
                                    </a>
                                </div>
                            </StyledProject>
                        );
                    })}
            </StyledProjectsGrid>
        </section>
    );
};

export default Featured;