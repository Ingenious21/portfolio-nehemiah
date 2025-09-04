import { useEffect, useState } from "react";

export const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);
  const [programmingIcons, setProgrammingIcons] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Programming icons with their appropriate colors
  const programmingIconsData = [
    { name: "HTML", symbol: "< />", color: "#E34F26" },
    { name: "CSS", symbol: "{ }", color: "#1572B6" },
    { name: "JS", symbol: "JS", color: "#F7DF1E" },
    { name: "Python", symbol: "Py", color: "#3776AB" },
    { name: "Django", symbol: "Dj", color: "#092E20" },
    { name: "Node", symbol: "N", color: "#339933" },
    { name: "React", symbol: "R", color: "#61DAFB" },
    { name: "Excel", symbol: "XL", color: "#217346" },
    { name: "PS", symbol: "Ps", color: "#31A8FF" },
    { name: "Canva", symbol: "C", color: "#00C4CC" },
    { name: "Git", symbol: "Git", color: "#F05032" },
    { name: "VS", symbol: "<>", color: "#007ACC" },
  ];

  useEffect(() => {
    // Check theme
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
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
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  const generateStars = () => {
    const numberOfStars = Math.floor(
      (window.innerWidth * window.innerHeight) / 10000
    );

    const newStars = [];

    for (let i = 0; i < numberOfStars; i++) {
      newStars.push({
        id: i,
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.5,
        animationDuration: Math.random() * 4 + 2,
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
        size: Math.random() * 20 + 30, // 30-50px
        opacity: Math.random() * 0.3 + 0.1, // Very subtle in light mode
        animationDuration: Math.random() * 20 + 30, // Slow movement
        rotationSpeed: Math.random() * 10 + 5,
        direction: Math.random() > 0.5 ? 1 : -1,
      });
    }

    setProgrammingIcons(newIcons);
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Show stars and meteors only in dark mode */}
      {isDarkMode && (
        <>
          {stars.map((star) => (
            <div
              key={star.id}
              className="star animate-pulse-subtle"
              style={{
                width: star.size + "px",
                height: star.size + "px",
                left: star.x + "%",
                top: star.y + "%",
                opacity: star.opacity,
                animationDuration: star.animationDuration + "s",
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
              }}
            />
          ))}
        </>
      )}

      {/* Show programming icons only in light mode */}
      {!isDarkMode && (
        <>
          {programmingIcons.map((icon) => (
            <div
              key={icon.id}
              className="programming-icon animate-float-programming"
              style={{
                left: icon.x + "%",
                top: icon.y + "%",
                fontSize: icon.size + "px",
                color: icon.color,
                opacity: icon.opacity,
                animationDuration: icon.animationDuration + "s",
                animationDelay: Math.random() * 10 + "s",
                "--rotation-speed": icon.rotationSpeed + "s",
                "--direction": icon.direction,
              }}
            >
              {icon.symbol}
            </div>
          ))}
        </>
      )}
    </div>
  );
};