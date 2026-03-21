import React, { createContext, useContext, useEffect, useState } from "react";

const GSAPContext = createContext(null);

export const GSAPProvider = ({ children }) => {
  const [gsapInstance, setGsapInstance] = useState(null);

  useEffect(() => {
    let mounted = true;

    const initGSAP = async () => {
      try {
        // Prevent double loading by attaching to window as persistent cache
        if (window.__GSAP_GLOBAL__) {
          if (mounted) setGsapInstance(window.__GSAP_GLOBAL__);
          return;
        }

        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        const { SplitText } = await import("gsap/all");

        gsap.registerPlugin(ScrollTrigger, SplitText);

        const instance = { gsap, ScrollTrigger, SplitText };
        window.__GSAP_GLOBAL__ = instance;

        if (mounted) {
          setGsapInstance(instance);
        }
      } catch (error) {
        console.warn("GSAP Context Provider failed to load plugins:", error);
      }
    };

    initGSAP();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <GSAPContext.Provider value={gsapInstance}>
      {children}
    </GSAPContext.Provider>
  );
};

export const useGSAPContext = () => useContext(GSAPContext);
