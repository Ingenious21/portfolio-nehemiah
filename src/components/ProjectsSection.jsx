import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Web Music Player",
    description: "A responsive website with a list of free songs.",
    image: "/projects/project1.png",
    tags: ["HTML", "CSS", "Bootstrap", "JavaScript"],
    demoUrl: "https://ingenious21.github.io/music_app/",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Analytic Dashboard",
    description:
      "Will be up as soon as completed. Thank you for your understanding!",
    image: "/projects/project2.png",
    tags: ["N/A"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "Guessing Game",
    description:
      "Simple yet engaging number guessing game featuring real-time feedback and intuitive user interaction.",
    image: "/projects/project3.png",
    tags: ["HTML", "CSS", "JavaScript"],
    demoUrl: "https://ingenious21.github.io/guessing-game/",
    githubUrl: "#",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-primary bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Projects</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group gradientBorder rounded-lg overflow-hidden cardHover"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs font-medium border rounded-full bg-white/10 text-foreground/80 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    {/* ✅ UPDATED: Added min-w-[44px] min-h-[44px] for proper touch targets */}
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-foreground/80 hover:text-primary transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-primary/40 hover:scale-110 min-w-[44px] min-h-[44px] flex items-center justify-center"
                      aria-label={`View ${project.title} demo`}
                    >
                      <ExternalLink size={18} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-foreground/80 hover:text-primary transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-primary/40 hover:scale-110 min-w-[44px] min-h-[44px] flex items-center justify-center"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <Github size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmicButton w-fit flex items-center mx-auto gap-2 group"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Ingenious21"
            aria-label="View my GitHub profile"
          >
            Check My Github 
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
};