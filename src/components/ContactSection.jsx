import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import emailjs from '@emailjs/browser';

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // EmailJS credentials
  const EMAILJS_SERVICE_ID = 'service_rkqvrdl';
  const EMAILJS_TEMPLATE_ID = 'template_sms55af';
  const EMAILJS_PUBLIC_KEY = 'Pw39MuRbIt6JWxiRy';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Send email using EmailJS
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'ingeniouskemayah@gmail.com',
        },
        EMAILJS_PUBLIC_KEY
      );

      if (result.status === 200) {
        toast({
          title: "Message sent successfully!",
          description: "Thank you for your message. I'll get back to you soon.",
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      toast({
        title: "Failed to send message",
        description: "Please try again or contact me directly via email.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 relative section-glass">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-primary bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Touch</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Have a project in mind or want to collaborate? Feel free to reach out.
          I'm always open to discussing new opportunities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold mb-6 text-foreground">
              Contact Information
            </h3>

            <div className="space-y-6 justify-center">
              <div className="flex items-start space-x-4 group">
                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 backdrop-blur-sm border border-white/20">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Email</h4>
                  <a
                    href="mailto:ingeniouskemayah@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    ingeniouskemayah@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 backdrop-blur-sm border border-white/20">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Phone</h4>
                  <a
                    href="tel:+231723830"
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    +231 (770) 723-830
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 backdrop-blur-sm border border-white/20">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Location</h4>
                  <span className="text-muted-foreground">
                    Paynesville, Montserrado, Liberia
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h4 className="font-medium mb-4 text-foreground">Connect With Me</h4>
              <div className="flex space-x-4 justify-center">
                <a 
                  href="https://www.linkedin.com/in/nehemiah-kemayah?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-primary/40 hover:scale-110 group"
                >
                  <Linkedin className="hover:text-primary transition-colors duration-300 group-hover:scale-110" />
                </a>
                <a 
                  href="https://x.com/handsome_breezy?s=21&t=mc1gK9CmYsqR2nAn7IlLng" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-primary/40 hover:scale-110 group"
                >
                  <Twitter className="hover:text-primary transition-colors duration-300 group-hover:scale-110" />
                </a>
                <a 
                  href="https://www.instagram.com/handsome_breezy_ingenious?igsh=cTZ3ZjZ4cnMzMWZ5&utm_source=qr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-primary/40 hover:scale-110 group"
                >
                  <Instagram className="hover:text-primary transition-colors duration-300 group-hover:scale-110" />
                </a>
              </div>
            </div>
          </div>

          <div className="gradient-border p-8 card-hover">
            <h3 className="text-2xl font-semibold mb-6 text-foreground">Send a Message</h3>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2 text-foreground"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  className="glass-input w-full px-4 py-3 rounded-md text-foreground placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your name here..."
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 text-foreground"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  className="glass-input w-full px-4 py-3 rounded-md text-foreground placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="example@gmail.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2 text-foreground"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  rows={5}
                  className="glass-input w-full px-4 py-3 rounded-md text-foreground placeholder:text-muted-foreground resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Kindly type your message here..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "cosmic-button w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                )}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};