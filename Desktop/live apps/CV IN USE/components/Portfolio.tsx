'use client'

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import { Link2, X, Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import PixelBorder from './ui/PixelBorder'
import SectionWrapper from './SectionWrapper'
import { projects } from '../data/userData'

const Portfolio: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'center',
    containScroll: 'trimSnaps',
    dragFree: true,
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  }

  return (
    <SectionWrapper id="portfolio" orientation="landscape" className="relative">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
        >
          <h2 className="font-pixel text-2xl mb-8 text-center text-pixel-green">PROJECT & PORTFOLIO GALLERY</h2>
          
          {/* Carousel Container */}
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {projects.map((project, index) => (
                  <motion.div 
                    key={project.id}
                    className="flex-[0_0_300px] mx-4"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <PixelBorder className="overflow-hidden h-96">
                      <div 
                        className="relative group cursor-pointer h-full"
                        onClick={() => setSelectedProject(project.id)}
                      >
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end">
                          <h3 className="text-lg font-medium">{project.title}</h3>
                          <p className="text-sm text-gray-300 line-clamp-2">{project.description}</p>
                          
                          <div className="mt-auto pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="inline-block px-2 py-1 bg-pixel-green/20 text-pixel-green text-xs rounded">
                              {project.category === 'design' && 'Graphic Design'}
                              {project.category === 'data' && 'Data Analysis'}
                              {project.category === 'ui' && 'UI/UX Design'}
                              {project.category === 'web' && 'Web Development'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </PixelBorder>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 bg-modern-darker border-2 border-pixel-green hover:bg-pixel-green hover:text-black transition-all duration-200"
              aria-label="Previous project"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 bg-modern-darker border-2 border-pixel-green hover:bg-pixel-green hover:text-black transition-all duration-200"
              aria-label="Next project"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Project indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                className="w-3 h-3 bg-pixel-green/30 hover:bg-pixel-green transition-colors duration-200"
                onClick={() => emblaApi?.scrollTo(index)}
              />
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {projects.filter(p => p.id === selectedProject).map((project) => (
                <PixelBorder 
                  key={project.id}
                  className="p-6 bg-modern-darker"
                  hover={false}
                >
                  <button 
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    onClick={() => setSelectedProject(null)}
                    aria-label="Close project details"
                  >
                    <X size={24} />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="aspect-video">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-medium mb-2">{project.title}</h3>
                      <p className="text-gray-300 mb-4">{project.description}</p>
                      
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-pixel-green/20 text-pixel-green text-sm rounded">
                          {project.category === 'design' && 'Graphic Design'}
                          {project.category === 'data' && 'Data Analysis'}
                          {project.category === 'ui' && 'UI/UX Design'}
                          {project.category === 'web' && 'Web Development'}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        {project.github && (
                          <a 
                            href={project.github} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-gray-300 hover:text-pixel-green transition-colors"
                          >
                            <Github className="mr-2" size={18} />
                            <span>View on GitHub</span>
                          </a>
                        )}
                        
                        {project.behance && (
                          <a 
                            href={project.behance} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-gray-300 hover:text-pixel-green transition-colors"
                          >
                            <ExternalLink className="mr-2" size={18} />
                            <span>View on Behance</span>
                          </a>
                        )}
                        
                        {project.link && (
                          <a 
                            href={project.link} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-gray-300 hover:text-pixel-green transition-colors"
                          >
                            <Link2 className="mr-2" size={18} />
                            <span>Visit Project</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </PixelBorder>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  )
}

export default Portfolio