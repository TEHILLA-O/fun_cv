'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useSpring, animated, config } from '@react-spring/web'
import SplitText from './ui/SplitText'

interface LoadingScreenProps {
  onComplete?: () => void
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('INITIALIZING...')
  const [showPixelRush, setShowPixelRush] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [pixels, setPixels] = useState<Array<{
    id: number
    x: number
    y: number
    delay: number
    color: string
  }>>([])

  // React Spring animations
  const containerSpring = useSpring({
    opacity: isComplete ? 0 : 1,
    scale: isComplete ? 0.8 : 1,
    y: isComplete ? -50 : 0,
    config: { ...config.gentle, duration: 1000 }
  })

  const progressSpring = useSpring({
    width: `${progress}%`,
    config: { ...config.slow, tension: 100, friction: 30 }
  })

  const pixelRushSpring = useSpring({
    opacity: showPixelRush ? 1 : 0,
    scale: showPixelRush ? 1 : 0.5,
    config: { ...config.wobbly, duration: 500 }
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          // Start pixel rush effect
          setShowPixelRush(true)
          generatePixels()
          setTimeout(() => {
            setIsComplete(true)
            setTimeout(() => {
              onComplete?.()
            }, 1000) // Wait for React Spring transition
          }, 2000) // Reduced time for pixel rush
          return 100
        }
        return prev + 2
      })
    }, 100)

    const textInterval = setInterval(() => {
      setLoadingText(prev => {
        switch (prev) {
          case 'INITIALIZING...':
            return 'LOADING ASSETS...'
          case 'LOADING ASSETS...':
            return 'PREPARING QUEST...'
          case 'PREPARING QUEST...':
            return 'READY FOR ADVENTURE!'
          default:
            return 'INITIALIZING...'
        }
      })
    }, 1200)

    return () => {
      clearInterval(interval)
      clearInterval(textInterval)
    }
  }, [onComplete])

  const generatePixels = () => {
    const newPixels: Array<{
      id: number
      x: number
      y: number
      delay: number
      color: string
    }> = []

    const colors = ['#00FF9D', '#00BFFF', '#BA68C8', '#FF69B4', '#FFD700', '#8B7355']
    
    for (let i = 0; i < 300; i++) {
      newPixels.push({
        id: i,
        x: Math.random() * 100,
        y: 100 + Math.random() * 30, // Start below screen
        delay: Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }
    
    setPixels(newPixels)
  }

  return (
    <animated.div
      style={containerSpring}
      className="fixed inset-0 z-50 bg-gradient-to-br from-pixel-black via-modern-darker to-pixel-black flex items-center justify-center overflow-hidden"
    >
      {/* Pixel grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
          {Array.from({ length: 400 }).map((_, i) => (
            <div key={i} className="border border-pixel-green/20" />
          ))}
        </div>
      </div>

      {/* Loading Content */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 text-center"
      >
        <SplitText
          text="LOADING SAVE"
          className="font-pixel text-4xl md:text-6xl text-pixel-green mb-2"
          delay={0.5}
          stagger={0.03}
          duration={0.6}
        />
        <SplitText
          text="PORTFOLIO QUEST"
          className="font-pixel text-sm text-pixel-blue mb-8"
          delay={1.2}
          stagger={0.02}
          duration={0.5}
        />

        {/* Loading animation */}
        <div className="w-80 mx-auto">
          {/* Progress bar container */}
          <div className="relative mb-4">
            <div className="w-full h-4 bg-modern-dark border-2 border-pixel-green rounded-none">
              <animated.div
                className="h-full bg-gradient-to-r from-pixel-green to-pixel-blue"
                style={progressSpring}
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-pixel text-xs text-pixel-green">
                {progress}%
              </span>
            </div>
          </div>

          {/* Loading text */}
          <motion.div
            key={loadingText}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <SplitText
              text={loadingText}
              className="font-pixel text-sm text-pixel-green"
              delay={0}
              stagger={0.02}
              duration={0.3}
            />
          </motion.div>

          {/* Pixel art loading animation */}
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-pixel-green"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>

        {/* RPG Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 grid grid-cols-2 gap-4 text-xs font-pixel"
        >
          <div className="text-pixel-blue">
            <SplitText
              text="LEVEL: 23"
              className="block"
              delay={1.5}
              stagger={0.03}
              duration={0.4}
            />
            <SplitText
              text="CLASS:Tech/Finance / UI Designer"
              className="block"
              delay={1.8}
              stagger={0.02}
              duration={0.4}
            />
          </div>
          <div className="text-pixel-purple">
            <SplitText
              text="XP: 2025"
              className="block"
              delay={2.1}
              stagger={0.03}
              duration={0.4}
            />
            <SplitText
              text="GOLD: ?"
              className="block"
              delay={2.4}
              stagger={0.03}
              duration={0.4}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Pixel Rush Effect */}
      {showPixelRush && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {pixels.map((pixel) => (
            <motion.div
              key={pixel.id}
              className="absolute w-2 h-2 opacity-90"
              style={{
                left: `${pixel.x}%`,
                top: `${pixel.y}%`,
                backgroundColor: pixel.color,
                boxShadow: `0 0 15px ${pixel.color}`,
              }}
              initial={{ 
                y: 0,
                opacity: 0.9,
                scale: 0.5
              }}
              animate={{ 
                y: typeof window !== 'undefined' ? -window.innerHeight - 100 : -1000,
                opacity: 0,
                scale: 1.5
              }}
              transition={{
                duration: 2.0,
                delay: pixel.delay,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Additional pixel effects */}
      {showPixelRush && (
        <div className="absolute inset-0 pointer-events-none z-15">
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={`extra-${i}`}
              className="absolute w-1 h-1 bg-pixel-green"
              style={{
                left: `${Math.random() * 100}%`,
                top: '100%',
              }}
              initial={{ 
                y: 0,
                opacity: 0.7,
                scale: 0.3
              }}
              animate={{ 
                y: typeof window !== 'undefined' ? -window.innerHeight - 50 : -1000,
                opacity: 0,
                scale: 1.2
              }}
              transition={{
                duration: 2,
                delay: Math.random() * 1.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: Math.random() * 3
              }}
            />
          ))}
        </div>
      )}

      {/* Reveal Effect Overlay */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: showPixelRush ? '-100%' : '100%' }}
        transition={{ 
          duration: 2.0,
          delay: showPixelRush ? 0.1 : 0,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-pixel-black z-30"
      />

              {/* Enhanced floating particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
                {Array.from({ length: 30 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-pixel-green"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -100],
                      x: [0, Math.random() * 20 - 10],
                      opacity: [0, 1, 0],
                      scale: [0.5, 1.5, 0.5],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 3,
                      ease: "easeInOut"
                    }}
                  />
                ))}
                
                {/* Ambient light orbs */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={`orb-${i}`}
                    className="absolute w-2 h-2 bg-pixel-blue/30 rounded-full blur-sm"
                    style={{
                      left: `${20 + (i * 10)}%`,
                      top: `${30 + (i * 8)}%`,
                    }}
                    animate={{
                      scale: [0.5, 1.5, 0.5],
                      opacity: [0.2, 0.8, 0.2],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 4 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
    </animated.div>
  )
}

export default LoadingScreen
