import { useEffect, useState } from "react";

export const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);
  const [programmingIcons, setProgrammingIcons] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Using SVG logos stored in /public/logos/
  const programmingIconsData = [
    { name: "HTML", logo: "/logos/html5.svg" },
    { name: "CSS", logo: "/logos/css.svg" },
    { name: "JavaScript", logo: "/logos/javascript.svg" },
    { name: "Python", logo: "/logos/python.svg" },
    { name: "Django", logo: "/logos/django.svg" },
    { name: "Node.js", logo: "/logos/nodedotjs.svg" },
    { name: "React", logo: "/logos/react.svg" },
    { name: "TypeScript", logo: "/logos/typescript.svg" },
    { name: "Canva", logo: "/logos/canva.svg" },
    { name: "Git", logo: "/logos/git.svg" },
    { name: "GitHub", logo: "/logos/github.svg" },
  ];

  const computeIsDark = () => {
    const html = document.documentElement;
    const body = document.body;

    const hasExplicitClassMode =
      html.classList.contains("dark") ||
      html.classList.contains("light") ||
      body?.classList.contains("dark") ||
      body?.classList.contains("light");

    const anyDarkClass = !!document.querySelector("html.dark, body.dark, .dark");

    if (hasExplicitClassMode) return anyDarkClass;

    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  useEffect(() => {
    const checkTheme = () => setIsDarkMode(computeIsDark());

    checkTheme();
    generateStars();
    generateMeteors();
    generateProgrammingIcons();

    const handleResize = () => {
      generateStars();
      generateProgrammingIcons();
    };

    const htmlObserver = new MutationObserver(checkTheme);
    const bodyObserver = new MutationObserver(checkTheme);
    htmlObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    if (document.body) bodyObserver.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    const mql = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
    const onMql = () => !document.querySelector(".dark, .light") && checkTheme();
    if (mql?.addEventListener) mql.addEventListener("change", onMql);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      htmlObserver.disconnect();
      bodyObserver.disconnect();
      if (mql?.removeEventListener) mql.removeEventListener("change", onMql);
    };
  }, []);

  const generateStars = () => {
    const numberOfStars = Math.floor((window.innerWidth * window.innerHeight) / 10000);
    const newStars = [];

    for (let i = 0; i < numberOfStars; i++) {
      newStars.push({
        id: i,
        size: Math.random() * 2.5 + 1.5,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.4 + 0.6,
        twinkle: Math.random() * 2 + 2,
        float: Math.random() * 8 + 6,
        delay: Math.random() * 5,
      });
    }

    setStars(newStars);
  };

  const generateMeteors = () => {
    const numberOfMeteors = 4;
    const newMeteors = [];

    for (let i = 0; i < numberOfMeteors; i++) {
      newMeteors.push({
        id: i,
        size: Math.random() * 2 + 1,
        x: Math.random() * 100,
        y: Math.random() * 20,
        delay: Math.random() * 15,
        animationDuration: Math.random() * 3 + 3,
      });
    }

    setMeteors(newMeteors);
  };

  const generateProgrammingIcons = () => {
    const numberOfIcons = 15;
    const newIcons = [];

    for (let i = 0; i < numberOfIcons; i++) {
      const iconData = programmingIconsData[Math.floor(Math.random() * programmingIconsData.length)];
      newIcons.push({
        id: i,
        ...iconData,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 30 + 40,
        opacity: Math.random() * 0.4 + 0.3,
        animationDuration: Math.random() * 20 + 30,
      });
    }

    setProgrammingIcons(newIcons);
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {isDarkMode && (
        <>
          {stars.map((star) => (
            <div
              key={star.id}
              className="star"
              style={{
                width: star.size + "px",
                height: star.size + "px",
                left: star.x + "%",
                top: star.y + "%",
                opacity: star.opacity,
                animation: `pulse-subtle ${star.twinkle}s ease-in-out ${star.delay}s infinite, float ${star.float}s ease-in-out ${star.delay / 2}s infinite`,
                willChange: "transform, opacity",
                zIndex: 1,
              }}
            />
          ))}

          {meteors.map((meteor) => (
            <div
              key={meteor.id}
              className="meteor animate-meteor"
              style={{
                width: meteor.size * 50 + "px",
                height: meteor.size * 2 + "px",
                left: meteor.x + "%",
                top: meteor.y + "%",
                animationDelay: meteor.delay + "s",
                animationDuration: meteor.animationDuration + "s",
                zIndex: 2,
              }}
            />
          ))}
        </>
      )}

      {!isDarkMode && (
        <>
          {programmingIcons.map((icon) => (
            <img
              key={icon.id}
              src={icon.logo}
              alt={icon.name}
              className="programming-icon animate-float-programming"
              style={{
                left: icon.x + "%",
                top: icon.y + "%",
                width: icon.size + "px",
                height: "auto",
                opacity: icon.opacity,
                animationDuration: icon.animationDuration + "s",
                animationDelay: Math.random() * 10 + "s",
              }}
            />
          ))}
        </>
      )}
    </div>
  );
};