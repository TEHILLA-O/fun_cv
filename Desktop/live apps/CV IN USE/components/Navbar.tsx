import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, FileDown, MailIcon, Home, Briefcase, BookOpen, Award, User } from 'lucide-react';
import PixelBorder from './ui/PixelBorder';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isScrolled = scrollPosition > 50;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  const handleDownloadCV = () => {
    // Create a link element to download the CV file
    const link = document.createElement('a')
    link.href = `/tehilla-cv.docx?t=${Date.now()}` // Add cache-busting parameter
    link.download = 'Tehilla_Obanor_CV.docx'
    link.target = '_blank'
    
    // Trigger the download
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  };

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-modern-darker bg-opacity-90 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            whileHover={{ 
              scale: 1.05,
              textShadow: "0 0 15px currentColor"
            }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <PixelBorder className="py-1 px-3 text-pixel-green relative z-10">
              <motion.span 
                className="font-pixel text-sm md:text-base relative z-10"
                whileHover={{ 
                  textShadow: "0 0 15px currentColor"
                }}
              >
                tehilla.rpg
              </motion.span>
            </PixelBorder>
            <motion.div
              className="absolute inset-0 bg-pixel-green/20 rounded"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1">
            <motion.button 
              onClick={() => scrollToSection('hero')}
              className="px-3 py-2 hover:text-pixel-green transition-all duration-300 relative group"
              whileHover={{ 
                scale: 1.05,
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span 
                className="flex items-center space-x-1 relative z-10"
                whileHover={{ 
                  textShadow: "0 0 8px currentColor"
                }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Home size={16} />
                </motion.div>
                <span>Home</span>
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-pixel-green/10 rounded"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
            <motion.button 
              onClick={() => scrollToSection('about')}
              className="px-3 py-2 hover:text-pixel-green transition-all duration-300 relative group"
              whileHover={{ 
                scale: 1.05,
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span 
                className="flex items-center space-x-1 relative z-10"
                whileHover={{ 
                  textShadow: "0 0 8px currentColor"
                }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <User size={16} />
                </motion.div>
                <span>About</span>
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-pixel-green/10 rounded"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
            <motion.button 
              onClick={() => scrollToSection('experience')}
              className="px-3 py-2 hover:text-pixel-green transition-all duration-300 relative group"
              whileHover={{ 
                scale: 1.05,
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span 
                className="flex items-center space-x-1 relative z-10"
                whileHover={{ 
                  textShadow: "0 0 8px currentColor"
                }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Briefcase size={16} />
                </motion.div>
                <span>Experience</span>
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-pixel-green/10 rounded"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
            <motion.button 
              onClick={() => scrollToSection('education')}
              className="px-3 py-2 hover:text-pixel-green transition-all duration-300 relative group"
              whileHover={{ 
                scale: 1.05,
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span 
                className="flex items-center space-x-1 relative z-10"
                whileHover={{ 
                  textShadow: "0 0 8px currentColor"
                }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <BookOpen size={16} />
                </motion.div>
                <span>Education</span>
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-pixel-green/10 rounded"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
            <motion.button 
              onClick={() => scrollToSection('portfolio')}
              className="px-3 py-2 hover:text-pixel-green transition-all duration-300 relative group"
              whileHover={{ 
                scale: 1.05,
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span 
                className="flex items-center space-x-1 relative z-10"
                whileHover={{ 
                  textShadow: "0 0 8px currentColor"
                }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Award size={16} />
                </motion.div>
                <span>Portfolio</span>
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-pixel-green/10 rounded"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
            <motion.button 
              onClick={() => scrollToSection('contact')}
              className="px-3 py-2 hover:text-pixel-green transition-all duration-300 relative group"
              whileHover={{ 
                scale: 1.05,
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span 
                className="flex items-center space-x-1 relative z-10"
                whileHover={{ 
                  textShadow: "0 0 8px currentColor"
                }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <MailIcon size={16} />
                </motion.div>
                <span>Contact</span>
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-pixel-green/10 rounded"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-2"
            >
              <PixelBorder className="relative group">
                <motion.button 
                  onClick={handleDownloadCV}
                  className="flex items-center space-x-2 px-4 py-2 text-black bg-pixel-green hover:bg-opacity-90 transition-all duration-300 relative z-10"
                  whileHover={{ 
                    textShadow: "0 0 8px currentColor"
                  }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FileDown size={16} />
                  </motion.div>
                  <span>CV.docx</span>
                </motion.button>
                <motion.div
                  className="absolute inset-0 bg-pixel-green/20 rounded"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </PixelBorder>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden hover:text-pixel-green transition-all duration-300 relative group"
            onClick={toggleMenu}
            whileHover={{ 
              scale: 1.1,
              rotate: 90
            }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className="absolute inset-0 bg-pixel-green/10 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.2, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="relative z-10"
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          className="md:hidden bg-modern-darker border-t border-gray-800"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <button 
              onClick={() => scrollToSection('hero')}
              className="px-3 py-2 hover:text-pixel-green transition-colors text-left"
            >
              <span className="flex items-center space-x-2">
                <Home size={18} />
                <span>Home</span>
              </span>
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="px-3 py-2 hover:text-pixel-green transition-colors text-left"
            >
              <span className="flex items-center space-x-2">
                <User size={18} />
                <span>About</span>
              </span>
            </button>
            <button 
              onClick={() => scrollToSection('experience')}
              className="px-3 py-2 hover:text-pixel-green transition-colors text-left"
            >
              <span className="flex items-center space-x-2">
                <Briefcase size={18} />
                <span>Experience</span>
              </span>
            </button>
            <button 
              onClick={() => scrollToSection('education')}
              className="px-3 py-2 hover:text-pixel-green transition-colors text-left"
            >
              <span className="flex items-center space-x-2">
                <BookOpen size={18} />
                <span>Education</span>
              </span>
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="px-3 py-2 hover:text-pixel-green transition-colors text-left"
            >
              <span className="flex items-center space-x-2">
                <Award size={18} />
                <span>Portfolio</span>
              </span>
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-3 py-2 hover:text-pixel-green transition-colors text-left"
            >
              <span className="flex items-center space-x-2">
                <MailIcon size={18} />
                <span>Contact</span>
              </span>
            </button>
            <PixelBorder>
              <button 
                onClick={handleDownloadCV}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-black bg-pixel-green hover:bg-opacity-90 transition-colors"
              >
                <FileDown size={18} />
                <span>Download CV</span>
              </button>
            </PixelBorder>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;