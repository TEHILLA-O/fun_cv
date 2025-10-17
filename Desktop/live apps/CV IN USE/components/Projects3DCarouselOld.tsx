'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link2, X, Github, ExternalLink, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import PixelBorder from './ui/PixelBorder'
import SectionWrapper from './SectionWrapper'
import { projects } from '../data/userData'

const Projects3DCarousel: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const dragContainerRef = useRef<HTMLDivElement>(null)
  const spinContainerRef = useRef<HTMLDivElement>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [rotationAngle, setRotationAngle] = useState(0)
  const [isRotating, setIsRotating] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const [autoRotateSpeed] = useState(3000) // 3 seconds per rotation
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

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
  }, [rotationAngle, isRotating])

  const rotateCarousel = (direction: 'left' | 'right') => {
    if (isRotating || !spinContainerRef.current) return
    
    // Pause auto-rotate when user interacts
    setAutoRotate(false)
    clearAutoRotate()
    
    setIsRotating(true)
    const angleStep = 360 / 14 // 14 panels
    const newAngle = direction === 'left' 
      ? rotationAngle + angleStep 
      : rotationAngle - angleStep
    
    setRotationAngle(newAngle)
    
    if (spinContainerRef.current) {
      // Add smooth transition for the rotation
      spinContainerRef.current.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
      spinContainerRef.current.style.transform = `rotateX(-5deg) rotateY(${newAngle}deg)`
      
      // Update panel visibility with animation
      setTimeout(() => {
        updatePanelVisibility(newAngle)
      }, 100)
    }
    
    setTimeout(() => {
      setIsRotating(false)
      // Resume auto-rotate after 5 seconds of inactivity
      setTimeout(() => {
        setAutoRotate(true)
        startAutoRotate()
      }, 5000)
    }, 600)
  }

  const clearAutoRotate = () => {
    if (autoRotateRef.current) {
      clearTimeout(autoRotateRef.current)
      autoRotateRef.current = null
    }
  }

  const startAutoRotate = () => {
    if (!autoRotate || !spinContainerRef.current) return
    
    clearAutoRotate()
    
    autoRotateRef.current = setTimeout(() => {
      if (autoRotate && !isRotating && spinContainerRef.current) {
        const angleStep = 360 / 14 // 14 panels
        const newAngle = rotationAngle + angleStep
        setRotationAngle(newAngle)
        
        spinContainerRef.current.style.transform = `rotateX(-5deg) rotateY(${newAngle}deg)`
        updatePanelVisibility(newAngle)
        
        // Continue auto-rotate
        startAutoRotate()
      }
    }, autoRotateSpeed)
  }

  const updatePanelVisibility = (currentAngle: number) => {
    if (!spinContainerRef.current) return
    
    const panels = spinContainerRef.current.getElementsByClassName('carousel-panel')
    const panelArray = Array.from(panels)
    const totalPanels = 14
    const radius = 480
    
    let frontPanelIndex = -1
    let minDistance = Infinity
    
    // Find the panel closest to the front (0 degrees)
    for (let i = 0; i < panelArray.length; i++) {
      const panel = panelArray[i] as HTMLElement
      const angle = (i * 360) / totalPanels
      const currentPanelAngle = (angle + currentAngle) % 360
      const normalizedAngle = ((currentPanelAngle % 360) + 360) % 360
      
      // Calculate distance from front (0 degrees)
      const distance = Math.min(normalizedAngle, 360 - normalizedAngle)
      
      if (distance < minDistance) {
        minDistance = distance
        frontPanelIndex = i
      }
    }
    
    // Update all panels
    for (let i = 0; i < panelArray.length; i++) {
      const panel = panelArray[i] as HTMLElement
      const angle = (i * 360) / totalPanels
      const currentPanelAngle = (angle + currentAngle) % 360
      const frontBack = Math.cos(currentPanelAngle * Math.PI / 180)
      
      if (i === frontPanelIndex) {
        // Only the front panel is big and bold
        panel.style.opacity = '1'
        panel.style.transform = `rotateY(${angle}deg) translateZ(${radius}px) scale(1.4)`
        panel.style.zIndex = '20'
        panel.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        panel.style.fontWeight = 'bold'
        
        // Add a subtle glow effect to the front panel
        panel.style.boxShadow = '0 0 30px rgba(0, 255, 157, 0.5)'
      } else {
        // All other panels are normal
        const opacity = 0.3 + Math.abs(frontBack) * 0.7
        const scale = 0.8 + Math.abs(frontBack) * 0.2
        
        panel.style.opacity = opacity.toString()
        panel.style.transform = `rotateY(${angle}deg) translateZ(${radius}px) scale(${scale})`
        panel.style.zIndex = '1'
        panel.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        panel.style.fontWeight = 'normal'
        panel.style.boxShadow = '0 0 15px rgba(0, 255, 157, 0.2)'
      }
    }
  }

  useEffect(() => {
    if (!isMounted || !dragContainerRef.current || !spinContainerRef.current || isInitialized) return

    // Configuration for 14-panel carousel
            const radius = 480
            const autoRotate = true
            const rotateSpeed = -112500
            const panelWidth = 154
            const panelHeight = 218
            const totalPanels = 14

    const odrag = dragContainerRef.current
    const ospin = spinContainerRef.current
    const panels = ospin.getElementsByClassName('carousel-panel')
    const panelArray = Array.from(panels)

    // Size of carousel container
    ospin.style.width = panelWidth + "px"
    ospin.style.height = panelHeight + "px"

    // Size of ground - depend on radius
    const ground = document.getElementById('ground')
    if (ground) {
      ground.style.width = radius * 3 + "px"
      ground.style.height = radius * 3 + "px"
    }

    function initPanels(delayTime?: number) {
      for (let i = 0; i < panelArray.length; i++) {
        const angle = (i * 360) / totalPanels
        const panel = panelArray[i] as HTMLElement
        
        // Position each panel in a circle
        panel.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`
        panel.style.transition = "transform 1s"
        panel.style.transitionDelay = delayTime ? delayTime + "s" : (totalPanels - i) / 8 + "s"
        
        // Add depth-based styling
        const frontBack = Math.cos(angle * Math.PI / 180)
        const opacity = 0.3 + Math.abs(frontBack) * 0.7
        const scale = 0.8 + Math.abs(frontBack) * 0.2
        
        panel.style.opacity = opacity.toString()
        panel.style.transform += ` scale(${scale})`
      }
    }

    function applyTranform(obj: HTMLElement, tX: number, tY: number) {
      // Constrain the angle of camera (between 0 and 180)
      if (tY > 180) tY = 180
      if (tY < 0) tY = 0

      // Apply the angle
      obj.style.transform = `rotateX(${-tY}deg) rotateY(${tX}deg)`
    }

    let rotationActive = true
    let rotationAngle = 0
    let rotationSpeed = 0
    let animationId: number | null = null

    function playSpin(yes: boolean) {
      rotationActive = yes
      if (yes && !animationId) {
        const rotateCarousel = () => {
          if (rotationActive) {
            rotationAngle += rotationSpeed
            if (rotationAngle >= 360) rotationAngle = 0
            ospin.style.transform = `rotateX(-5deg) rotateY(${rotationAngle}deg)`
            
            // Update panel visibility and scaling based on front position
            updatePanelVisibility()
            
            animationId = requestAnimationFrame(rotateCarousel)
          } else {
            animationId = null
          }
        }
        animationId = requestAnimationFrame(rotateCarousel)
      }
    }

    function updatePanelVisibility() {
      let frontPanelIndex = -1
      let minDistance = Infinity
      
      // Find the panel closest to the front (0 degrees)
      for (let i = 0; i < panelArray.length; i++) {
        const panel = panelArray[i] as HTMLElement
        const angle = (i * 360) / totalPanels
        const currentPanelAngle = (angle + rotationAngle) % 360
        const normalizedAngle = ((currentPanelAngle % 360) + 360) % 360
        
        // Calculate distance from front (0 degrees)
        const distance = Math.min(normalizedAngle, 360 - normalizedAngle)
        
        if (distance < minDistance) {
          minDistance = distance
          frontPanelIndex = i
        }
      }
      
      // Update all panels
      for (let i = 0; i < panelArray.length; i++) {
        const panel = panelArray[i] as HTMLElement
        const angle = (i * 360) / totalPanels
        const currentPanelAngle = (angle + rotationAngle) % 360
        const frontBack = Math.cos(currentPanelAngle * Math.PI / 180)
        
        if (i === frontPanelIndex) {
          // Only the front panel is big and bold
          panel.style.opacity = '1'
          panel.style.transform = `rotateY(${angle}deg) translateZ(${radius}px) scale(1.4)`
          panel.style.zIndex = '20'
          panel.style.transition = 'all 0.6s ease'
          panel.style.fontWeight = 'bold'
        } else {
          // All other panels are normal
          const opacity = 0.3 + Math.abs(frontBack) * 0.7
          const scale = 0.8 + Math.abs(frontBack) * 0.2
          
          panel.style.opacity = opacity.toString()
          panel.style.transform = `rotateY(${angle}deg) translateZ(${radius}px) scale(${scale})`
          panel.style.zIndex = '1'
          panel.style.transition = 'all 0.6s ease'
          panel.style.fontWeight = 'normal'
        }
      }
    }

    let sX: number, sY: number, nX: number, nY: number
    let desX = 0, desY = 0, tX = 0, tY = 10

            // Initialize after delay
            setTimeout(() => {
              console.log('Initializing carousel panels...', panelArray.length)
              initPanels()
              setIsInitialized(true)
              
              // Start auto rotation
              startAutoRotate()
            }, 1000)

    // Setup events
    let isDragging = false
    let lastMouseX = 0
    let dragStartAngle = 0

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      isDragging = true
      lastMouseX = e.clientX
      dragStartAngle = rotationAngle
      playSpin(false) // Pause rotation during interaction
      
      // Prevent text selection
      document.body.style.userSelect = 'none'
      document.body.style.webkitUserSelect = 'none'
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      e.preventDefault()
      e.stopPropagation()
      
      const deltaX = e.clientX - lastMouseX
      const newAngle = dragStartAngle + (deltaX * 0.5)
      
      // Normalize angle
      let normalizedAngle = newAngle
      if (normalizedAngle >= 360) normalizedAngle = normalizedAngle % 360
      if (normalizedAngle < 0) normalizedAngle = 360 + (normalizedAngle % 360)
      
      // Update rotation angle
      rotationAngle = normalizedAngle
      
      // Update carousel rotation
      ospin.style.transform = `rotateX(-5deg) rotateY(${rotationAngle}deg)`
      updatePanelVisibility()
    }

    const handleMouseUp = () => {
      isDragging = false
      playSpin(true) // Resume auto rotation
      
      // Restore text selection
      document.body.style.userSelect = ''
      document.body.style.webkitUserSelect = ''
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const delta = e.deltaY
      rotationAngle += delta * 0.5
      
      // Normalize angle
      if (rotationAngle >= 360) rotationAngle = rotationAngle % 360
      if (rotationAngle < 0) rotationAngle = 360 + (rotationAngle % 360)
      
      ospin.style.transform = `rotateX(-5deg) rotateY(${rotationAngle}deg)`
      updatePanelVisibility()
    }

    // Add event listeners
    odrag.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    odrag.addEventListener('wheel', handleWheel)
    
    // Add touch support for mobile
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault()
      isDragging = true
      lastMouseX = e.touches[0].clientX
      dragStartAngle = rotationAngle
      playSpin(false)
    }
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return
      e.preventDefault()
      
      const deltaX = e.touches[0].clientX - lastMouseX
      const newAngle = dragStartAngle + (deltaX * 0.5)
      
      // Normalize angle
      let normalizedAngle = newAngle
      if (normalizedAngle >= 360) normalizedAngle = normalizedAngle % 360
      if (normalizedAngle < 0) normalizedAngle = 360 + (normalizedAngle % 360)
      
      // Update rotation angle
      rotationAngle = normalizedAngle
      
      ospin.style.transform = `rotateX(-5deg) rotateY(${rotationAngle}deg)`
      updatePanelVisibility()
    }
    
    const handleTouchEnd = () => {
      isDragging = false
      playSpin(true)
    }
    
    odrag.addEventListener('touchstart', handleTouchStart)
    odrag.addEventListener('touchmove', handleTouchMove)
    odrag.addEventListener('touchend', handleTouchEnd)

    return () => {
      odrag.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      odrag.removeEventListener('wheel', handleWheel)
      odrag.removeEventListener('touchstart', handleTouchStart)
      odrag.removeEventListener('touchmove', handleTouchMove)
      odrag.removeEventListener('touchend', handleTouchEnd)
      if (odrag.timer) clearInterval(odrag.timer)
      if (animationId) {
        cancelAnimationFrame(animationId)
        animationId = null
      }
      clearAutoRotate()
    }
  }, [isMounted, isInitialized])

  if (!isMounted) {
    return (
      <SectionWrapper id="portfolio" orientation="landscape" className="relative">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-pixel text-2xl mb-4 text-center text-pixel-green">PROJECT & PORTFOLIO GALLERY</h2>
            <p className="text-center text-pixel-blue/70 text-sm mb-8 font-pixel">
              LOADING CAROUSEL...
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
          <h2 className="font-pixel text-2xl mb-4 text-center text-pixel-green">PROJECT & PORTFOLIO GALLERY</h2>
          <p className="text-center text-pixel-blue/70 text-sm mb-8 font-pixel">
            USE BUTTONS TO ROTATE • CLICK PANELS FOR DETAILS
          </p>
          
                  {/* 3D Carousel Container */}
                  <div className="carousel-3d-container relative">
                    {/* Navigation Buttons */}
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                      <PixelBorder className="p-2">
                        <button
                          onClick={() => rotateCarousel('left')}
                          disabled={isRotating}
                          className="carousel-nav-btn p-3 rounded-full bg-modern-darker/80 text-pixel-green hover:bg-pixel-green hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                          aria-label="Previous project"
                        >
                          <motion.div
                            animate={isRotating ? { rotate: -10 } : { rotate: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronLeft size={24} />
                          </motion.div>
                        </button>
                      </PixelBorder>
                    </div>
                    
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
                      <PixelBorder className="p-2">
                        <button
                          onClick={() => rotateCarousel('right')}
                          disabled={isRotating}
                          className="carousel-nav-btn p-3 rounded-full bg-modern-darker/80 text-pixel-green hover:bg-pixel-green hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                          aria-label="Next project"
                        >
                          <motion.div
                            animate={isRotating ? { rotate: 10 } : { rotate: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRight size={24} />
                          </motion.div>
                        </button>
                      </PixelBorder>
                    </div>

                    <div 
                      ref={dragContainerRef}
                      id="drag-container"
                      className="drag-container select-none"
                      style={{ 
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        MozUserSelect: 'none',
                        msUserSelect: 'none'
                      }}
                    >
              <div 
                ref={spinContainerRef}
                id="spin-container"
                className="spin-container"
              >
                        {projects.map((project, index) => (
                          <div
                            key={project.id}
                            className="carousel-panel select-none"
                            onClick={() => setSelectedProject(project.id)}
                            style={{
                              userSelect: 'none',
                              WebkitUserSelect: 'none',
                              MozUserSelect: 'none',
                              msUserSelect: 'none'
                            }}
                          >
                    <div className="panel-content">
                      <div className="panel-image">
                        <img
                          src={project.image}
                          alt={project.title}
                        />
                      </div>
                      <div className="panel-overlay">
                        <h3 className="panel-title">{project.title}</h3>
                        <span className="panel-category">
                          {project.category === 'design' && 'Graphic Design'}
                          {project.category === 'data' && 'Data Analysis'}
                          {project.category === 'ui' && 'UI/UX Design'}
                          {project.category === 'web' && 'Web Development'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                
                        {/* Text at center of ground */}
                        <p className="center-text">3D PROJECT CAROUSEL</p>
                      </div>
                      <div id="ground" className="ground"></div>
                    </div>
                    
                    {/* Bottom Navigation */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex gap-4">
                      <PixelBorder className="p-1">
                        <motion.button
                          onClick={() => rotateCarousel('left')}
                          disabled={isRotating}
                          className="carousel-nav-btn px-4 py-2 rounded bg-modern-darker/80 text-pixel-green hover:bg-pixel-green hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-pixel text-sm"
                          aria-label="Previous project"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          animate={isRotating ? { x: -5 } : { x: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          ← PREV
                        </motion.button>
                      </PixelBorder>
                      
                      <PixelBorder className="p-1">
                        <button
                          onClick={() => {
                            setAutoRotate(!autoRotate)
                            if (autoRotate) {
                              clearAutoRotate()
                            } else {
                              startAutoRotate()
                            }
                          }}
                          className="carousel-nav-btn px-4 py-2 rounded bg-modern-darker/80 text-pixel-green hover:bg-pixel-green hover:text-black transition-all duration-300 font-pixel text-sm flex items-center gap-2"
                          aria-label={autoRotate ? "Pause auto-rotate" : "Start auto-rotate"}
                        >
                          {autoRotate ? <Pause size={16} /> : <Play size={16} />}
                          {autoRotate ? 'PAUSE' : 'PLAY'}
                        </button>
                      </PixelBorder>
                      
                      <PixelBorder className="p-1">
                        <motion.button
                          onClick={() => rotateCarousel('right')}
                          disabled={isRotating}
                          className="carousel-nav-btn px-4 py-2 rounded bg-modern-darker/80 text-pixel-green hover:bg-pixel-green hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-pixel text-sm"
                          aria-label="Next project"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          animate={isRotating ? { x: 5 } : { x: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          NEXT →
                        </motion.button>
                      </PixelBorder>
                    </div>
                  </div>
        </motion.div>
      </div>
      
      {/* Project Modal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: selectedProject ? 1 : 0 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
        onClick={() => setSelectedProject(null)}
        style={{ display: selectedProject ? 'flex' : 'none' }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: selectedProject ? 1 : 0.9, opacity: selectedProject ? 1 : 0 }}
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
          ))}
        </motion.div>
      </motion.div>
    </SectionWrapper>
  )
}

export default Projects3DCarousel
