import { useEffect, useState } from "react";

export const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);
  const [programmingIcons, setProgrammingIcons] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Programming icons with their brand colors
  const programmingIconsData = [
    { name: "HTML", logo: "/logos/html5.svg", fallback: "🌐", color: "#E34F26" },
    { name: "CSS", logo: "/logos/css.svg", fallback: "🎨", color: "#1572B6" },
    { name: "JavaScript", logo: "/logos/javascript.svg", fallback: "⚡", color: "#F7DF1E" },
    { name: "Python", logo: "/logos/python.svg", fallback: "🐍", color: "#3776AB" },
    { name: "Django", logo: "/logos/django.svg", fallback: "🎸", color: "#092E20" },
    { name: "Node.js", logo: "/logos/nodedotjs.svg", fallback: "📗", color: "#339933" },
    { name: "React", logo: "/logos/react.svg", fallback: "⚛️", color: "#61DAFB" },
    { name: "TypeScript", logo: "/logos/typescript.svg", fallback: "📘", color: "#3178C6" },
    { name: "Git", logo: "/logos/git.svg", fallback: "📝", color: "#F05032" },
    { name: "GitHub", logo: "/logos/github.svg", fallback: "🐙", color: "#181717" },
    { name: "Database", logo: "/logos/database.svg", fallback: "🗄️", color: "#336791" },
    { name: "API", logo: "/logos/api.svg", fallback: "🔌", color: "#6B73FF" },
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
    // Adjust number of icons based on screen size
    let numberOfIcons;
    if (window.innerWidth < 640) {
      numberOfIcons = 8; // Fewer icons on mobile
    } else if (window.innerWidth < 1024) {
      numberOfIcons = 10; // Medium number on tablets
    } else {
      numberOfIcons = 12; // Full number on desktop
    }
    
    const newIcons = [];

    for (let i = 0; i < numberOfIcons; i++) {
      const iconData = programmingIconsData[Math.floor(Math.random() * programmingIconsData.length)];
      newIcons.push({
        id: i,
        ...iconData,
        x: Math.random() * 90 + 5,
        y: Math.random() * 90 + 5,
        // Make size responsive based on screen width
        size: Math.min(Math.max(window.innerWidth / 20, 20), 60),
        opacity: Math.random() * 0.3 + 0.4,
        animationDuration: Math.random() * 15 + 25,
        delay: Math.random() * 5,
      });
    }

    setProgrammingIcons(newIcons);
  };

  const handleImageError = (icon, index) => {
    // Update the specific icon to use fallback
    setProgrammingIcons(prev => 
      prev.map((item, idx) => 
        idx === index ? { ...item, useFallback: true } : item
      )
    );
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
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
                // Add a subtle filter to make SVGs more visible
                filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
              }}
            >
              {icon.useFallback ? (
                <span className="select-none" title={icon.name}>
                  {icon.fallback}
                </span>
              ) : (
                <div 
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: icon.color, // Apply brand color
                  }}
                >
                  <img
                    src={icon.logo}
                    alt={icon.name}
                    style={{
                      width: "70%", // Slightly smaller to fit within container
                      height: "70%",
                      objectFit: "contain",
                      // Apply color using CSS filter
                      filter: `invert(8%) sepia(94%) saturate(4590%) hue-rotate(358deg) brightness(103%) contrast(108%)`,
                    }}
                    onError={() => handleImageError(icon, index)}
                  />
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};