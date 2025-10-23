import { Moon, Sun } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

    // Debounce function for performance
    const debounce = useCallback((func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }, []);

    useEffect(() => {
        // Check system preference first, then localStorage
        const storedTheme = localStorage.getItem("theme");
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        
        if (storedTheme === "dark" || (!storedTheme && systemPrefersDark)) {
            setIsDarkMode(true);
            document.documentElement.classList.add("dark");
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove("dark");
        }

        // Listen for system theme changes with debounce
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleSystemThemeChange = debounce((e) => {
            // Only apply system preference if user hasn't manually set a theme
            if (!localStorage.getItem("theme")) {
                setIsDarkMode(e.matches);
                if (e.matches) {
                    document.documentElement.classList.add("dark");
                } else {
                    document.documentElement.classList.remove("dark");
                }
            }
        }, 100);

        mediaQuery.addEventListener("change", handleSystemThemeChange);
        
        return () => {
            mediaQuery.removeEventListener("change", handleSystemThemeChange);
        };
    }, [debounce]);

    // Listen for mobile menu state (assuming it's tracked globally)
    useEffect(() => {
        const checkMenuState = () => {
            // Check if mobile menu is open by looking for the mobile menu element
            const mobileMenu = document.getElementById('mobile-menu');
            const isOpen = mobileMenu && mobileMenu.classList.contains('opacity-100');
            setIsNavMenuOpen(isOpen);
        };

        // Use MutationObserver to watch for menu state changes
        const observer = new MutationObserver(checkMenuState);
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenu) {
            observer.observe(mobileMenu, { 
                attributes: true, 
                attributeFilter: ['class'] 
            });
        }

        return () => observer.disconnect();
    }, []);

    const toggleTheme = useCallback(() => {
        if (isTransitioning) return;
        
        setIsTransitioning(true);
        
        // Add smooth transition with requestAnimationFrame for better performance
        requestAnimationFrame(() => {
            if (isDarkMode) {
                document.documentElement.classList.remove("dark");
                localStorage.setItem("theme", "light");
                setIsDarkMode(false);
            } else {
                document.documentElement.classList.add("dark");
                localStorage.setItem("theme", "dark");
                setIsDarkMode(true);
            }
            
            // Reset transitioning state after animation completes
            setTimeout(() => setIsTransitioning(false), 300);
        });
    }, [isDarkMode, isTransitioning]);

    return (
        <button 
            onClick={toggleTheme} 
            disabled={isTransitioning}
            className={cn(
                "fixed z-[200] p-2 sm:p-3 rounded-full",
                "transition-all duration-300 transform hover:scale-110 active:scale-95",
                "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
                "backdrop-blur-md border border-white/20",
                // Better positioning logic - move left when mobile menu is open, stay in same vertical position
                isNavMenuOpen 
                    ? "top-3 right-[4.5rem] sm:top-5 sm:right-5" 
                    : "top-3 right-3 sm:top-5 sm:right-5",
                isDarkMode 
                    ? "bg-gray-800/80 hover:bg-gray-700/80 text-yellow-300 shadow-lg" 
                    : "bg-white/80 hover:bg-white/90 text-blue-900 shadow-lg",
                isTransitioning && "pointer-events-none opacity-75"
            )}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={isDarkMode}
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