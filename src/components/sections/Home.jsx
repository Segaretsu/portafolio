import React from 'react'
import StyledComponents from 'styled-components'
import ScrollButton from '@components/commons/button-scroll'
import Button from '@components/commons/button'

const StyledHomeContainer = StyledComponents.div`
    gap: 1rem;

    .home__content {
        grid-template-columns: .5fr 3fr;
        padding-top: 3.5rem;
        align-items: center;
    }

    .home__social {
        display: grid;
        grid-template-columns: max-content;
        row-gap: 1rem;
    }

    .home__social-icon {
        font-size: 1.25rem;
        color: var(--first-color);

        &:hover {
            color: var(--first-color-alt);
        }
    }

    .home__blob {
        width: 200px;
        fill: var(--first-color);
    }

    .home__blob-img {
        width: 170px;
    }

    .home__data {
        grid-column: 1/3;

        .home__title {
            font-size: var(--big-font-size);
        }

        .home__subtitle {
            font-size: var(--h3-font-size);
            color: var(--text-color);
            font-weight: var(--font-medium);
            margin-bottom: var(--mb-0-75);
        }

        .home__description {
            margin-bottom: var(--mb-2);
        }
    }
`

const Home = () => {
    return (
        <section className="home section" id="home">
            <StyledHomeContainer className="home__container container grid">
                <div className="home__content grid">
                    <div className="home__social">
                        <a className="home__social-icon" href="https://www.linkedin.com/in/jhonsabastianas/"
                            rel="noopener noreferrer" target="_blank">
                            <i className="uil uil-linkedin-alt"></i>
                        </a>

                        <a className="home__social-icon" href="https://jhonsebastianas.medium.com/"
                            rel="noopener noreferrer" target="_blank">
                            <i className="uil uil-medium-m"></i>
                        </a>

                        <a className="home__social-icon" href="https://github.com/segaretsu/"
                            rel="noopener noreferrer" target="_blank">
                            <i className="uil uil-github-alt"></i>
                        </a>
                    </div>

                    <div className="home__img">
                        <svg className="home__blob" viewBox="0 0 200 187" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <mask id="mask0" mask-type="alpha">
                                <path d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 165.547 
                                    130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 129.362C2.45775 
                                    97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 -0.149132 97.9666 
                                    0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z"
                                />
                            </mask>
                            <g mask="url(#mask0)">
                                <path d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 
                                    165.547 130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 
                                    129.362C2.45775 97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 
                                    -0.149132 97.9666 0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z"
                                />
                                <image className="home__blob-img" x='12' y='18' xlinkHref="/images/perfil.png" />
                                {/* <image className="home__blob-img" xlinkHref="/images/FotoPersonal.jpg" /> */}
                            </g>
                        </svg>
                    </div>

                    <div className="home__data">
                        <h1 className="home__title">Hi, I'am Sebastian</h1>
                        <h3 className="home__subtitle">Analyst developer</h3>
                        <p className="home__description">
                            Backend and frontend software developer, and development knowledge in IoT,
                            producing quality work.
                        </p>
                        <Button href="#contact">
                            Contact Me <i className="uil uil-message button__icon"></i>
                        </Button>
                    </div>

                    
                </div>
                <ScrollButton />
            </StyledHomeContainer>
        </section>
    )
}

export default Home