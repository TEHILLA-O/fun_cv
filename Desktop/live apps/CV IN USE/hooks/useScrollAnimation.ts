'use client'

import { useEffect, useRef, useState } from 'react'
import { useScroll, useTransform, useSpring } from 'framer-motion'

interface UseScrollAnimationProps {
  threshold?: number
  offset?: ("start end" | "end start")[]
  clamp?: boolean
  springConfig?: {
    stiffness?: number
    damping?: number
    mass?: number
  }
}

export const useScrollAnimation = ({
  threshold = 0.1,
  offset = ['start end', 'end start'],
  clamp = true,
  springConfig = { stiffness: 100, damping: 30, mass: 0.8 }
}: UseScrollAnimationProps = {}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
    layoutEffect: false
  })

  // Smooth spring-based transforms
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [100, -100], { clamp }),
    springConfig
  )
  
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0], { clamp }),
    springConfig
  )
  
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8], { clamp }),
    springConfig
  )
  
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15], { clamp }),
    springConfig
  )
  
  const blur = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [10, 0, 0, 10], { clamp }),
    springConfig
  )

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setIsInView(latest > threshold && latest < 1 - threshold)
    })
    
    return unsubscribe
  }, [scrollYProgress, threshold])

  return {
    ref,
    scrollYProgress,
    isInView,
    transforms: {
      y,
      opacity,
      scale,
      rotateX,
      blur: useTransform(blur, (value) => `blur(${value}px)`)
    }
  }
}

// Hook for parallax effects
export const useParallax = (speed: number = 0.5) => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, -1000 * speed])
  
  return { y }
}

// Hook for scroll-triggered visibility
export const useScrollVisibility = (threshold: number = 0.1) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setIsVisible(latest > threshold)
    })
    
    return unsubscribe
  }, [scrollYProgress, threshold])
  
  return { ref, isVisible, scrollYProgress }
}

