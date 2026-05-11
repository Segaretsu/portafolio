import styled, { keyframes, css } from 'styled-components';
import Link from 'next/link';
import useIntersectionObserver from '@hooks/useIntersectionObserver';

/*=============================================
  KEYFRAMES
===============================================*/
const slideInLeft = keyframes`
  from { opacity: 0; transform: translateX(-40px); }
  to   { opacity: 1; transform: translateX(0); }
`;

const slideInRight = keyframes`
  from { opacity: 0; transform: translateX(40px); }
  to   { opacity: 1; transform: translateX(0); }
`;

const floatUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

/*=============================================
  STYLED COMPONENTS
===============================================*/
const Section = styled.section`
  padding: 4rem 0;
  background-color: var(--body-color);
`;

const Inner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const SectionLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  opacity: 0;
  ${({ $visible }) => $visible && css`
    animation: ${floatUp} 0.6s ease forwards;
    animation-delay: 0.05s;
  `}
`;

const LabelLine = styled.div`
  width: 36px;
  height: 3px;
  background: var(--first-color);
  border-radius: 2px;
`;

const LabelText = styled.span`
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--first-color);
`;

const Card = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  border-radius: 1.25rem;
  overflow: hidden;
  background: var(--container-color);
  box-shadow: 0 8px 40px rgba(0,0,0,0.1);
  border: 1px solid hsla(var(--hue-color), 69%, 61%, 0.12);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 16px 60px rgba(0,0,0,0.16);
  }

  @media (min-width: 768px) {
    grid-template-columns: 1.1fr 1fr;
    min-height: 420px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  max-height: 280px;
  opacity: 0;
  ${({ $visible }) => $visible && css`
    animation: ${slideInLeft} 0.7s ease forwards;
    animation-delay: 0.15s;
  `}

  @media (min-width: 768px) {
    max-height: none;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.6s ease;
  }

  &:hover img {
    transform: scale(1.04);
  }

  /* Overlay gradient */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to right,
      transparent 60%,
      var(--container-color) 100%
    );
    pointer-events: none;
    display: none;

    @media (min-width: 768px) {
      display: block;
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 2.5rem;
  opacity: 0;
  ${({ $visible }) => $visible && css`
    animation: ${slideInRight} 0.7s ease forwards;
    animation-delay: 0.25s;
  `}

  @media (max-width: 767px) {
    padding: 1.5rem;
  }
`;

const TagRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const FeaturedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.75rem;
  border-radius: 200px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #fff;
  background: linear-gradient(
    135deg,
    var(--first-color) 0%,
    hsl(calc(var(--hue-color) + 30), 70%, 55%) 100%
  );
`;

const ThemeBadge = styled.span`
  padding: 0.3rem 0.75rem;
  border-radius: 200px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--first-color);
  background: hsla(var(--hue-color), 69%, 61%, 0.12);
  border: 1px solid hsla(var(--hue-color), 69%, 61%, 0.2);
`;

const DateText = styled.span`
  font-size: 0.8rem;
  color: var(--text-color-light);
  margin-left: auto;
`;

const Title = styled.h2`
  font-size: clamp(1.4rem, 2.5vw, 2rem);
  font-weight: 700;
  line-height: 1.3;
  color: var(--title-color);
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
`;

const Description = styled.p`
  font-size: 0.95rem;
  color: var(--text-color);
  line-height: 1.75;
  margin-bottom: 1.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ReadLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(
    135deg,
    var(--first-color) 0%,
    hsl(calc(var(--hue-color) + 30), 70%, 55%) 100%
  );
  background-size: 200% auto;
  text-decoration: none;
  transition: all 0.25s ease;
  align-self: flex-start;
  box-shadow: 0 4px 15px hsla(var(--hue-color), 69%, 61%, 0.3);

  svg {
    transition: transform 0.2s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px hsla(var(--hue-color), 69%, 61%, 0.4);
    background-position: right center;

    svg {
      transform: translateX(4px);
    }
  }
`;

const ReadingTime = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8rem;
  color: var(--text-color-light);
  margin-bottom: 0.85rem;

  svg {
    color: var(--first-color);
  }
`;

/*=============================================
  COMPONENT
===============================================*/
const FeaturedArticle = ({ article }) => {
    const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

    if (!article) return null;
    const { title, sortDescription, mainImage, mainTheme, createdAt, path, readingTime } = article;

    return (
        <Section ref={ref}>
            <Inner>
                <SectionLabel $visible={isVisible}>
                    <LabelLine />
                    <LabelText>📌 Artículo destacado</LabelText>
                </SectionLabel>

                <Card>
                    <ImageWrapper $visible={isVisible}>
                        <img src={mainImage} alt={title} loading="lazy" />
                    </ImageWrapper>

                    <Content $visible={isVisible}>
                        <TagRow>
                            <FeaturedBadge>
                                ⭐ Destacado
                            </FeaturedBadge>
                            <ThemeBadge>{mainTheme}</ThemeBadge>
                            <DateText>{createdAt}</DateText>
                        </TagRow>

                        {readingTime && (
                            <ReadingTime>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                                </svg>
                                {readingTime} min de lectura
                            </ReadingTime>
                        )}

                        <Title>{title}</Title>
                        <Description>{sortDescription}</Description>

                        <Link href={path} passHref legacyBehavior>
                            <ReadLink>
                                Leer artículo
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                                </svg>
                            </ReadLink>
                        </Link>
                    </Content>
                </Card>
            </Inner>
        </Section>
    );
};

export default FeaturedArticle;
