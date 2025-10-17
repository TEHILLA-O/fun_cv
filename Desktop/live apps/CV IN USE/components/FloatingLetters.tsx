'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const FloatingLetters = () => {
  const [letters, setLetters] = useState<Array<{
    id: number
    letter: string
    x: number
    y: number
    delay: number
    size: number
    speed: number
    color: string
    opacity: number
  }>>([])

  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 2000], [1, 0])
  
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const mysteriousLetters = [
      // Greek letters
      'Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ζ', 'Η', 'Θ', 'Ι', 'Κ', 'Λ', 'Μ', 'Ν', 'Ξ', 'Ο', 'Π', 'Ρ', 'Σ', 'Τ', 'Υ', 'Φ', 'Χ', 'Ψ', 'Ω',
      'α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ', 'ι', 'κ', 'λ', 'μ', 'ν', 'ξ', 'ο', 'π', 'ρ', 'σ', 'τ', 'υ', 'φ', 'χ', 'ψ', 'ω',
      // Latin letters (mysterious/arcane)
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      // Mathematical symbols
      '∑', '∏', '∫', '∂', '∇', '∞', '±', '×', '÷', '√', '∆', 'Ω', 'π', 'φ', 'λ', 'μ', 'σ', 'τ', 'α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ',
      // Alchemical symbols
      '☉', '☽', '♂', '♀', '♃', '♄', '♅', '♆', '♇', '☿', '♁', '⚷', '⚸', '⚹', '⚺', '⚻', '⚼', '⚽', '⚾', '⚿',
      // Runic letters
      'ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛇ', 'ᛈ', 'ᛉ', 'ᛊ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛜ', 'ᛝ', 'ᛟ', 'ᛞ', 'ᛠ',
      // Ancient symbols
      '◊', '◈', '◉', '◊', '◈', '◉', '◊', '◈', '◉', '◊', '◈', '◉', '◊', '◈', '◉', '◊', '◈', '◉', '◊', '◈', '◉', '◊', '◈', '◉', '◊', '◈', '◉',
      // Mystical characters
      '★', '☆', '✦', '✧', '✩', '✪', '✫', '✬', '✭', '✮', '✯', '✰', '✱', '✲', '✳', '✴', '✵', '✶', '✷', '✸', '✹', '✺', '✻', '✼', '✽', '✾', '✿', '❀', '❁', '❂', '❃', '❄', '❅', '❆', '❇', '❈', '❉', '❊', '❋'
    ]
    
    const generateLetters = () => {
      const newLetters: Array<{
        id: number
        letter: string
        x: number
        y: number
        delay: number
        size: number
        speed: number
        color: string
        opacity: number
      }> = []

      const colors = ['#00FF9D', '#00BFFF', '#BA68C8', '#FF69B4', '#FFD700', '#8B7355', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD']
      const sizes = [0.8, 1, 1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.4, 2.6]
      const speeds = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28]

      for (let i = 0; i < 180; i++) {
        const letter = mysteriousLetters[Math.floor(Math.random() * mysteriousLetters.length)]
        
        const x = Math.random() * 100
        const y = Math.random() * 100
        
        newLetters.push({
          id: i,
          letter,
          x,
          y,
          delay: Math.random() * 12,
          size: sizes[Math.floor(Math.random() * sizes.length)],
          speed: speeds[Math.floor(Math.random() * speeds.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: 1, // Start with opacity 1 for immediate visibility
        })
      }

      setLetters(newLetters)
    }

    const fadeInLetters = () => {
      setLetters(prev => prev.map(letter => ({ ...letter, opacity: 1 })))
    }

    const fadeOutLetters = () => {
      setLetters(prev => prev.map(letter => ({ ...letter, opacity: 0 })))
    }

    generateLetters()

    // Regenerate letters every 15 seconds with smooth transition
    const interval = setInterval(() => {
      fadeOutLetters()
      setTimeout(() => {
        generateLetters()
        setTimeout(fadeInLetters, 200) // Fade in new letters
      }, 1000) // Wait for fade out to complete
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <motion.div 
      className="fixed inset-0 pointer-events-none overflow-hidden z-10"
      style={{ opacity }}
    >
      {letters.map((letterData) => (
        <motion.div
          key={letterData.id}
          className="floating-letter"
          style={{
            position: 'absolute',
            left: `${letterData.x}%`,
            top: `${letterData.y}%`,
            fontSize: `${letterData.size}rem`,
            color: letterData.color,
            zIndex: Math.floor(letterData.size * 10),
            pointerEvents: 'none',
            userSelect: 'none',
          }}
          initial={{ opacity: 0, y: 0, rotate: 0, scale: 0.5 }}
          animate={{
            opacity: letterData.opacity,
            y: [0, -30, -60, -90, -60, -30, 0],
            rotate: [0, 8, 15, 8, 0, -8, 0],
            scale: [0.6, 0.9, 1.2, 1.4, 1.2, 0.9, 0.6],
            x: [0, 8, 15, 8, 0, -8, 0],
          }}
                  transition={{
                    duration: letterData.speed,
                    delay: letterData.delay,
                    repeat: Infinity,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    repeatType: "loop",
                  }}
        >
          {letterData.letter}
        </motion.div>
      ))}
    </motion.div>
  )
}

export default FloatingLetters
