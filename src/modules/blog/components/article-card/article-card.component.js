import styled, { keyframes, css } from 'styled-components';
import Link from 'next/link';
import PropTypes from 'prop-types';

/*=============================================
  KEYFRAMES
===============================================*/
const floatUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/*=============================================
  THEME MAP — color por categoría
===============================================*/
const themeColorMap = {
    'JavaScript': { bg: 'rgba(247, 223, 30, 0.15)', color: '#b7a000', border: 'rgba(247, 223, 30, 0.35)' },
    'Principios': { bg: 'hsla(var(--hue-color), 69%, 61%, 0.12)', color: 'var(--first-color)', border: 'hsla(var(--hue-color), 69%, 61%, 0.25)' },
    'TypeScript':  { bg: 'rgba(49, 120, 198, 0.12)', color: '#3178c6', border: 'rgba(49, 120, 198, 0.3)' },
    'CSS':         { bg: 'rgba(38, 77, 228, 0.12)', color: '#264de4', border: 'rgba(38, 77, 228, 0.25)' },
    'React':       { bg: 'rgba(97, 218, 251, 0.12)', color: '#0fa4c5', border: 'rgba(97, 218, 251, 0.3)' },
    'Node.js':     { bg: 'rgba(104, 160, 99, 0.12)', color: '#3d8c3a', border: 'rgba(104, 160, 99, 0.25)' },
};

const getThemeColor = (theme) => themeColorMap[theme] || {
    bg: 'hsla(var(--hue-color), 69%, 61%, 0.1)',
    color: 'var(--first-color)',
    border: 'hsla(var(--hue-color), 69%, 61%, 0.2)',
};

/*=============================================
  STYLED COMPONENTS
===============================================*/
const Card = styled.article`
  background: var(--container-color);
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid var(--first-color-lighter);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  display: flex;
  flex-direction: column;
  opacity: 0;
  ${({ $visible }) => $visible && css`
    animation: ${floatUp} 0.6s ease forwards;
    animation-delay: ${({ $delay }) => $delay || '0s'};
  `}

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 50px rgba(0,0,0,0.12);
    border-color: hsla(var(--hue-color), 69%, 61%, 0.35);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  height: 200px;
  background: var(--input-color);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease;
  }

  ${Card}:hover & img {
    transform: scale(1.06);
  }
`;

const CardContent = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
`;

const ThemeBadge = styled.span`
  padding: 0.22rem 0.65rem;
  border-radius: 200px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  background: ${({ $colors }) => $colors.bg};
  color: ${({ $colors }) => $colors.color};
  border: 1px solid ${({ $colors }) => $colors.border};
`;

const DateText = styled.span`
  font-size: 0.75rem;
  color: var(--text-color-light);
  margin-left: auto;
`;

const ReadingTime = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.72rem;
  color: var(--text-color-light);

  svg {
    flex-shrink: 0;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.4;
  color: var(--title-color);
  margin-bottom: 0.6rem;
  letter-spacing: -0.01em;
  transition: color 0.2s ease;

  ${Card}:hover & {
    color: var(--first-color);
  }
`;

const CardDescription = styled.p`
  font-size: 0.85rem;
  color: var(--text-color);
  line-height: 1.7;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 1.25rem;
`;

const ReadMore = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--first-color);
  text-decoration: none;
  margin-top: auto;
  width: fit-content;
  transition: gap 0.2s ease;

  svg {
    transition: transform 0.2s ease;
  }

  &:hover {
    gap: 0.65rem;
    svg {
      transform: translateX(3px);
    }
  }
`;

/*=============================================
  COMPONENT
===============================================*/
const ArticleCard = ({ article, visible, delay }) => {
    const { createdAt, mainImage, mainTheme, title, sortDescription, path, readingTime } = article;
    const colors = getThemeColor(mainTheme);

    return (
        <Card $visible={visible} $delay={delay}>
            <ImageWrapper>
                <img src={mainImage} alt={title} loading="lazy" />
            </ImageWrapper>

            <CardContent>
                <MetaRow>
                    <ThemeBadge $colors={colors}>{mainTheme}</ThemeBadge>
                    {readingTime && (
                        <ReadingTime>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                            </svg>
                            {readingTime} min
                        </ReadingTime>
                    )}
                    <DateText>{createdAt}</DateText>
                </MetaRow>

                <CardTitle>{title}</CardTitle>
                <CardDescription>{sortDescription}</CardDescription>

                <Link href={path} passHref legacyBehavior>
                    <ReadMore>
                        Leer más
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                        </svg>
                    </ReadMore>
                </Link>
            </CardContent>
        </Card>
    );
};

ArticleCard.propTypes = {
    article: PropTypes.shape({
        title: PropTypes.string,
        sortDescription: PropTypes.string,
        mainImage: PropTypes.string,
        mainTheme: PropTypes.string,
        createdAt: PropTypes.string,
        path: PropTypes.string,
        readingTime: PropTypes.number,
        highlight: PropTypes.bool,
    }),
    visible: PropTypes.bool,
    delay: PropTypes.string,
};

export default ArticleCard;