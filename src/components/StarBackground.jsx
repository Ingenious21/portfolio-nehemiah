import { useEffect, useState } from "react";

export const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);
  const [programmingIcons, setProgrammingIcons] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Fallback to emoji/text icons if SVGs don't exist
  const programmingIconsData = [
    { name: "HTML", logo: "/logos/html5.svg", fallback: "🌐" },
    { name: "CSS", logo: "/logos/css.svg", fallback: "🎨" },
    { name: "JavaScript", logo: "/logos/javascript.svg", fallback: "⚡" },
    { name: "Python", logo: "/logos/python.svg", fallback: "🐍" },
    { name: "Django", logo: "/logos/django.svg", fallback: "🎸" },
    { name: "Node.js", logo: "/logos/nodedotjs.svg", fallback: "📗" },
    { name: "React", logo: "/logos/react.svg", fallback: "⚛️" },
    { name: "TypeScript", logo: "/logos/typescript.svg", fallback: "📘" },
    { name: "Git", logo: "/logos/git.svg", fallback: "📝" },
    { name: "GitHub", logo: "/logos/github.svg", fallback: "🐙" },
    { name: "Database", logo: "/logos/database.svg", fallback: "🗄️" },
    { name: "API", logo: "/logos/api.svg", fallback: "🔌" },
  ];

  // Simplified dark mode detection that syncs with ThemeToggle
  const computeIsDark = () => {
    // Check localStorage first (same as ThemeToggle)
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") return true;
    if (storedTheme === "light") return false;
    
    // Check document classes
    if (document.documentElement.classList.contains("dark")) return true;
    
    // Fallback to system preference
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  useEffect(() => {
    const checkTheme = () => {
      const darkMode = computeIsDark();
      console.log("Dark mode detected:", darkMode); // Debug log
      setIsDarkMode(darkMode);
    };

    checkTheme();
    generateStars();
    generateMeteors();
    generateProgrammingIcons();

    const handleResize = () => {
      generateStars();
      generateProgrammingIcons();
    };

    // Listen for theme changes
    const handleStorageChange = (e) => {
      if (e.key === "theme") {
        checkTheme();
      }
    };

    const htmlObserver = new MutationObserver(checkTheme);
    htmlObserver.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ["class"] 
    });

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("resize", handleResize);
      htmlObserver.disconnect();
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
    const numberOfIcons = 12;
    const newIcons = [];

    for (let i = 0; i < numberOfIcons; i++) {
      const iconData = programmingIconsData[Math.floor(Math.random() * programmingIconsData.length)];
      newIcons.push({
        id: i,
        ...iconData,
        x: Math.random() * 90 + 5, // Keep icons away from edges
        y: Math.random() * 90 + 5,
        size: Math.random() * 25 + 35, // Slightly smaller for better performance
        opacity: Math.random() * 0.3 + 0.4, // More visible
        animationDuration: Math.random() * 15 + 25, // Faster animation
        delay: Math.random() * 5, // Shorter delay
      });
    }

    console.log("Generated programming icons:", newIcons); // Debug log
    setProgrammingIcons(newIcons);
  };

  const handleImageError = (icon, index) => {
    console.log(`SVG failed to load: ${icon.name}, falling back to emoji`);
    // Update the specific icon to use fallback
    setProgrammingIcons(prev => 
      prev.map((item, idx) => 
        idx === index ? { ...item, useFallback: true } : item
      )
    );
  };

  // Debug logs
  console.log("Component render:", { 
    isDarkMode, 
    iconsCount: programmingIcons.length,
    starsCount: stars.length 
  });

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Debug indicator */}
      <div className="absolute top-20 left-4 z-10 bg-black/50 text-white p-2 rounded text-sm">
        Mode: {isDarkMode ? "Dark" : "Light"} | Icons: {programmingIcons.length}
      </div>

      {/* Dark Mode - Stars and Meteors */}
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
              className="meteor"
              style={{
                width: meteor.size * 50 + "px",
                height: meteor.size * 2 + "px",
                left: meteor.x + "%",
                top: meteor.y + "%",
                animation: `meteor ${meteor.animationDuration}s linear infinite`,
                animationDelay: meteor.delay + "s",
                zIndex: 2,
              }}
            />
          ))}
        </>
      )}

      {/* Light Mode - Programming Icons */}
      {!isDarkMode && (
        <>
          {programmingIcons.map((icon, index) => (
            <div
              key={icon.id}
              className="programming-icon animate-float-programming"
              style={{
                left: icon.x + "%",
                top: icon.y + "%",
                width: icon.size + "px",
                height: icon.size + "px",
                opacity: icon.opacity,
                animationDuration: icon.animationDuration + "s",
                animationDelay: icon.delay + "s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: icon.useFallback ? (icon.size * 0.6) + "px" : "inherit",
                zIndex: 1,
              }}
            >
              {icon.useFallback ? (
                <span className="select-none" title={icon.name}>
                  {icon.fallback}
                </span>
              ) : (
                <img
                  src={icon.logo}
                  alt={icon.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  onError={() => handleImageError(icon, index)}
                  onLoad={() => console.log(`SVG loaded: ${icon.name}`)}
                />
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};