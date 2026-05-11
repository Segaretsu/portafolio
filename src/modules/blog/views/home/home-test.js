import styled, { keyframes, css } from 'styled-components';
import Link from 'next/link';
import ArticleCard from '@modules/blog/components/article-card/article-card.component';
import HeroBlog from '@modules/blog/components/hero/hero-blog.component';
import FeaturedArticle from '@modules/blog/components/featured-article/featured-article.component';
import YoutubePreview from '@modules/blog/components/youtube-preview/youtube-preview.component';
import { articles } from '@modules/blog/data/articles';
import useIntersectionObserver from '@hooks/useIntersectionObserver';

/*=============================================
  KEYFRAMES
===============================================*/
const floatUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/*=============================================
  ARTICLES SECTION STYLES
===============================================*/
const ArticlesSection = styled.section`
  padding: 4rem 0 5rem;
  background: var(--input-color);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      var(--body-color) 0%,
      transparent 6%,
      transparent 94%,
      var(--body-color) 100%
    );
    pointer-events: none;
  }
`;

const Inner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 1;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2.5rem;
  opacity: 0;
  ${({ $visible }) => $visible && css`
    animation: ${floatUp} 0.6s ease forwards;
    animation-delay: 0.05s;
  `}
`;

const TitleGroup = styled.div``;

const SectionLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.4rem;
`;

const LabelLine = styled.div`
  width: 28px;
  height: 3px;
  background: var(--first-color);
  border-radius: 2px;
`;

const LabelText = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--first-color);
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.4rem, 2.5vw, 2rem);
  font-weight: 700;
  color: var(--title-color);
  letter-spacing: -0.02em;
`;

const SectionSubtitle = styled.p`
  font-size: 0.9rem;
  color: var(--text-color);
  margin-top: 0.3rem;
`;

const ViewAllLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--first-color);
  text-decoration: none;
  padding: 0.5rem 1.1rem;
  border-radius: 50px;
  border: 2px solid hsla(var(--hue-color), 69%, 61%, 0.3);
  transition: all 0.2s ease;
  white-space: nowrap;

  svg {
    transition: transform 0.2s ease;
  }

  &:hover {
    background: hsla(var(--hue-color), 69%, 61%, 0.1);
    border-color: var(--first-color);
    svg { transform: translateX(3px); }
  }
`;

const CardGrid = styled.div`
  display: grid;
  gap: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: var(--text-color-light);
  font-size: 0.95rem;
`;

/*=============================================
  ARTICLES SECTION COMPONENT
===============================================*/
const ArticlesList = ({ articles: list }) => {
    const { ref, isVisible } = useIntersectionObserver({ threshold: 0.05 });

    return (
        <ArticlesSection ref={ref}>
            <Inner>
                <SectionHeader $visible={isVisible}>
                    <TitleGroup>
                        <SectionLabel>
                            <LabelLine />
                            <LabelText>📝 Últimas entradas</LabelText>
                        </SectionLabel>
                        <SectionTitle>Artículos del blog</SectionTitle>
                        <SectionSubtitle>Conceptos, guías y buenas prácticas para seguir creciendo</SectionSubtitle>
                    </TitleGroup>
                    <Link href="/blog/articles" passHref legacyBehavior>
                        <ViewAllLink>
                            Ver todos
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                            </svg>
                        </ViewAllLink>
                    </Link>
                </SectionHeader>

                {list.length === 0 ? (
                    <EmptyState>No hay artículos por ahora. ¡Vuelve pronto!</EmptyState>
                ) : (
                    <CardGrid>
                        {list.map((article, index) => (
                            <ArticleCard
                                key={article.title + index}
                                article={article}
                                visible={isVisible}
                                delay={`${0.1 + index * 0.12}s`}
                            />
                        ))}
                    </CardGrid>
                )}
            </Inner>
        </ArticlesSection>
    );
};

/*=============================================
  HOME MAIN COMPONENT
===============================================*/
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function HomeTest() {
    const featuredArticle = articles.find(a => a.highlight);
    const regularArticles = articles.filter(a => !a.highlight);

    return (
        <HomeContainer>
            {/* 1. Hero animado */}
            <HeroBlog />

            {/* 2. Artículo destacado (highlight: true) */}
            {featuredArticle && <FeaturedArticle article={featuredArticle} />}

            {/* 3. Grid de artículos regulares */}
            {regularArticles.length > 0 && <ArticlesList articles={regularArticles} />}

            {/* 4. Preview del canal de YouTube */}
            <YoutubePreview />
        </HomeContainer>
    );
}
