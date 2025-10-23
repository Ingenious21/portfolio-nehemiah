import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Track scroll position for navbar background effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // iOS Safari compatible scroll lock - prevents background scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      // Save current scroll position before locking
      const scrollY = window.scrollY;
      
      // Lock scroll using position:fixed (works on iOS Safari)
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      // Store scroll position in dataset for later restoration
      document.body.dataset.scrollY = scrollY;
    } else {
      // Restore scroll position when menu closes
      const scrollY = document.body.dataset.scrollY;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      
      // Jump back to original scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY));
      }
    }
    
    // Cleanup on component unmount
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Close menu with Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    // Only add listener when menu is open for better performance
    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

  // Handle navigation clicks - closes menu and scrolls to section
  const handleNavClick = useCallback((href) => {
    setIsMenuOpen(false); // Close menu first
    
    // Small delay for smooth close animation
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        // Check if browser supports smooth scroll, fallback if not
        if ('scrollBehavior' in document.documentElement.style) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          element.scrollIntoView(); // Instant scroll for older browsers
        }
      }
    }, 100);
  }, []);

  // Toggle menu open/closed - useCallback prevents unnecessary re-renders
  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        isScrolled 
          ? "py-3 glassNav shadow-xs" 
          : "py-5 bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo/Brand */}
        
          className="text-xl font-bold text-primary flex items-center"
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#hero');
          }}
        >
          <span className="relative z-10">
            <span className="textGlow text-foreground"> IngeniousTech </span>{" "}
            Portfolio
          </span>
        </a>

        {/* Desktop Navigation - hidden on mobile */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item, key) => (
            
              key={key}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className="text-foreground/80 hover:text-primary transition-colors duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 rounded-md px-2 py-1"
              aria-label={`Navigate to ${item.name} section`}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button - z-[150] keeps it above menu overlay */}
        <button
          onClick={handleMenuToggle}
          className={cn(
            "md:hidden p-3 text-foreground z-[150] rounded-lg transition-colors",
            "hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
            "min-w-[44px] min-h-[44px] flex items-center justify-center", // 44px touch target for mobile
            "active:scale-95 transition-transform" // Visual feedback on tap
          )}
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay - z-[100] puts it above content but below button */}
        <div
          id="mobile-menu"
          className={cn(
            "fixed inset-0 glassNav z-[100] flex flex-col items-center justify-center",
            "transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto backdrop-blur-xl"
              : "opacity-0 pointer-events-none" // Hidden when closed
          )}
          onClick={(e) => {
            // Close menu when clicking backdrop (not menu items)
            if (e.target === e.currentTarget) {
              setIsMenuOpen(false);
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
        >
          <div className="flex flex-col space-y-8 text-xl">
            <h2 id="mobile-menu-title" className="sr-only">Navigation Menu</h2>
            {navItems.map((item, key) => (
              
                key={key}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={cn(
                  "text-foreground/80 hover:text-primary transition-colors duration-300 font-medium text-center",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 rounded-md",
                  "px-4 py-3 min-h-[44px] flex items-center justify-center", // 44px touch target
                  "active:scale-95 transition-transform" // Visual feedback on tap
                )}
                aria-label={`Navigate to ${item.name} section`}
                tabIndex={isMenuOpen ? 0 : -1} // Only focusable when menu is open
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};