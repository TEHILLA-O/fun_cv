import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Linkedin, Github, Mail } from 'lucide-react';
import PixelBorder from './ui/PixelBorder';
import SectionWrapper from './SectionWrapper';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Open default email client with pre-filled content
    const subject = encodeURIComponent("Contact from Portfolio Website");
    const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage: ${formState.message}`);
    window.location.href = `mailto:tehillaobanor@gmail.com?subject=${subject}&body=${body}`;
    
    // Reset form
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: '', email: '', message: '' });
    
    // Reset submission status after a delay
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95,
      rotateX: -10,
      filter: "blur(5px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      filter: "blur(0px)",
      transition: { 
        duration: 1.0,
        staggerChildren: 0.2,
        delayChildren: 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <SectionWrapper id="contact" orientation="portrait">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
        >
          <h2 className="font-pixel text-2xl mb-8 text-center text-pixel-green">CONTACT ME</h2>
          
          <div className="grid grid-cols-1 gap-8">
            <PixelBorder className="p-6" hover={false}>
              <h3 className="font-medium text-lg mb-4">Send a Message</h3>
              
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="text-pixel-green text-5xl mb-4">✉️</div>
                  <h4 className="text-xl font-medium mb-2">Message Sent!</h4>
                  <p className="text-gray-400 text-center">Thank you for reaching out. I&apos;ll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <motion.div 
                    className="mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <label 
                      htmlFor="name" 
                      className="block text-sm font-medium text-gray-400 mb-1"
                    >
                      Name
                    </label>
                    <motion.input
                      id="name"
                      name="name"
                      type="text"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-modern-dark border border-gray-700 focus:border-pixel-green outline-none transition-all duration-300"
                      whileFocus={{ 
                        scale: 1.02,
                        boxShadow: "0 0 15px rgba(0, 255, 157, 0.2)",
                        borderColor: "#00ff9d"
                      }}
                      whileHover={{ 
                        scale: 1.01,
                        borderColor: "#00ff9d"
                      }}
                    />
                  </motion.div>
                  
                  <motion.div 
                    className="mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <label 
                      htmlFor="email" 
                      className="block text-sm font-medium text-gray-400 mb-1"
                    >
                      Email
                    </label>
                    <motion.input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-modern-dark border border-gray-700 focus:border-pixel-green outline-none transition-all duration-300"
                      whileFocus={{ 
                        scale: 1.02,
                        boxShadow: "0 0 15px rgba(0, 255, 157, 0.2)",
                        borderColor: "#00ff9d"
                      }}
                      whileHover={{ 
                        scale: 1.01,
                        borderColor: "#00ff9d"
                      }}
                    />
                  </motion.div>
                  
                  <motion.div 
                    className="mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <label 
                      htmlFor="message" 
                      className="block text-sm font-medium text-gray-400 mb-1"
                    >
                      Message
                    </label>
                    <motion.textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formState.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-modern-dark border border-gray-700 focus:border-pixel-green outline-none transition-all duration-300"
                      whileFocus={{ 
                        scale: 1.02,
                        boxShadow: "0 0 15px rgba(0, 255, 157, 0.2)",
                        borderColor: "#00ff9d"
                      }}
                      whileHover={{ 
                        scale: 1.01,
                        borderColor: "#00ff9d"
                      }}
                    ></motion.textarea>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <PixelBorder>
                      <motion.button 
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 px-4 bg-pixel-green text-black font-medium flex items-center justify-center ${isSubmitting ? 'opacity-70' : ''}`}
                        whileHover={{ 
                          scale: 1.02,
                          y: -2,
                          boxShadow: "0 10px 25px rgba(0, 255, 157, 0.3)"
                        }}
                        whileTap={{ 
                          scale: 0.98,
                          y: 0
                        }}
                        transition={{ 
                          duration: 0.3,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                      >
                        {isSubmitting ? (
                          <motion.span
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            Opening Email Client...
                          </motion.span>
                        ) : (
                          <>
                            <motion.div
                              whileHover={{ rotate: 15, scale: 1.1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Send size={18} className="mr-2" />
                            </motion.div>
                            <span>Send Message</span>
                          </>
                        )}
                      </motion.button>
                    </PixelBorder>
                  </motion.div>
                </form>
              )}
            </PixelBorder>
            
            <PixelBorder className="p-6 bg-modern-darker" hover={false}>
              <h3 className="font-pixel text-sm md:text-base mb-6 text-pixel-green">{/* CONNECTION ESTABLISHED */}CONNECTION ESTABLISHED</h3>
              
              <div className="font-mono space-y-4">
                <p className="text-gray-400">
                  <span className="text-pixel-green">$</span> Looking for a data analyst with fintech expertise?
                </p>
                <p className="text-gray-400">
                  <span className="text-pixel-green">$</span> Let&apos;s collaborate on your next project!
                </p>
                <p className="text-gray-400">
                  <span className="text-pixel-green">$</span> Available for full-time opportunities.
                </p>
              </div>
              
              <div className="mt-8">
                <h4 className="text-sm font-medium text-gray-400 mb-4">Connect with me:</h4>
                
                <div className="flex flex-wrap gap-3">
                  <a 
                    href="https://www.linkedin.com/in/tehilla-obanor/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="block"
                  >
                    <PixelBorder className="p-3 hover:text-pixel-blue cursor-pointer transition-all duration-300 hover:scale-105">
                      <Linkedin size={20} />
                    </PixelBorder>
                  </a>
                  
                  <a 
                    href="https://github.com/TEHILLA-O" 
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="block"
                  >
                    <PixelBorder className="p-3 hover:text-pixel-purple cursor-pointer transition-all duration-300 hover:scale-105">
                      <Github size={20} />
                    </PixelBorder>
                  </a>
                  
                  <a 
                    href="mailto:tehillaobanor@gmail.com"
                    aria-label="Email"
                    className="block"
                  >
                    <PixelBorder className="p-3 hover:text-pixel-blue cursor-pointer transition-all duration-300 hover:scale-105">
                      <Mail size={20} />
                    </PixelBorder>
                  </a>
                </div>
              </div>
            </PixelBorder>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default Contact;