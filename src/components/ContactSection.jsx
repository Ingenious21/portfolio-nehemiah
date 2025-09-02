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

// Input validation utilities
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[<>'"]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
};

const validateName = (name) => {
  const nameRegex = /^[a-zA-Z\s'-]{2,50}$/;
  return nameRegex.test(name);
};

const validateMessage = (message) => {
  return message.length >= 10 && message.length <= 1000;
};

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // environment variables for security
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  // Check if environment variables are loaded
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    console.error('EmailJS environment variables are not configured');
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Sanitize input to prevent XSS
    const sanitizedValue = sanitizeInput(value);
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
  };

  const validateForm = () => {
    const errors = [];
    
    // Validate name
    if (!formData.name.trim()) {
      errors.push("Name is required");
    } else if (!validateName(formData.name)) {
      errors.push("Name contains invalid characters or is too long");
    }
    
    // Validate email
    if (!formData.email.trim()) {
      errors.push("Email is required");
    } else if (!validateEmail(formData.email)) {
      errors.push("Please enter a valid email address");
    }
    
    // Validate message
    if (!formData.message.trim()) {
      errors.push("Message is required");
    } else if (!validateMessage(formData.message)) {
      errors.push("Message must be between 10 and 1000 characters");
    }
    
    return errors;
  };

  const checkRateLimit = () => {
    try {
      const lastSubmission = localStorage.getItem('lastEmailSubmission');
      const submissionCount = parseInt(localStorage.getItem('emailSubmissionCount') || '0');
      const lastResetTime = parseInt(localStorage.getItem('lastResetTime') || '0');
      const now = Date.now();
      
      // Reset counter every hour
      if (now - lastResetTime > 3600000) { // 1 hour
        localStorage.setItem('emailSubmissionCount', '0');
        localStorage.setItem('lastResetTime', now.toString());
        return true;
      }
      
      // Check if too many submissions in the last hour
      if (submissionCount >= 5) {
        return false;
      }
      
      // Check if last submission was too recent
      if (lastSubmission && now - parseInt(lastSubmission) < 60000) { // 1 minute
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Rate limit check error:', error);
      return true; // Allow submission if there's an error checking
    }
  };

  const updateRateLimit = () => {
    try {
      const now = Date.now();
      const submissionCount = parseInt(localStorage.getItem('emailSubmissionCount') || '0');
      
      localStorage.setItem('lastEmailSubmission', now.toString());
      localStorage.setItem('emailSubmissionCount', (submissionCount + 1).toString());
    } catch (error) {
      console.error('Rate limit update error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      toast({
        title: "Validation Error",
        description: validationErrors[0],
        variant: "destructive"
      });
      return;
    }

    // Check rate limiting
    if (!checkRateLimit()) {
      toast({
        title: "Rate Limit Exceeded",
        description: "Please wait before sending another message or try again later.",
        variant: "destructive"
      });
      return;
    }

    // Check if EmailJS is configured
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      toast({
        title: "Configuration Error",
        description: "Email service is not properly configured. Please try again later.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'ingeniouskemayah@gmail.com',
          timestamp: new Date().toISOString(),
          user_agent: navigator.userAgent.substring(0, 100), // Limited for security
        },
        EMAILJS_PUBLIC_KEY
      );

      if (result.status === 200) {
        updateRateLimit();
        
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
      
      let errorMessage = "Please try again or contact me directly via email.";
      if (error.message && error.message.includes('rate')) {
        errorMessage = "Too many requests. Please wait a moment before sending another message.";
      }
      
      toast({
        title: "Failed to send message",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-primary"> Touch</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? Feel free to reach out.
          I'm always open to discussing new opportunities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold mb-6">
              Contact Information
            </h3>

            <div className="space-y-6 justify-center">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium"> Email</h4>
                  <a
                    href="mailto:ingeniouskemayah@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    rel="noopener noreferrer"
                  >
                    ingeniouskemayah@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium"> Phone</h4>
                  <a
                    href="tel:+231770723830"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +231 (770) 723-830
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium"> Location</h4>
                  <span className="text-muted-foreground">
                    Paynesville, Montserrado, Liberia
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h4 className="font-medium mb-4"> Connect With Me</h4>
              <div className="flex space-x-4 justify-center">
                <a 
                  href="https://www.linkedin.com/in/nehemiah-kemayah?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="hover:text-primary transition-colors" />
                </a>
                <a 
                  href="https://x.com/handsome_breezy?s=21&t=mc1gK9CmYsqR2nAn7IlLng" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Twitter Profile"
                >
                  <Twitter className="hover:text-primary transition-colors" />
                </a>
                <a 
                  href="https://www.instagram.com/handsome_breezy_ingenious?igsh=cTZ3ZjZ4cnMzMWZ5&utm_source=qr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                >
                  <Instagram className="hover:text-primary transition-colors" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-card p-8 rounded-lg shadow-xs">
            <h3 className="text-2xl font-semibold mb-6"> Send a Message</h3>

            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  maxLength={50}
                  autoComplete="name"
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your name here..."
                  aria-describedby="name-help"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Your Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  maxLength={254}
                  autoComplete="email"
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="example@gmail.com"
                  aria-describedby="email-help"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  rows={5}
                  maxLength={1000}
                  minLength={10}
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Kindly type your message here... (minimum 10 characters)"
                  aria-describedby="message-help"
                />
                <div className="text-xs text-muted-foreground mt-1">
                  {formData.message.length}/1000 characters
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "cosmic-button w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                )}
                aria-describedby="submit-help"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={16} aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};