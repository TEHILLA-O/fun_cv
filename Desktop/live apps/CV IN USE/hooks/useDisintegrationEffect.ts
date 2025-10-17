import { useState, useEffect, useRef } from 'react'

interface DisintegrationOptions {
  threshold?: number
  particleCount?: number
  duration?: number
}

export const useDisintegrationEffect = (options: DisintegrationOptions = {}) => {
  const {
    threshold = 0.1,
    particleCount = 50,
    duration = 2000
  } = options

  const [isDisintegrating, setIsDisintegrating] = useState(false)
  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    y: number
    randomX: number
    randomY: number
    color: string
    size: number
  }>>([])
  
  const elementRef = useRef<HTMLParagraphElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (!elementRef.current) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && entry.intersectionRatio < threshold) {
            triggerDisintegration()
          }
        })
      },
      {
        threshold: threshold,
        rootMargin: '0px'
      }
    )

    observerRef.current.observe(elementRef.current)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [threshold])

  const triggerDisintegration = () => {
    if (isDisintegrating || !elementRef.current) return

    setIsDisintegrating(true)
    
    // Create particles with smoother distribution
    const newParticles = Array.from({ length: particleCount }, (_, i) => {
      const rect = elementRef.current!.getBoundingClientRect()
      const colors = ['#00ff9d', '#00bfff', '#ff69b4', '#ffd700', '#ffffff']
      
      // More controlled particle distribution
      const angle = (i / particleCount) * Math.PI * 2
      const radius = Math.random() * Math.min(rect.width, rect.height) * 0.3
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      return {
        id: i,
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        randomX: (Math.random() - 0.5) * 150,
        randomY: (Math.random() - 0.5) * 150,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 3 + 1.5
      }
    })

    setParticles(newParticles)

    // Clear particles after animation
    setTimeout(() => {
      setParticles([])
      setIsDisintegrating(false)
    }, duration)
  }

  const createParticleStyle = (particle: typeof particles[0]) => ({
    position: 'absolute' as const,
    left: `${particle.x}px`,
    top: `${particle.y}px`,
    width: `${particle.size}px`,
    height: `${particle.size}px`,
    backgroundColor: particle.color,
    borderRadius: '50%',
    pointerEvents: 'none' as const,
    zIndex: 10,
    '--random-x': `${particle.randomX}px`,
    '--random-y': `${particle.randomY}px`
  } as React.CSSProperties)

  return {
    elementRef,
    isDisintegrating,
    particles,
    createParticleStyle,
    triggerDisintegration
  }
}
