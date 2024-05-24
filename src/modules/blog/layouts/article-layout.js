import styled from "styled-components";

const StyleContainer = styled.section`

    .portada {
        h1 {
            margin-bottom: 1.5rem;
        }

        img {

        }
    }

    h2 {
        margin-top: 2rem;
    }
    
    h3 {
        margin-top: 1.25rem;
    }

    p {
        margin-top: 1rem;
    }

    .img__container {
        text-align: center;
        margin-bottom: 1rem;

        img {
            width: 100%;
            padding-top: 2rem;
            padding-left: 2rem;
            padding-right: 2rem;
        }

        span {
            font-size: var(--small-font-size);
        }
    }

    ol, ul {
        margin-top: 1rem;
        padding-left: 1.5rem;
        padding-righy: 1.5rem;
    }

    ul {
        li {
            margin-top: 1rem;
        }
    }

    .container__comentario {
        border-left: .25rem solid var(--first-color);
        padding-left: .5rem;
    }
`

const ArticleLayout = ({ children }) => {
    return (<StyleContainer className="section">
        <div className="container grid">
            {children}
            <br />
            <br />
            <hr />
        </div>
    </StyleContainer>)
}

export default ArticleLayout;