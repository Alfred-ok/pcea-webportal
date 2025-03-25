import React, { useEffect, useRef } from "react";

const ParticlesBackground = ({ children }) => {
  const particlesRef = useRef(null);
  const statsRef = useRef(null);
  const countParticlesRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
    script.onload = () => {
      window.particlesJS("particles-js", {
        particles: {
          number: { value: 15, density: { enable: true, value_area: 800 } },
          color: { value: "#242948" },
          shape: {
            type: "polygon",
            stroke: { width: 0, color: "#000" },
            polygon: { nb_sides: 6 },
          },
          opacity: { value: 0.3, random: true },
          size: { value: 160, anim: { enable: true, speed: 10, size_min: 40 } },
          line_linked: { enable: false },
          move: { enable: true, speed: 8, out_mode: "out" },
        },
        interactivity: {
          detect_on: "canvas",
          events: { resize: true },
        },
        retina_detect: true,
      });
      
      const stats = new window.Stats();
      stats.showPanel(0);
      stats.dom.style.position = "absolute";
      stats.dom.style.left = "0px";
      stats.dom.style.top = "0px";
      statsRef.current.appendChild(stats.dom);
      
      const updateStats = () => {
        stats.begin();
        stats.end();
        if (
          window.pJSDom &&
          window.pJSDom[0].pJS.particles &&
          window.pJSDom[0].pJS.particles.array
        ) {
          countParticlesRef.current.innerText =
            window.pJSDom[0].pJS.particles.array.length;
        }
        requestAnimationFrame(updateStats);
      };
      
      requestAnimationFrame(updateStats);
    };
    
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div id="particles-js" ref={particlesRef} style={particlesStyle}></div>
      <div className="count-particles">
        <span className="js-count-particles" ref={countParticlesRef}>--</span>
      </div>
      <div id="stats" ref={statsRef}></div>
      {children}
    </div>
  );
};

const particlesStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(22,89,177,0.925)",
};

export default ParticlesBackground;
