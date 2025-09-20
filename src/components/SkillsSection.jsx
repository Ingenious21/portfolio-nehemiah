import { useState } from "react";
import { cn } from "@/lib/utils";

const skills = [
  // Frontend
  { name: "HTML/CSS", level: 95, category: "frontend", description: "Semantic markup and responsive styling" },
  { name: "JavaScript", level: 90, category: "frontend", description: "Modern ES6+ and DOM manipulation" },
  { name: "React", level: 90, category: "frontend", description: "Component-based UI development" },
  { name: "Bootstrap", level: 85, category: "frontend", description: "Rapid responsive design framework" },
  { name: "Tailwind CSS", level: 90, category: "frontend", description: "Utility-first CSS framework" },
  { name: "Vite", level: 70, category: "frontend", description: "Fast build tool and development server" },
  { name: "ShadCN UI", level: 70, category: "frontend", description: "Modern React component library" },

  // Backend
  { name: "Node.js", level: 80, category: "backend", description: "Server-side JavaScript runtime" },
  { name: "Express", level: 75, category: "backend", description: "Web application framework for Node.js" },
  { name: "MongoDB", level: 60, category: "backend", description: "NoSQL document database" },
  { name: "Django", level: 90, category: "backend", description: "Python web framework" },
  { name: "GraphQL", level: 50, category: "backend", description: "Query language for APIs" },

  // Data Analysis
  { name: "Excel", level: 95, category: "data analysis", description: "Advanced formulas and data visualization" },
  { name: "Python", level: 75, category: "data analysis", description: "Data processing and analysis" },
  { name: "Power BI", level: 90, category: "data analysis", description: "Business intelligence and reporting" },
  { name: "Tableau", level: 80, category: "data analysis", description: "Data visualization platform" },

  // Tools
  { name: "Git/GitHub", level: 90, category: "tools", description: "Version control and collaboration" },
  { name: "Docker", level: 60, category: "tools", description: "Containerization platform" },
  { name: "Figma", level: 85, category: "tools", description: "UI/UX design and prototyping" },
  { name: "VS Code", level: 95, category: "tools", description: "Integrated development environment" },
];

const categories = [
  { id: "all", name: "All Skills", description: "View all my technical skills" },
  { id: "frontend", name: "Frontend", description: "Client-side development skills" },
  { id: "backend", name: "Backend", description: "Server-side development skills" },
  { id: "data analysis", name: "Data Analysis", description: "Data processing and visualization skills" },
  { id: "tools", name: "Tools", description: "Development tools and platforms" }
];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  const getSkillLevelLabel = (level) => {
    if (level >= 90) return "Expert";
    if (level >= 80) return "Advanced";
    if (level >= 70) return "Proficient";
    if (level >= 60) return "Intermediate";
    return "Beginner";
  };

  const getSkillLevelColor = (level) => {
    if (level >= 90) return "text-green-600 dark:text-green-400";
    if (level >= 80) return "text-blue-600 dark:text-blue-400";
    if (level >= 70) return "text-purple-600 dark:text-purple-400";
    if (level >= 60) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };
  
  return (
    <section id="skills" className="py-24 px-4 relative sectionGlass">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          My <span className="text-primary bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Skills</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          A comprehensive overview of my technical expertise across different domains of software development and data analysis.
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12" role="tablist" aria-label="Skill categories">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              role="tab"
              aria-selected={activeCategory === category.id}
              aria-controls={`skills-panel-${category.id}`}
              className={cn(
                "px-6 py-3 rounded-full transition-all duration-300 capitalize font-medium",
                "backdrop-filter backdrop-blur-md border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
                activeCategory === category.id
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-400 shadow-lg transform scale-105"
                  : "bg-white/20 text-foreground hover:bg-white/30 border-white/30 hover:border-white/40 hover:scale-105"
              )}
              aria-describedby={`category-desc-${category.id}`}
            >
              {category.name}
              <span id={`category-desc-${category.id}`} className="sr-only">
                {category.description}
              </span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="tabpanel"
          aria-labelledby="skills-heading"
          id={`skills-panel-${activeCategory}`}
        >
          {filteredSkills.map((skill, index) => (
            <div
              key={`${skill.name}-${index}`}
              className="gradientBorder p-6 cardHover group"
              role="article"
              aria-labelledby={`skill-title-${index}`}
              aria-describedby={`skill-desc-${index} skill-level-${index}`}
            >
              <div className="text-left mb-4">
                <h3 
                  id={`skill-title-${index}`}
                  className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-300"
                >
                  {skill.name}
                </h3>
                <p 
                  id={`skill-desc-${index}`}
                  className="text-sm text-muted-foreground mt-1"
                >
                  {skill.description}
                </p>
              </div>
              
              <div className="w-full glassProgress h-3 mb-3" role="progressbar" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100} aria-label={`${skill.name} proficiency`}>
                <div
                  className="glassProgressFill h-full animate-[grow_1.5s_ease-out]"
                  style={{ width: skill.level + "%" }}
                />
              </div>

              <div className="flex justify-between items-center text-sm">
                <div className="flex flex-col">
                  <span className="text-muted-foreground font-medium">Proficiency Level</span>
                  <span 
                    id={`skill-level-${index}`}
                    className={cn("font-semibold", getSkillLevelColor(skill.level))}
                  >
                    {getSkillLevelLabel(skill.level)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-muted-foreground font-medium block">Score</span>
                  <span className="text-foreground font-bold text-lg">
                    {skill.level}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Skills Summary */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Showing {filteredSkills.length} skill{filteredSkills.length !== 1 ? 's' : ''} 
            {activeCategory !== "all" && (
              <span> in <span className="text-primary font-medium capitalize">{activeCategory}</span></span>
            )}
          </p>
        </div>

        {/* Accessibility Note */}
        <div className="sr-only">
          <h3>Skill Level Guide</h3>
          <ul>
            <li>Expert (90-100%): Deep expertise and ability to mentor others</li>
            <li>Advanced (80-89%): Strong proficiency with complex implementations</li>
            <li>Proficient (70-79%): Solid understanding with practical experience</li>
            <li>Intermediate (60-69%): Basic to moderate experience</li>
            <li>Beginner (0-59%): Learning and developing skills</li>
          </ul>
        </div>
      </div>
    </section>
  );
};