import { ClipboardEdit, Code, Database } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative section-glass">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary"> Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl text-primary font-semibold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              Software Engineer, Data Analyst, Graphic Designer, & Freelance Writer
            </h3>

            <p className="text-muted-foreground leading-relaxed">
              With a strong foundation in software engineering, I specialize in web development, 
              data analysis, graphic design, and IT consultation. I bring a multidisciplinary approach 
              to crafting scalable digital solutions — ranging from responsive websites to data-driven 
              applications.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              My passion lies in leveraging technology to address real-world problems, blending 
              creativity with strategic thinking to deliver impact. In addition to my technical skills, 
              I am also an experienced academic and technical writer, capable of translating complex 
              concepts into clear, actionable insights. I thrive in roles that foster innovation, continuous 
              learning, and meaningful contribution.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Beyond technical execution, I place high value on collaboration, adaptability, and effective 
              communication — core traits that enable me to align project goals with user needs and organizational 
              objectives. Whether building interactive dashboards, conducting research, or consulting on IT 
              strategies, I aim to deliver solutions that are not only functional but also forward-thinking 
              and user-centric.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                Get In Touch
              </a>

              <a
                href=""
                className="px-6 py-2 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-all duration-300 glass-input font-medium hover:border-primary/60 hover:shadow-lg"
              >
                Request CV
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover group">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg mb-2">Web Development</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Building responsive, scalable, and user-friendly websites and applications using modern 
                    frameworks to deliver seamless and performance-driven digital experiences.
                  </p>
                </div>
              </div>
            </div>

            <div className="gradient-border p-6 card-hover group">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg mb-2">Data Analysis</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Transforming raw data into actionable insights through statistical analysis, interactive 
                    dashboards, and compelling data visualizations using tools such as Python, 
                    Microsoft Excel, and Power BI.
                  </p>
                </div>
              </div>
            </div>

            <div className="gradient-border p-6 card-hover group">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                  <ClipboardEdit className="h-6 w-6 text-primary" />
                </div>

                <div className="text-left">
                  <h4 className="font-semibold text-lg mb-2">Graphic Design</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Crafting visually compelling designs that communicate effectively across digital 
                    and print media. I specialize in brand identity, social media graphics, and promotional 
                    content using tools such as Adobe Photoshop, Illustrator, and Canva. My work balances 
                    creativity with strategic intent to enhance user engagement and brand recognition.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};