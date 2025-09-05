import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        // Check system preference first, then localStorage
        const storedTheme = localStorage.getItem("theme");
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        
        if (storedTheme === "dark" || (!storedTheme && systemPrefersDark)) {
            setIsDarkMode(true);
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }

        // Listen for system theme changes
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleSystemThemeChange = (e) => {
            if (!localStorage.getItem("theme")) {
                setIsDarkMode(e.matches);
                if (e.matches) {
                    document.documentElement.classList.add("dark");
                } else {
                    document.documentElement.classList.remove("dark");
                }
            }
        };

        mediaQuery.addEventListener("change", handleSystemThemeChange);
        return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
    }, []);

    const toggleTheme = () => {
        setIsTransitioning(true);
        
        // Add a smooth transition effect
        setTimeout(() => {
            if (isDarkMode) {
                document.documentElement.classList.remove("dark");
                localStorage.setItem("theme", "light");
                setIsDarkMode(false);
            } else {
                document.documentElement.classList.add("dark");
                localStorage.setItem("theme", "dark");
                setIsDarkMode(true);
            }
            
            setTimeout(() => setIsTransitioning(false), 300);
        }, 50);
    };

    return (
        <button 
            onClick={toggleTheme} 
            disabled={isTransitioning}
            className={cn(
                "fixed top-3 right-3 sm:top-5 sm:right-5 z-50 p-2 sm:p-3 rounded-full",
                "transition-all duration-300 transform hover:scale-110 active:scale-95",
                "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
                "backdrop-blur-md border border-white/20",
                isDarkMode 
                    ? "bg-gray-800/80 hover:bg-gray-700/80 text-yellow-300 shadow-lg" 
                    : "bg-white/80 hover:bg-white/90 text-blue-900 shadow-lg",
                isTransitioning && "pointer-events-none opacity-75"
            )}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        > 
            <div className={cn(
                "transition-transform duration-300",
                isTransitioning && "animate-spin"
            )}>
                {isDarkMode ? (
                    <Sun className="h-5 w-5 sm:h-6 sm:w-6" /> 
                ) : ( 
                    <Moon className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
            </div>
        </button>
    );
};