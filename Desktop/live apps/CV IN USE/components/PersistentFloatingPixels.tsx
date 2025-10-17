'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const PersistentFloatingPixels = () => {
  const [pixels, setPixels] = useState<Array<{
    id: number
    x: number
    y: number
    size: number
    color: string
    speed: number
    delay: number
    direction: 'up' | 'down' | 'left' | 'right' | 'diagonal'
    opacity: number
  }>>([])

  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 2000], [0.3, 0.1])
  
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const generatePixels = () => {
      const newPixels: Array<{
        id: number
        x: number
        y: number
        size: number
        color: string
        speed: number
        delay: number
        direction: 'up' | 'down' | 'left' | 'right' | 'diagonal'
        opacity: number
      }> = []

      const colors = [
        '#00FF9D', '#00BFFF', '#BA68C8', '#FF69B4', '#FFD700', '#8B7355',
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD',
        '#C9A96E', '#8B4513', '#2F4F4F', '#800080', '#FF1493', '#00CED1'
      ]
      
      const directions: Array<'up' | 'down' | 'left' | 'right' | 'diagonal'> = 
        ['up', 'down', 'left', 'right', 'diagonal']
      
      const sizes = [1, 1.5, 2, 2.5, 3, 4]
      const speeds = [20, 25, 30, 35, 40, 45, 50]

      const mysticalSymbols = ['★', '☆', '✦', '✧', '✩', '✪', '✫', '✬', '✭', '✮', '✯', '✰', '◊', '◈', '◉', '∑', '∏', '∫', '∂', '∇', '∞', '±', '×', '÷', '√', '∆', 'Ω', 'π', 'φ', 'λ', 'μ', 'σ', 'τ', 'α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ']

      for (let i = 0; i < 80; i++) {
        const direction = directions[Math.floor(Math.random() * directions.length)]
        let x, y
        
        // Position pixels based on direction
        switch (direction) {
          case 'up':
            x = Math.random() * 100
            y = 100 + Math.random() * 20
            break
          case 'down':
            x = Math.random() * 100
            y = -20 + Math.random() * 20
            break
          case 'left':
            x = 100 + Math.random() * 20
            y = Math.random() * 100
            break
          case 'right':
            x = -20 + Math.random() * 20
            y = Math.random() * 100
            break
          case 'diagonal':
            x = Math.random() * 100
            y = Math.random() * 100
            break
        }
        
        newPixels.push({
          id: i,
          x,
          y,
          size: sizes[Math.floor(Math.random() * sizes.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: speeds[Math.floor(Math.random() * speeds.length)],
          delay: Math.random() * 10,
          direction,
          opacity: 1 // Start with opacity 1 for immediate visibility
        })
      }

      setPixels(newPixels)
    }

    const fadeInPixels = () => {
      setPixels(prev => prev.map(pixel => ({ ...pixel, opacity: 1 })))
    }

    const fadeOutPixels = () => {
      setPixels(prev => prev.map(pixel => ({ ...pixel, opacity: 0 })))
    }

    generatePixels()

    // Regenerate pixels every 15 seconds with smooth transition
    const interval = setInterval(() => {
      fadeOutPixels()
      setTimeout(() => {
        generatePixels()
        setTimeout(fadeInPixels, 200) // Fade in new pixels
      }, 800) // Wait for fade out to complete
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  if (!isMounted) {
    return null
  }

  const getAnimationProps = (pixel: any) => {
    const baseProps = {
      opacity: pixel.opacity,
      scale: [0.5, 0.8, 1, 0.8, 0.5],
      transition: {
        duration: pixel.speed,
        delay: pixel.delay,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "loop" as const
      }
    }

    switch (pixel.direction) {
      case 'up':
        return {
          ...baseProps,
          y: [0, -100, -200, -300, -400],
          x: [0, Math.random() * 20 - 10, Math.random() * 40 - 20, Math.random() * 20 - 10, 0]
        }
      case 'down':
        return {
          ...baseProps,
          y: [0, 100, 200, 300, 400],
          x: [0, Math.random() * 20 - 10, Math.random() * 40 - 20, Math.random() * 20 - 10, 0]
        }
      case 'left':
        return {
          ...baseProps,
          x: [0, -100, -200, -300, -400],
          y: [0, Math.random() * 20 - 10, Math.random() * 40 - 20, Math.random() * 20 - 10, 0]
        }
      case 'right':
        return {
          ...baseProps,
          x: [0, 100, 200, 300, 400],
          y: [0, Math.random() * 20 - 10, Math.random() * 40 - 20, Math.random() * 20 - 10, 0]
        }
      case 'diagonal':
        return {
          ...baseProps,
          x: [0, Math.random() * 200 - 100, Math.random() * 400 - 200, Math.random() * 200 - 100, 0],
          y: [0, Math.random() * 200 - 100, Math.random() * 400 - 200, Math.random() * 200 - 100, 0]
        }
      default:
        return baseProps
    }
  }

  return (
    <motion.div 
      className="fixed inset-0 pointer-events-none overflow-hidden z-10"
      style={{ opacity }}
    >
      {pixels.map((pixel) => {
        const animationProps = getAnimationProps(pixel)
        
        return (
          <motion.div
            key={pixel.id}
            className="absolute rounded-full"
            style={{
              position: 'absolute',
              left: `${pixel.x}%`,
              top: `${pixel.y}%`,
              width: `${pixel.size}px`,
              height: `${pixel.size}px`,
              backgroundColor: pixel.color,
              boxShadow: `0 0 ${pixel.size * 2}px ${pixel.color}`,
              filter: 'blur(0.5px)',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
            initial={{ 
              opacity: 0.1,
              scale: 0.5,
              x: 0,
              y: 0
            }}
            animate={animationProps}
          />
        )
      })}
      
      {/* Additional subtle particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={`subtle-${i}`}
          className="absolute w-0.5 h-0.5 bg-pixel-green rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 0.3, 0, 0.2, 0],
            scale: [0.5, 1, 0.5, 0.8, 0.5],
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.div>
  )
}

export default PersistentFloatingPixels
