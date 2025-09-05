import { useState } from "react";
import { cn } from "@/lib/utils";

const skills = [
  // Frontend
  { name: "HTML/CSS", level: 95, category: "frontend" },
  { name: "JavaScript", level: 90, category: "frontend" },
  { name: "React", level: 90, category: "frontend" },
  { name: "Bootstrap", level: 85, category: "frontend" },
  { name: "Tailwind CSS", level: 90, category: "frontend" },
  { name: "Vite", level: 70, category: "frontend" },
  { name: "ShadCN UI", level: 70, category: "frontend" },

  // Backend
  { name: "Node.js", level: 80, category: "backend" },
  { name: "Express", level: 75, category: "backend" },
  { name: "MongoDB", level: 60, category: "backend" },
  { name: "Django", level: 90, category: "backend" },
  { name: "GraphQL", level: 50, category: "backend" },

  // Data Analysis
  { name: "Excel", level: 95, category: "data analysis" },
  { name: "Python", level: 75, category: "data analysis" },
  { name: "Power BI", level: 90, category: "data analysis" },
  { name: "Tableau", level: 80, category: "data analysis" },

  // Tools
  { name: "Git/GitHub", level: 90, category: "tools" },
  { name: "Docker", level: 60, category: "tools" },
  { name: "Figma", level: 85, category: "tools" },
  { name: "VS Code", level: 95, category: "tools" },
];

const categories = ["all", "frontend", "backend", "data analysis", "tools"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );
  
  return (
    <section id="skills" className="py-24 px-4 relative section-glass">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-6 py-3 rounded-full transition-all duration-300 capitalize font-medium",
                "backdrop-filter backdrop-blur-md border",
                activeCategory === category
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-400 shadow-lg transform scale-105"
                  : "bg-white/20 text-foreground hover:bg-white/30 border-white/30 hover:border-white/40 hover:scale-105"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, key) => (
            <div
              key={key}
              className="gradient-border p-6 card-hover group"
            >
              <div className="text-left mb-4">
                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                  {skill.name}
                </h3>
              </div>
              
              <div className="w-full glass-progress h-3 mb-2">
                <div
                  className="glass-progress-fill h-full animate-[grow_1.5s_ease-out]"
                  style={{ width: skill.level + "%" }}
                />
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground font-medium">Proficiency</span>
                <span className="text-foreground font-semibold">
                  {skill.level}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};