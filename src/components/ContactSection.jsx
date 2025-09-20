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
import { useState, useCallback } from "react";
import emailjs from '@emailjs/browser';

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // EmailJS credentials
  const EMAILJS_SERVICE_ID = 'service_rkqvrdl';
  const EMAILJS_TEMPLATE_ID = 'template_sms55af';
  const EMAILJS_PUBLIC_KEY = 'Pw39MuRbIt6JWxiRy';

  // Form validation
  const validateForm = useCallback(() => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    return errors;
  }, [formData]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [formErrors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast({
        title: "Validation Error",
        description: "Please fix the errors below.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});

    try {
      // Send email using EmailJS with timeout
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );

      const emailPromise = emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name.trim(),
          from_email: formData.email.trim(),
          message: formData.message.trim(),
          to_email: 'ingeniouskemayah@gmail.com',
        },
        EMAILJS_PUBLIC_KEY
      );

      const result = await Promise.race([emailPromise, timeoutPromise]);

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
      
      let errorMessage = "Please try again or contact me directly via email.";
      if (error.message === 'Request timeout') {
        errorMessage = "Request timed out. Please check your connection and try again.";
      } else if (error.status === 400) {
        errorMessage = "Invalid form data. Please check your inputs.";
      } else if (error.status === 403) {
        errorMessage = "Service temporarily unavailable. Please try again later.";
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
    <section id="contact" className="py-24 px-4 relative sectionGlass">
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
                  <Mail className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Email</h4>
                  <a
                    href="mailto:ingeniouskemayah@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 rounded"
                    aria-label="Send email to ingeniouskemayah@gmail.com"
                  >
                    ingeniouskemayah@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 backdrop-blur-sm border border-white/20">
                  <Phone className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Phone</h4>
                  <a
                    href="tel:+231770723830"
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 rounded"
                    aria-label="Call +231 (770) 723-830"
                  >
                    +231 (770) 723-830
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 backdrop-blur-sm border border-white/20">
                  <MapPin className="h-6 w-6 text-primary" aria-hidden="true" />
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
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-primary/40 hover:scale-110 group focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
                  aria-label="Connect with me on LinkedIn"
                >
                  <Linkedin className="hover:text-primary transition-colors duration-300 group-hover:scale-110" aria-hidden="true" />
                </a>
                <a 
                  href="https://x.com/handsome_breezy?s=21&t=mc1gK9CmYsqR2nAn7IlLng" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-primary/40 hover:scale-110 group focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
                  aria-label="Follow me on Twitter/X"
                >
                  <Twitter className="hover:text-primary transition-colors duration-300 group-hover:scale-110" aria-hidden="true" />
                </a>
                <a 
                  href="https://www.instagram.com/handsome_breezy_ingenious?igsh=cTZ3ZjZ4cnMzMWZ5&utm_source=qr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-primary/40 hover:scale-110 group focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
                  aria-label="Follow me on Instagram"
                >
                  <Instagram className="hover:text-primary transition-colors duration-300 group-hover:scale-110" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <div className="gradientBorder p-8 cardHover">
            <h3 className="text-2xl font-semibold mb-6 text-foreground">Send a Message</h3>

            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2 text-foreground"
                >
                  Your Name <span className="text-destructive" aria-label="required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  className={cn(
                    "glassInput w-full px-4 py-3 rounded-md text-foreground placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed",
                    formErrors.name && "border-destructive focus:border-destructive"
                  )}
                  placeholder="Enter your name here..."
                  aria-describedby={formErrors.name ? "name-error" : undefined}
                  aria-invalid={formErrors.name ? "true" : "false"}
                />
                {formErrors.name && (
                  <p id="name-error" className="text-destructive text-sm mt-1" role="alert">
                    {formErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 text-foreground"
                >
                  Your Email <span className="text-destructive" aria-label="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  className={cn(
                    "glassInput w-full px-4 py-3 rounded-md text-foreground placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed",
                    formErrors.email && "border-destructive focus:border-destructive"
                  )}
                  placeholder="example@gmail.com"
                  aria-describedby={formErrors.email ? "email-error" : undefined}
                  aria-invalid={formErrors.email ? "true" : "false"}
                />
                {formErrors.email && (
                  <p id="email-error" className="text-destructive text-sm mt-1" role="alert">
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2 text-foreground"
                >
                  Your Message <span className="text-destructive" aria-label="required">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  rows={5}
                  className={cn(
                    "glassInput w-full px-4 py-3 rounded-md text-foreground placeholder:text-muted-foreground resize-none disabled:opacity-50 disabled:cursor-not-allowed",
                    formErrors.message && "border-destructive focus:border-destructive"
                  )}
                  placeholder="Kindly type your message here..."
                  aria-describedby={formErrors.message ? "message-error" : undefined}
                  aria-invalid={formErrors.message ? "true" : "false"}
                />
                {formErrors.message && (
                  <p id="message-error" className="text-destructive text-sm mt-1" role="alert">
                    {formErrors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "cosmicButton w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                )}
                aria-describedby="submit-status"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" aria-hidden="true" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={16} className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                  </>
                )}
              </button>
              
              <p id="submit-status" className="sr-only" aria-live="polite" aria-atomic="true">
                {isSubmitting ? "Sending your message, please wait." : ""}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};