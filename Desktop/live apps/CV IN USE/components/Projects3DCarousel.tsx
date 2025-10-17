'use client'

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link2, X, Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import PixelBorder from './ui/PixelBorder'
import SectionWrapper from './SectionWrapper'
import { projects } from '../data/userData'

// Constants
const AUTO_ROTATE_SPEED = 4000
const ROTATION_DELAY = 500
const VISIBLE_PROJECTS = 5
const CARD_WIDTH = 200
const CARD_DEPTH = 100

const Projects3DCarousel: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isRotating, setIsRotating] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Memoized visible projects calculation
  const visibleProjects = useMemo(() => {
    const visible = []
    const total = projects.length
    const halfVisible = Math.floor(VISIBLE_PROJECTS / 2)
    
    for (let i = -halfVisible; i <= halfVisible; i++) {
      const index = (currentIndex + i + total) % total
      visible.push({
        ...projects[index],
        position: i,
        isCenter: i === 0,
        distance: Math.abs(i)
      })
    }
    
    return visible
  }, [currentIndex])

  // Optimized rotation function with error handling
  const rotateCarousel = useCallback((direction: 'left' | 'right') => {
    try {
      if (isRotating || !projects.length) return
      
      setIsRotating(true)
      setAutoRotate(false)
      clearAutoRotate()
      setError(null)
      
      const newIndex = direction === 'left' 
        ? (currentIndex + 1) % projects.length
        : (currentIndex - 1 + projects.length) % projects.length
      
      setCurrentIndex(newIndex)
      
      setTimeout(() => {
        setIsRotating(false)
        // Resume auto-rotate after 5 seconds
        setTimeout(() => {
          setAutoRotate(true)
          startAutoRotate()
        }, 5000)
      }, ROTATION_DELAY)
    } catch (err) {
      setError('Failed to rotate carousel')
      setIsRotating(false)
      console.error('Carousel rotation error:', err)
    }
  }, [currentIndex, isRotating, projects.length])

  // Optimized auto-rotate functions
  const clearAutoRotate = useCallback(() => {
    if (autoRotateRef.current) {
      clearTimeout(autoRotateRef.current)
      autoRotateRef.current = null
    }
  }, [])

  const startAutoRotate = useCallback(() => {
    if (!autoRotate || isRotating) return
    
    clearAutoRotate()
    
    autoRotateRef.current = setTimeout(() => {
      if (autoRotate && !isRotating) {
        setCurrentIndex((prev) => (prev + 1) % projects.length)
        startAutoRotate()
      }
    }, AUTO_ROTATE_SPEED)
  }, [autoRotate, isRotating])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        rotateCarousel('left')
      } else if (e.key === 'ArrowRight') {
        rotateCarousel('right')
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [rotateCarousel])

  // Auto-rotate effect
  useEffect(() => {
    if (autoRotate) {
      startAutoRotate()
    }
    return () => clearAutoRotate()
  }, [autoRotate, startAutoRotate, clearAutoRotate])

  // Error state
  if (error) {
    return (
      <SectionWrapper id="portfolio" orientation="landscape" className="relative">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-pixel text-2xl mb-4 text-center text-pixel-green">PROJECT & PORTFOLIO GALLERY</h2>
            <div className="bg-red-900/20 border border-red-500 rounded-lg p-6">
              <p className="text-red-400 mb-4 font-pixel">ERROR LOADING CAROUSEL</p>
              <p className="text-red-300 text-sm mb-4">{error}</p>
              <button 
                onClick={() => {
                  setError(null)
                  setIsMounted(false)
                  setTimeout(() => setIsMounted(true), 100)
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
              >
                RETRY
              </button>
            </div>
          </div>
        </div>
      </SectionWrapper>
    )
  }

  // Loading state
  if (!isMounted || !projects.length) {
    return (
      <SectionWrapper id="portfolio" orientation="landscape" className="relative">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-pixel text-2xl mb-4 text-center text-pixel-green">PROJECT & PORTFOLIO GALLERY</h2>
            <p className="text-center text-pixel-blue/70 text-sm mb-8 font-pixel">
              {!projects.length ? 'NO PROJECTS AVAILABLE' : 'LOADING CAROUSEL...'}
            </p>
            <div className="flex justify-center">
              <div className="w-8 h-8 border-2 border-pixel-green border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    )
  }

  return (
    <SectionWrapper id="portfolio" orientation="landscape" className="relative">
      <div className="container mx-auto px-4">
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { 
                staggerChildren: 0.1 
              }
            }
          }}
        >
          <motion.h2 
            className="font-pixel text-2xl mb-4 text-center text-pixel-green"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ 
              textShadow: "0 0 20px rgba(0, 255, 157, 0.5)",
              scale: 1.05
            }}
          >
            PROJECT & PORTFOLIO GALLERY
          </motion.h2>
          <motion.p 
            className="text-center text-pixel-blue/70 text-sm mb-8 font-pixel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ 
              color: "#00bfff",
              textShadow: "0 0 10px rgba(0, 191, 255, 0.5)"
            }}
          >
            USE BUTTONS TO ROTATE • CLICK PANELS FOR DETAILS
          </motion.p>
          
          {/* 3D Carousel Container */}
          <motion.div 
            className="relative h-96 flex items-center justify-center perspective-1000"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Ambient Background Effects */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {/* Floating Orbs */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-pixel-green/20 rounded-full"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 2) * 40}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.6, 0.2],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                />
              ))}
              
              {/* Glow Effects */}
              <motion.div
                className="absolute top-1/2 left-1/2 w-96 h-96 bg-pixel-green/5 rounded-full blur-3xl"
                style={{
                  transform: "translate(-50%, -50%)",
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            {/* Navigation Buttons */}
            <motion.div 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <PixelBorder className="p-2">
                <motion.button
                  onClick={() => rotateCarousel('left')}
                  disabled={isRotating}
                  className="carousel-nav-btn p-3 rounded-full bg-modern-darker/80 text-pixel-green hover:bg-pixel-green hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Previous project"
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 0 20px rgba(0, 255, 157, 0.4)",
                    rotate: -5,
                    y: -2
                  }}
                  whileTap={{ 
                    scale: 0.9,
                    y: 0
                  }}
                  animate={isRotating ? { 
                    rotate: -10,
                    boxShadow: "0 0 25px rgba(0, 255, 157, 0.6)"
                  } : { 
                    rotate: 0,
                    boxShadow: "0 0 0px rgba(0, 255, 157, 0)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    animate={isRotating ? { rotate: -10 } : { rotate: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronLeft size={24} />
                  </motion.div>
                </motion.button>
              </PixelBorder>
            </motion.div>
            
            <motion.div 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <PixelBorder className="p-2">
                <motion.button
                  onClick={() => rotateCarousel('right')}
                  disabled={isRotating}
                  className="carousel-nav-btn p-3 rounded-full bg-modern-darker/80 text-pixel-green hover:bg-pixel-green hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Next project"
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 0 20px rgba(0, 255, 157, 0.4)",
                    rotate: 5,
                    y: -2
                  }}
                  whileTap={{ 
                    scale: 0.9,
                    y: 0
                  }}
                  animate={isRotating ? { 
                    rotate: 10,
                    boxShadow: "0 0 25px rgba(0, 255, 157, 0.6)"
                  } : { 
                    rotate: 0,
                    boxShadow: "0 0 0px rgba(0, 255, 157, 0)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    animate={isRotating ? { rotate: 10 } : { rotate: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight size={24} />
                  </motion.div>
                </motion.button>
              </PixelBorder>
            </motion.div>

            {/* Carousel Cards */}
            <motion.div 
              className="relative w-full h-80 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {visibleProjects.map((project, index) => {
                  const { position, isCenter, distance } = project
                  const isVisible = distance <= 2
                  
                  if (!isVisible) return null

                  return (
                    <motion.div
                      key={`${project.id}-${currentIndex}`}
                      className="absolute cursor-pointer"
                      initial={{ 
                        x: position * CARD_WIDTH,
                        z: -distance * CARD_DEPTH,
                        scale: isCenter ? 1.5 : 1 - distance * 0.2,
                        opacity: isCenter ? 1 : 0.6 - distance * 0.15,
                        rotateY: position * 15,
                        y: 20
                      }}
                      animate={{ 
                        x: position * CARD_WIDTH,
                        z: -distance * CARD_DEPTH,
                        scale: isCenter ? 1.5 : 1 - distance * 0.2,
                        opacity: isCenter ? 1 : 0.6 - distance * 0.15,
                        rotateY: position * 15,
                        y: 0
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.8,
                        y: -20
                      }}
                      transition={{ 
                        duration: 0.5,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        delay: index * 0.05
                      }}
                      onClick={() => setSelectedProject(project.id)}
                      whileHover={{ 
                        scale: isCenter ? 1.6 : (1 - distance * 0.2) * 1.1,
                        z: isCenter ? 50 : -distance * CARD_DEPTH + 20,
                        y: -10,
                        rotateY: position * 15 + (isCenter ? 0 : position * 5)
                      }}
                      whileTap={{ 
                        scale: isCenter ? 1.4 : (1 - distance * 0.2) * 0.95
                      }}
                    >
                      <PixelBorder 
                        className={`p-4 w-64 h-80 bg-modern-darker transition-all duration-300 ${
                          isCenter 
                            ? 'border-2 border-pixel-green shadow-2xl shadow-pixel-green/30' 
                            : 'border border-pixel-green/50 shadow-lg shadow-pixel-green/10'
                        }`}
                        hover={false}
                      >
                        <div className="h-full flex flex-col">
                          {/* Project Image */}
                          <div className="h-48 mb-4 overflow-hidden rounded">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                              loading="lazy"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.src = '/api/placeholder/256/192'
                                target.alt = 'Image failed to load'
                              }}
                            />
                          </div>
                          
                          {/* Project Info */}
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <h3 className="font-bold text-lg mb-2 text-white line-clamp-2 transition-colors duration-300 hover:text-pixel-green">
                                {project.title}
                              </h3>
                              <span className="text-sm text-pixel-blue/70 font-pixel">
                                {project.category === 'design' && 'Graphic Design'}
                                {project.category === 'data' && 'Data Analysis'}
                                {project.category === 'ui' && 'UI/UX Design'}
                                {project.category === 'web' && 'Web Development'}
                              </span>
                            </div>
                            
                            {/* View Button */}
                            <button
                              className="mt-4 px-4 py-2 bg-pixel-green/20 text-pixel-green text-sm font-pixel rounded hover:bg-pixel-green hover:text-black transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pixel-green/30"
                            >
                              VIEW DETAILS
                            </button>
                          </div>
                        </div>
                      </PixelBorder>
                    </motion.div>
                  )
                })}
            </motion.div>
            
          </motion.div>
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
              {(() => {
                const project = projects.find(p => p.id === selectedProject)
                if (!project) return null
                
                return (
                  <PixelBorder 
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
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = '/api/placeholder/600/400'
                            target.alt = 'Image failed to load'
                          }}
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
                          
                          {project.figma && (
                            <a 
                              href={project.figma} 
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-gray-300 hover:text-pixel-green transition-colors"
                            >
                              <ExternalLink className="mr-2" size={18} />
                              <span>View on Figma</span>
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
                )
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  )
}

export default Projects3DCarousel