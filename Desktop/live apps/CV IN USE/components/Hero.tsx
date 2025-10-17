'use client'

import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollAnimation, useParallax } from '../hooks/useScrollAnimation'
import { FileDown, MailIcon } from 'lucide-react'
import PixelBorder from './ui/PixelBorder'
import { userInfo } from '../data/userData'
import { useDisintegrationEffect } from '../hooks/useDisintegrationEffect'

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()
  
  // Enhanced parallax transforms with scroll animation
  const scrollAnimation = useScrollAnimation({
    threshold: 0.1,
    offset: ['start end', 'end start'],
    springConfig: { stiffness: 100, damping: 30, mass: 0.8 }
  })
  
  const parallax1 = useParallax(0.3)
  const parallax2 = useParallax(0.2)
  const parallax3 = useParallax(0.1)
  
  const y1 = useTransform(scrollY, [0, 500], [0, -150])
  const y2 = useTransform(scrollY, [0, 500], [0, -100])
  const y3 = useTransform(scrollY, [0, 500], [0, -50])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 1.05])
  const rotate = useTransform(scrollY, [0, 500], [0, 2])
  const blur = useTransform(scrollY, [0, 300], [0, 2])

  // Disintegration effect for text
  const {
    elementRef: titleRef,
    isDisintegrating: titleDisintegrating,
    particles: titleParticles,
    createParticleStyle: createTitleParticleStyle
  } = useDisintegrationEffect({ threshold: 0.3, particleCount: 20, duration: 1500 })

  const {
    elementRef: subtitleRef,
    isDisintegrating: subtitleDisintegrating,
    particles: subtitleParticles,
    createParticleStyle: createSubtitleParticleStyle
  } = useDisintegrationEffect({ threshold: 0.3, particleCount: 15, duration: 1400 })

  const {
    elementRef: descriptionRef,
    isDisintegrating: descriptionDisintegrating,
    particles: descriptionParticles,
    createParticleStyle: createDescriptionParticleStyle
  } = useDisintegrationEffect({ threshold: 0.3, particleCount: 12, duration: 1200 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

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
  }

  return (
    <section 
      id="hero" 
      className="relative min-h-screen pt-24 flex flex-col justify-center overflow-hidden"
    >
      {/* Parallax background layers */}
      <div className="absolute inset-0 -z-10">
        {/* Layer 1 - Far background */}
        <motion.div
          style={{ y: y1, ...parallax1 }}
          className="absolute inset-0 bg-gradient-to-br from-modern-purple/20 via-transparent to-modern-blue/20"
        />
        
        {/* Layer 2 - Mid background */}
        <motion.div
          style={{ y: y2, ...parallax2 }}
          className="absolute inset-0"
        >
          <motion.div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-pixel-green/10 rounded-full blur-3xl"
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pixel-blue/10 rounded-full blur-3xl"
            style={{
              transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.25, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          
          {/* Floating particles */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-pixel-green/30 rounded-full"
              style={{
                left: `${15 + (i * 7)}%`,
                top: `${20 + (i * 6)}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                y: [0, -30, 0],
                x: [0, 15, 0],
                opacity: [0, 0.3, 0.8, 0.3, 0],
                scale: [0, 0.5, 1.5, 0.5, 0],
              }}
              transition={{
                duration: 6 + i * 0.5,
                repeat: Infinity,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: i * 0.3,
                repeatDelay: 2
              }}
            />
          ))}
        </motion.div>
        
        {/* Layer 3 - Close background */}
        <motion.div
          style={{ y: y3, ...parallax3 }}
          className="absolute inset-0"
        >
          <motion.div 
            className="absolute top-1/3 right-1/3 w-64 h-64 bg-pixel-purple/10 rounded-full blur-2xl"
            style={{
              transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          
          {/* Ambient light rays */}
          <motion.div
            className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-pixel-green/20 to-transparent"
            animate={{
              opacity: [0, 1, 0],
              scaleY: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-pixel-blue/20 to-transparent"
            animate={{
              opacity: [0, 1, 0],
              scaleY: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          />
          <motion.div
            className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-pixel-purple/15 to-transparent"
            animate={{
              opacity: [0, 1, 0],
              scaleY: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5
            }}
          />
        </motion.div>
      </div>

      <motion.div 
        ref={scrollAnimation.ref}
        style={{ 
          opacity, 
          scale, 
          rotate,
          filter: `blur(${blur}px)`,
          ...scrollAnimation.transforms
        }}
        className="container mx-auto px-4 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <PixelBorder className="inline-block px-4 py-2 mb-4" hover={false}>
              <span className="font-pixel text-xs text-pixel-green">username: {userInfo.name}</span>
            </PixelBorder>
            
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                      <motion.span 
                        ref={titleRef}
                        className={`block relative group fluid-text ${titleDisintegrating ? 'disintegrate-text disintegrate-fade' : ''}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.8, 
                          delay: 0.4,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                        whileHover={{ 
                          scale: 1.05,
                          textShadow: "0 0 30px currentColor",
                          y: -2,
                          rotateX: 5,
                          rotateY: 5
                        }}
                        whileTap={{ 
                          scale: 0.98,
                          rotateX: -2,
                          rotateY: -2
                        }}
                      >
                        WEB DEVELOPER
                        <motion.div
                          className="absolute -bottom-1 left-0 h-0.5 bg-pixel-green"
                          initial={{ width: 0 }}
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        />
                        {/* Disintegration particles */}
                        {titleParticles.map((particle) => (
                          <div
                            key={particle.id}
                            className="text-particle"
                            style={createTitleParticleStyle(particle)}
                          />
                        ))}
                      </motion.span>
                      <motion.span 
                        className="text-pixel-green relative fluid-text"
                        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ 
                          duration: 0.8, 
                          delay: 0.6,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                        whileHover={{ 
                          scale: 1.3,
                          rotate: 10,
                          textShadow: "0 0 25px currentColor",
                          y: -3
                        }}
                      >
                        &
                      </motion.span>
                      <motion.span 
                        ref={subtitleRef}
                        className={`block mt-2 relative group fluid-text ${subtitleDisintegrating ? 'disintegrate-text disintegrate-fade' : ''}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.8, 
                          delay: 0.8,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                        whileHover={{ 
                          scale: 1.05,
                          textShadow: "0 0 30px currentColor",
                          y: -2
                        }}
                      >
                        FinTech Specialist (ML Engineer)
                        <motion.div
                          className="absolute -bottom-1 left-0 h-0.5 bg-pixel-blue"
                          initial={{ width: 0 }}
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        />
                        {/* Disintegration particles */}
                        {subtitleParticles.map((particle) => (
                          <div
                            key={particle.id}
                            className="text-particle"
                            style={createSubtitleParticleStyle(particle)}
                          />
                        ))}
                      </motion.span>
                    </h1>
            
            <motion.p 
              ref={descriptionRef}
              className={`text-xl mb-8 text-gray-300 relative ${descriptionDisintegrating ? 'disintegrate-text disintegrate-fade' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              {userInfo.tagline}
              {/* Disintegration particles */}
              {descriptionParticles.map((particle) => (
                <div
                  key={particle.id}
                  className="text-particle"
                  style={createDescriptionParticleStyle(particle)}
                />
              ))}
            </motion.p>
            
                    <motion.div 
                      className="flex flex-col sm:flex-row gap-4"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.8, 
                        delay: 1.2,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                    >
                      <motion.div
                        whileHover={{ 
                          scale: 1.08,
                          y: -3
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ 
                          duration: 0.3,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                      >
                        <PixelBorder className="relative group fluid-hover">
                          <motion.button 
                            onClick={handleDownloadCV}
                            className="px-6 py-3 bg-pixel-green text-black font-medium flex items-center space-x-2 hover:bg-pixel-blue transition-all duration-500 relative z-10"
                            whileHover={{ 
                              textShadow: "0 0 15px currentColor",
                              scale: 1.02,
                              y: -1,
                              rotateX: 2
                            }}
                            whileTap={{ 
                              scale: 0.98,
                              y: 0
                            }}
                          >
                            <motion.div
                              whileHover={{ 
                                rotate: 360,
                                scale: 1.2
                              }}
                              transition={{ 
                                duration: 0.6,
                                ease: [0.25, 0.46, 0.45, 0.94]
                              }}
                            >
                              <FileDown size={20} />
                            </motion.div>
                            <span>Download CV</span>
                          </motion.button>
                          <motion.div
                            className="absolute inset-0 bg-pixel-green/20 rounded"
                            initial={{ scale: 0, opacity: 0 }}
                            whileHover={{ 
                              scale: 1.15, 
                              opacity: 1,
                              rotate: 2
                            }}
                            transition={{ 
                              duration: 0.4,
                              ease: [0.25, 0.46, 0.45, 0.94]
                            }}
                          />
                        </PixelBorder>
                      </motion.div>
                      
                      <motion.div
                        whileHover={{ 
                          scale: 1.08,
                          y: -3
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ 
                          duration: 0.3,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                      >
                        <PixelBorder border="border-2 border-pixel-green" className="relative group fluid-hover">
                          <motion.button 
                            className="px-6 py-3 bg-transparent text-pixel-green font-medium flex items-center space-x-2 hover:bg-pixel-green hover:text-black transition-all duration-500 relative z-10"
                            onClick={() => {
                              const contactSection = document.getElementById('contact')
                              if (contactSection) {
                                contactSection.scrollIntoView({ behavior: 'smooth' })
                              }
                            }}
                            whileHover={{ 
                              textShadow: "0 0 15px currentColor",
                              scale: 1.02,
                              y: -1,
                              rotateX: 2
                            }}
                            whileTap={{ 
                              scale: 0.98,
                              y: 0
                            }}
                          >
                            <motion.div
                              whileHover={{ 
                                rotate: 360,
                                scale: 1.2
                              }}
                              transition={{ 
                                duration: 0.6,
                                ease: [0.25, 0.46, 0.45, 0.94]
                              }}
                            >
                              <MailIcon size={20} />
                            </motion.div>
                            <span>Contact Me</span>
                          </motion.button>
                          <motion.div
                            className="absolute inset-0 bg-pixel-green/10 rounded"
                            initial={{ scale: 0, opacity: 0 }}
                            whileHover={{ 
                              scale: 1.15, 
                              opacity: 1,
                              rotate: -2
                            }}
                            transition={{ 
                              duration: 0.4,
                              ease: [0.25, 0.46, 0.45, 0.94]
                            }}
                          />
                        </PixelBorder>
                      </motion.div>
                    </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <PixelBorder className="p-4 md:p-6" hover={false}>
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-modern-purple/30 to-modern-blue/30 rounded-full"></div>
                
                {/* Avatar with parallax effect */}
                <motion.div 
                  className="absolute inset-0 flex justify-center items-center"
                  style={{
                    transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
                  }}
                >
                  <div className="w-56 h-56 md:w-72 md:h-72 bg-gradient-to-br from-modern-purple to-modern-blue rounded-full flex items-center justify-center">
                    <span className="text-8xl">🧙🏾‍♂️</span>
                  </div>
                </motion.div>
                
                {/* Atomic Orbital System - Centered Intersection */}
                

                {/* X-Axis Orbit (Horizontal) - Centered */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  animate={{ rotateX: 360 }}
                  transition={{ 
                    duration: 15, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Art Palette - X-Axis */}
                  <motion.div 
                    className="absolute -top-48 -right-48 avatar-element art-icon"
                    style={{
                      transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px) rotateX(-360deg)`,
                    }}
                    animate={{ 
                      rotateX: -360,
                      transition: { 
                        duration: 15, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }
                    }}
                    whileHover={{ scale: 1.3 }}
                  >
                    <PixelBorder className="p-2 bg-modern-darker hover:bg-pixel-green/20">
                      <span className="text-2xl">🎨</span>
                    </PixelBorder>
                  </motion.div>
                  
                  {/* Money Bag - X-Axis */}
                  <motion.div
                    className="absolute -bottom-48 -left-48 avatar-element money-icon"
                    style={{
                      transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px) rotateX(-360deg)`,
                    }}
                    animate={{ 
                      rotateX: -360,
                      transition: { 
                        duration: 15, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }
                    }}
                    whileHover={{ scale: 1.3 }}
                  >
                    <PixelBorder className="p-2 bg-modern-darker hover:bg-pixel-gold/20">
                      <span className="text-2xl">💰</span>
                    </PixelBorder>
                  </motion.div>
                </motion.div>

                {/* Y-Axis Orbit (Vertical) - Centered */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  animate={{ rotateY: 360 }}
                  transition={{ 
                    duration: 22, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Laptop - Y-Axis */}
                  <motion.div 
                    className="absolute -top-48 -left-48 avatar-element tech-icon"
                    style={{
                      transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px) rotateY(-360deg)`,
                    }}
                    animate={{ 
                      rotateY: -360,
                      transition: { 
                        duration: 22, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }
                    }}
                    whileHover={{ scale: 1.3 }}
                  >
                    <PixelBorder className="p-2 bg-modern-darker hover:bg-pixel-blue/20">
                      <span className="text-2xl">💻</span>
                    </PixelBorder>
                  </motion.div>

                  {/* Brain - Y-Axis */}
                  <motion.div 
                    className="absolute -bottom-48 -right-48 avatar-element brain-icon"
                    style={{
                      transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px) rotateY(-360deg)`,
                    }}
                    animate={{ 
                      rotateY: -360,
                      transition: { 
                        duration: 22, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }
                    }}
                    whileHover={{ scale: 1.3 }}
                  >
                    <PixelBorder className="p-2 bg-modern-darker hover:bg-pixel-purple/20">
                      <span className="text-2xl">🧠</span>
                    </PixelBorder>
                  </motion.div>
                </motion.div>

                {/* Z-Axis Orbit (Depth) - Centered */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  animate={{ rotateZ: 360 }}
                  transition={{ 
                    duration: 18, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Paint Brush - Z-Axis */}
                  <motion.div 
                    className="absolute -left-60 top-0 avatar-element art-icon"
                    style={{
                      transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px) rotateZ(-360deg)`,
                    }}
                    animate={{ 
                      rotateZ: -360,
                      transition: { 
                        duration: 18, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }
                    }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <PixelBorder className="p-2 bg-modern-darker/70 hover:bg-pixel-green/15">
                      <span className="text-xl">🖌️</span>
                    </PixelBorder>
                  </motion.div>

                  {/* Credit Card - Z-Axis */}
                  <motion.div 
                    className="absolute -right-60 top-0 avatar-element finance-icon"
                    style={{
                      transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px) rotateZ(-360deg)`,
                    }}
                    animate={{ 
                      rotateZ: -360,
                      transition: { 
                        duration: 18, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }
                    }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <PixelBorder className="p-2 bg-modern-darker/70 hover:bg-pixel-gold/15">
                      <span className="text-xl">💳</span>
                    </PixelBorder>
                  </motion.div>
                </motion.div>

                {/* Diagonal Orbit (45-degree axis) - Centered */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 28, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  style={{ 
                    transformStyle: "preserve-3d",
                    transform: "rotateX(45deg) rotateY(45deg)"
                  }}
                >
                  {/* Server - Diagonal */}
                  <motion.div 
                    className="absolute -top-60 left-0 avatar-element tech-icon"
                    style={{
                      transform: `translate(${mousePosition.x * 0.005}px, ${mousePosition.y * 0.005}px) rotate(-360deg)`,
                    }}
                    animate={{ 
                      rotate: -360,
                      transition: { 
                        duration: 28, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }
                    }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <PixelBorder className="p-2 bg-modern-darker/60 hover:bg-pixel-blue/10">
                      <span className="text-xl">🖥️</span>
                    </PixelBorder>
                  </motion.div>

                  {/* Calculator - Diagonal */}
                  <motion.div 
                    className="absolute -bottom-60 left-0 avatar-element data-icon"
                    style={{
                      transform: `translate(${mousePosition.x * -0.005}px, ${mousePosition.y * -0.005}px) rotate(-360deg)`,
                    }}
                    animate={{ 
                      rotate: -360,
                      transition: { 
                        duration: 28, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }
                    }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <PixelBorder className="p-2 bg-modern-darker/60 hover:bg-pixel-purple/10">
                      <span className="text-xl">🧮</span>
                    </PixelBorder>
                  </motion.div>
                </motion.div>

                {/* Additional Atomic Electrons - Centered */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 32, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  style={{ 
                    transformStyle: "preserve-3d",
                    transform: "rotateX(30deg) rotateZ(60deg)"
                  }}
                >
                  {/* Smartphone - Electron */}
                  <motion.div 
                    className="absolute -left-36 -top-36 avatar-element tech-icon"
                    style={{
                      transform: `translate(${mousePosition.x * -0.012}px, ${mousePosition.y * -0.012}px) rotate(-360deg)`,
                    }}
                    animate={{ 
                      rotate: -360,
                      transition: { 
                        duration: 32, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <PixelBorder className="p-1.5 bg-modern-darker/50 hover:bg-pixel-blue/10">
                      <span className="text-lg">📱</span>
                    </PixelBorder>
                  </motion.div>

                  {/* Chart - Electron */}
                  <motion.div 
                    className="absolute -right-36 -bottom-36 avatar-element data-icon"
                    style={{
                      transform: `translate(${mousePosition.x * 0.012}px, ${mousePosition.y * 0.012}px) rotate(-360deg)`,
                    }}
                    animate={{ 
                      rotate: -360,
                      transition: { 
                        duration: 32, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <PixelBorder className="p-1.5 bg-modern-darker/50 hover:bg-pixel-gold/10">
                      <span className="text-lg">📊</span>
                    </PixelBorder>
                  </motion.div>

                  {/* Camera - Electron */}
                  <motion.div 
                    className="absolute -left-36 -bottom-36 avatar-element art-icon"
                    style={{
                      transform: `translate(${mousePosition.x * -0.008}px, ${mousePosition.y * 0.008}px) rotate(-360deg)`,
                    }}
                    animate={{ 
                      rotate: -360,
                      transition: { 
                        duration: 32, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <PixelBorder className="p-1.5 bg-modern-darker/50 hover:bg-pixel-green/10">
                      <span className="text-lg">📷</span>
                    </PixelBorder>
                  </motion.div>

                  {/* Database - Electron */}
                  <motion.div 
                    className="absolute -right-36 -top-36 avatar-element data-icon"
                    style={{
                      transform: `translate(${mousePosition.x * 0.008}px, ${mousePosition.y * -0.008}px) rotate(-360deg)`,
                    }}
                    animate={{ 
                      rotate: -360,
                      transition: { 
                        duration: 32, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <PixelBorder className="p-1.5 bg-modern-darker/50 hover:bg-pixel-purple/10">
                      <span className="text-lg">🗄️</span>
                    </PixelBorder>
                  </motion.div>
                </motion.div>
              </div>
            </PixelBorder>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero