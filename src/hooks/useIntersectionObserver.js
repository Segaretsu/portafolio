import { useEffect, useRef, useState } from 'react';

/**
 * Hook reutilizable para detectar cuando un elemento entra en el viewport.
 * Ideal para activar animaciones de entrada (scroll animations).
 *
 * @param {Object} options - IntersectionObserver options
 * @param {number} options.threshold - Porcentaje del elemento visible para activar (0-1)
 * @param {string} options.rootMargin - Margen del viewport
 * @param {boolean} options.triggerOnce - Si true, solo dispara una vez
 * @returns {{ ref: React.RefObject, isVisible: boolean }}
 */
const useIntersectionObserver = ({
    threshold = 0.15,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
} = {}) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (triggerOnce) {
                        observer.unobserve(element);
                    }
                } else if (!triggerOnce) {
                    setIsVisible(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [threshold, rootMargin, triggerOnce]);

    return { ref, isVisible };
};

export default useIntersectionObserver;
