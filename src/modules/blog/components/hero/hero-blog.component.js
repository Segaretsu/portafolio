import styled, { keyframes, css } from 'styled-components';
import Link from 'next/link';
import useIntersectionObserver from '@hooks/useIntersectionObserver';

/*=============================================
  KEYFRAMES
===============================================*/
const gradientShift = keyframes`
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 hsla(var(--hue-color), 69%, 61%, 0.4); }
  50%       { box-shadow: 0 0 0 10px hsla(var(--hue-color), 69%, 61%, 0); }
`;

const floatUp = keyframes`
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
`;

const tagFloat = keyframes`
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-4px); }
`;

/*=============================================
  ANIMATION HELPERS
===============================================*/
const fadeInUp = (delay = '0s') => css`
  opacity: 0;
  animation: ${floatUp} 0.7s ease forwards;
  animation-delay: ${delay};
`;

/*=============================================
  STYLED COMPONENTS
===============================================*/
const HeroSection = styled.section`
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 6rem 0 4rem;
  background-color: var(--body-color);

  /* Mesh gradient background animado */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      hsla(var(--hue-color), 69%, 61%, 0.12) 0%,
      hsla(var(--hue-color), 80%, 70%, 0.06) 30%,
      hsla(var(--hue-color), 30%, 95%, 0.04) 60%,
      hsla(calc(var(--hue-color) + 30), 69%, 61%, 0.08) 100%
    );
    background-size: 300% 300%;
    animation: ${gradientShift} 12s ease infinite;
    pointer-events: none;
  }

  /* Orbes decorativos */
  &::after {
    content: '';
    position: absolute;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      hsla(var(--hue-color), 69%, 61%, 0.08) 0%,
      transparent 70%
    );
    top: -200px;
    right: -200px;
    pointer-events: none;
  }
`;

const HeroOrb = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    hsla(calc(var(--hue-color) + 40), 80%, 65%, 0.07) 0%,
    transparent 70%
  );
  bottom: -100px;
  left: -100px;
  pointer-events: none;
`;

const HeroInner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1.5rem;
  text-align: center;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 1rem;
  border-radius: 200px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--first-color);
  background: hsla(var(--hue-color), 69%, 61%, 0.12);
  border: 1px solid hsla(var(--hue-color), 69%, 61%, 0.25);
  backdrop-filter: blur(8px);
  animation: ${pulse} 2.5s ease infinite;
  margin-bottom: 1.5rem;
  ${({ $visible }) => $visible && fadeInUp('0.1s')}

  .badge__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--first-color);
    animation: ${blink} 1.5s ease infinite;
  }
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.4rem, 5.5vw, 4.2rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--title-color);
  margin-bottom: 1.5rem;
  ${({ $visible }) => $visible && fadeInUp('0.2s')}

  .gradient-text {
    background: linear-gradient(
      90deg,
      var(--first-color) 0%,
      hsl(calc(var(--hue-color) + 40), 80%, 65%) 50%,
      var(--first-color) 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${shimmer} 4s linear infinite;
  }
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: var(--text-color);
  line-height: 1.7;
  max-width: 620px;
  margin: 0 auto 2.5rem;
  ${({ $visible }) => $visible && fadeInUp('0.35s')}
`;

const CTAGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 3.5rem;
  ${({ $visible }) => $visible && fadeInUp('0.5s')}
`;

const PrimaryButton = styled.a`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(
    135deg,
    var(--first-color) 0%,
    hsl(calc(var(--hue-color) + 30), 70%, 55%) 100%
  );
  border: none;
  cursor: pointer;
  text-decoration: none;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 20px hsla(var(--hue-color), 69%, 61%, 0.35);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255,255,255,0.25) 50%,
      transparent 100%
    );
    background-size: 200% auto;
    opacity: 0;
    transition: opacity 0.3s;
    animation: ${shimmer} 2s linear infinite;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px hsla(var(--hue-color), 69%, 61%, 0.45);
    &::after { opacity: 1; }
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  color: var(--first-color);
  background: transparent;
  border: 2px solid hsla(var(--hue-color), 69%, 61%, 0.4);
  cursor: pointer;
  text-decoration: none;
  transition: all 0.25s ease;
  backdrop-filter: blur(4px);

  &:hover {
    background: hsla(var(--hue-color), 69%, 61%, 0.1);
    border-color: var(--first-color);
    transform: translateY(-2px);
  }
`;

const StatsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  ${({ $visible }) => $visible && fadeInUp('0.65s')}
`;

const StatTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.9rem;
  border-radius: 200px;
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--text-color);
  background: var(--container-color);
  border: 1px solid var(--first-color-lighter);
  box-shadow: var(--shadow-sm);
  animation: ${tagFloat} ${({ delay }) => delay || '3s'} ease infinite;
  animation-delay: ${({ delay }) => delay ? `calc(${delay} * 0.2)` : '0s'};
  cursor: default;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-3px) scale(1.05);
    color: var(--first-color);
  }

  span.emoji {
    font-size: 1rem;
  }
`;

const Divider = styled.div`
  width: 40px;
  height: 2px;
  background: hsla(var(--hue-color), 69%, 61%, 0.3);
  border-radius: 2px;
`;

/*=============================================
  COMPONENT
===============================================*/
const HeroBlog = () => {
    const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

    return (
        <HeroSection ref={ref}>
            <HeroOrb />
            <HeroInner>
                <Badge $visible={isVisible}>
                    <span className="badge__dot" />
                    Blog de Desarrollo de Software
                </Badge>

                <HeroTitle $visible={isVisible}>
                    Explora, aprende y{' '}
                    <span className="gradient-text">crece como dev</span>
                </HeroTitle>

                <HeroSubtitle $visible={isVisible}>
                    Artículos, conceptos y buenas prácticas para estudiantes, ingenieros
                    y arquitectos de software. Sin importar en qué punto de tu carrera estés,
                    aquí hay algo para ti.
                </HeroSubtitle>

                <CTAGroup $visible={isVisible}>
                    <Link href="/blog/articles" passHref legacyBehavior>
                        <PrimaryButton>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                            </svg>
                            Explorar artículos
                        </PrimaryButton>
                    </Link>
                    <Link href="/blog/coming-soon" passHref legacyBehavior>
                        <SecondaryButton>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                            </svg>
                            Ver cursos
                        </SecondaryButton>
                    </Link>
                </CTAGroup>

                <StatsRow $visible={isVisible}>
                    <StatTag delay="3s">
                        <span className="emoji">📄</span> Artículos técnicos
                    </StatTag>
                    <Divider />
                    <StatTag delay="3.5s">
                        <span className="emoji">💡</span> Principios & patrones
                    </StatTag>
                    <Divider />
                    <StatTag delay="4s">
                        <span className="emoji">🎬</span> Videos en YouTube
                    </StatTag>
                    <Divider />
                    <StatTag delay="4.5s">
                        <span className="emoji">🚀</span> Para todos los niveles
                    </StatTag>
                </StatsRow>
            </HeroInner>
        </HeroSection>
    );
};

export default HeroBlog;
