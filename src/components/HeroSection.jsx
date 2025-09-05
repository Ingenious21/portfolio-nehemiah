import { ArrowDown } from "lucide-react";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="opacity-0 animateFadeIn text-foreground">Hi, I'm</span>
            <span className="opacity-0 animateFadeInDelay1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent ml-2">
              Nehemiah
            </span>
            <span className="opacity-0 animateFadeInDelay2 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent ml-2">
              Kemayah
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto opacity-0 animateFadeInDelay3 leading-relaxed">
            I'm a versatile Software Engineer with strong expertise in Web Development, 
            Data Analysis, Graphic Design, IT Consulting, and Academic/Technical Writing. 
            I thrive on solving real-world problems through clean code, smart data, compelling visuals, 
            and clear communication. With a passion for impact-driven innovation, I build efficient digital 
            solutions and provide strategic support that helps individuals and organizations grow.
          </p>

          <div className="pt-4 opacity-0 animateFadeInDelay4">
            <a href="#projects" className="cosmicButton group">
              <span>View My Work</span>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mb-2 font-medium">Scroll</span>
        <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
          <ArrowDown className="h-5 w-5 text-primary" />
        </div>
      </div>
    </section>
  );
};