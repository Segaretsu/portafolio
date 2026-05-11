import styled, { keyframes, css } from "styled-components";
import { useState } from "react";
import useIntersectionObserver from "@hooks/useIntersectionObserver";

/*=============================================
  KEYFRAMES
===============================================*/
const floatUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.8); }
  to   { opacity: 1; transform: scale(1); }
`;

const checkDraw = keyframes`
  from { stroke-dashoffset: 50; }
  to   { stroke-dashoffset: 0; }
`;

const gradientShift = keyframes`
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

/*=============================================
  STYLED COMPONENTS
===============================================*/
const Section = styled.section`
  padding: 5rem 0;
  background: linear-gradient(
    135deg,
    hsl(var(--hue-color), 69%, 58%) 0%,
    hsl(calc(var(--hue-color) + 30), 70%, 52%) 100%
  );
  background-size: 200% 200%;
  animation: ${gradientShift} 10s ease infinite;
  position: relative;
  overflow: hidden;

  /* Decorative orbs */
  &::before {
    content: '';
    position: absolute;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: rgba(255,255,255,0.06);
    top: -200px;
    right: -150px;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: rgba(255,255,255,0.04);
    bottom: -100px;
    left: -80px;
    pointer-events: none;
  }
`;

const Inner = styled.div`
  max-width: 640px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 1;
  text-align: center;
`;

const EyebrowLabel = styled.span`
  display: inline-block;
  padding: 0.3rem 0.9rem;
  border-radius: 200px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: hsl(var(--hue-color), 69%, 35%);
  background: rgba(255,255,255,0.9);
  margin-bottom: 1.25rem;
  opacity: 0;
  ${({ $visible }) => $visible && css`
    animation: ${floatUp} 0.5s ease forwards;
    animation-delay: 0.05s;
  `}
`;

const Title = styled.h2`
  font-size: clamp(1.5rem, 3.5vw, 2.2rem);
  font-weight: 700;
  color: #fff;
  line-height: 1.25;
  margin-bottom: 0.85rem;
  letter-spacing: -0.02em;
  opacity: 0;
  ${({ $visible }) => $visible && css`
    animation: ${floatUp} 0.5s ease forwards;
    animation-delay: 0.15s;
  `}
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: rgba(255,255,255,0.85);
  line-height: 1.7;
  margin-bottom: 2rem;
  opacity: 0;
  ${({ $visible }) => $visible && css`
    animation: ${floatUp} 0.5s ease forwards;
    animation-delay: 0.25s;
  `}
`;

const Form = styled.form`
  display: flex;
  gap: 0.65rem;
  max-width: 480px;
  margin: 0 auto;
  opacity: 0;
  ${({ $visible }) => $visible && css`
    animation: ${floatUp} 0.5s ease forwards;
    animation-delay: 0.35s;
  `}

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const InputWrapper = styled.div`
  flex: 1;
  position: relative;

  svg {
    position: absolute;
    left: 0.9rem;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255,255,255,0.6);
    pointer-events: none;
    flex-shrink: 0;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.85rem 1rem 0.85rem 2.6rem;
  border-radius: 50px;
  border: 2px solid rgba(255,255,255,0.3);
  background: rgba(255,255,255,0.15);
  color: #fff;
  font-size: 0.9rem;
  font-family: var(--body-font);
  backdrop-filter: blur(8px);
  outline: none;
  transition: border-color 0.2s ease, background 0.2s ease;

  &::placeholder {
    color: rgba(255,255,255,0.6);
  }

  &:focus {
    border-color: rgba(255,255,255,0.7);
    background: rgba(255,255,255,0.22);
  }
`;

const SubmitButton = styled.button`
  padding: 0.85rem 1.6rem;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 700;
  color: hsl(var(--hue-color), 69%, 40%);
  background: #fff;
  white-space: nowrap;
  transition: all 0.25s ease;
  box-shadow: 0 4px 15px rgba(0,0,0,0.15);
  font-family: var(--body-font);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.p`
  color: rgba(255,220,220,1);
  font-size: 0.82rem;
  margin-top: 0.6rem;
  text-align: center;
`;

const PrivacyNote = styled.p`
  font-size: 0.75rem;
  color: rgba(255,255,255,0.6);
  margin-top: 1rem;
  opacity: 0;
  ${({ $visible }) => $visible && css`
    animation: ${floatUp} 0.5s ease forwards;
    animation-delay: 0.5s;
  `}
`;

/* Success state */
const SuccessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  animation: ${scaleIn} 0.5s ease forwards;
`;

const CheckCircle = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid rgba(255,255,255,0.6);

  svg {
    width: 36px;
    height: 36px;
    stroke: #fff;
    stroke-width: 3;
    stroke-dasharray: 50;
    stroke-dashoffset: 0;
    animation: ${checkDraw} 0.5s ease 0.2s both;
  }
`;

const SuccessTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
`;

const SuccessSubtitle = styled.p`
  font-size: 0.95rem;
  color: rgba(255,255,255,0.85);
  max-width: 420px;
  line-height: 1.6;
`;

/*=============================================
  COMPONENT
===============================================*/
const SuscribeLayout = ({ campaign }) => {
    const [email, setEmail] = useState('');
    const [emailSend, setEmailSend] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setMessage('Ingresa una dirección de correo válida');
            return;
        }
        setMessage('');
        setLoading(true);

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    preferences: { promotions: true, courses: true },
                    campaigns: [campaign],
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setEmailSend(true);
            } else {
                setMessage(data.message || 'Algo salió mal. Inténtalo de nuevo.');
            }
        } catch {
            setMessage('Error de conexión. Inténtalo más tarde.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Section ref={ref}>
            <Inner>
                {!emailSend ? (
                    <>
                        <EyebrowLabel $visible={isVisible}>📬 Newsletter</EyebrowLabel>
                        <Title $visible={isVisible}>
                            Mantente al día con el mundo del desarrollo
                        </Title>
                        <Subtitle $visible={isVisible}>
                            Recibe artículos, tips y recursos cuidadosamente seleccionados
                            para que sigas creciendo como desarrollador.
                        </Subtitle>

                        <Form $visible={isVisible} onSubmit={handleSubmit}>
                            <InputWrapper>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                                </svg>
                                <Input
                                    type="email"
                                    placeholder="tu@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    id="newsletter-email"
                                />
                            </InputWrapper>
                            <SubmitButton type="submit" disabled={loading}>
                                {loading ? 'Enviando...' : 'Suscribirme'}
                            </SubmitButton>
                        </Form>

                        {message && <ErrorMessage>{message}</ErrorMessage>}

                        <PrivacyNote $visible={isVisible}>
                            Sin spam. Solo contenido de calidad. Cancela cuando quieras.
                        </PrivacyNote>
                    </>
                ) : (
                    <SuccessWrapper>
                        <CheckCircle>
                            <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                        </CheckCircle>
                        <SuccessTitle>¡Ya estás suscrito! 🎉</SuccessTitle>
                        <SuccessSubtitle>
                            Te mantendremos actualizado con los mejores recursos para tu carrera
                            como desarrollador de software.
                        </SuccessSubtitle>
                    </SuccessWrapper>
                )}
            </Inner>
        </Section>
    );
};

export default SuscribeLayout;