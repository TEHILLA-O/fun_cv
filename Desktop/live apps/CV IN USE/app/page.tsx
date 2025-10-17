'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSpring, animated, config } from '@react-spring/web'
import { LenisProvider } from '../lib/lenis-provider'
import LoadingScreen from '../components/LoadingScreen'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import CharacterSheet from '../components/CharacterSheet'
import SkillMastery from '../components/SkillMastery'
import QuestLog from '../components/QuestLog'
import TrainingLog from '../components/TrainingLog'
import Projects3DCarousel from '../components/Projects3DCarousel'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import EasterEgg from '../components/EasterEgg'
import FloatingLetters from '../components/FloatingLetters'
import PersistentFloatingPixels from '../components/PersistentFloatingPixels'
import RetroCursor from '../components/RetroCursor'
import ClientOnly from '../components/ClientOnly'
import useKonamiCode from '../hooks/useKonamiCode'
import ScrollProgress from '../components/ScrollProgress'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const [easterEggActivated, setEasterEggActivated] = useState(false)
  const [showMainContent, setShowMainContent] = useState(false)

  // React Spring animations for main content
  const mainContentSpring = useSpring({
    opacity: showMainContent ? 1 : 0,
    y: showMainContent ? 0 : 50,
    scale: showMainContent ? 1 : 0.95,
    config: { ...config.gentle, duration: 1200 }
  })
  
  // Initialize Konami code detection
  useKonamiCode(() => {
    setEasterEggActivated(true)
    setTimeout(() => setEasterEggActivated(false), 10000)
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Show loading screen on server and until mounted
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-modern-darker flex items-center justify-center">
        <div className="text-center">
          <div className="text-pixel-green font-pixel text-4xl mb-2">RPG CV</div>
          <div className="text-pixel-blue font-pixel text-sm mb-8">PORTFOLIO QUEST</div>
          <div className="w-8 h-8 border-2 border-pixel-green border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <LenisProvider>
      <ClientOnly>
        <ScrollProgress />
        <RetroCursor />
      </ClientOnly>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      
              <AnimatePresence mode="wait">
                {isLoading ? (
          <LoadingScreen key="loading" onComplete={() => {
            setIsLoading(false)
            // Delay main content appearance for smooth transition
            setTimeout(() => {
              setShowMainContent(true)
            }, 500)
          }} />
        ) : (
                  <animated.div
                    key="main"
                    style={mainContentSpring}
                    className="min-h-screen bg-gradient-to-b from-modern-dark to-modern-darker text-white font-modern page-transition"
                  >
                      <ClientOnly>
                        <FloatingLetters />
                        <PersistentFloatingPixels />
                      </ClientOnly>
                      <Navbar />
              
              <main id="main" className="container mx-auto px-4 py-8">
                <ClientOnly>
                  <Hero />
                </ClientOnly>
                <ClientOnly>
                  <CharacterSheet />
                </ClientOnly>
                <ClientOnly>
                  <SkillMastery />
                </ClientOnly>
                
                <div className="mt-16 md:flex md:gap-8">
                  <div className="md:w-1/2 mb-8 md:mb-0">
                    <ClientOnly>
                      <TrainingLog />
                    </ClientOnly>
                  </div>
                  <div className="md:w-1/2">
                    <ClientOnly>
                      <QuestLog />
                    </ClientOnly>
                  </div>
                </div>
                
                <ClientOnly>
                  <Projects3DCarousel />
                </ClientOnly>
                <ClientOnly>
                  <Contact />
                </ClientOnly>
              </main>

                      <ClientOnly>
                        <Footer />
                      </ClientOnly>
                      
                      <ClientOnly>
                        {easterEggActivated && <EasterEgg />}
                      </ClientOnly>
          </animated.div>
        )}
      </AnimatePresence>
    </LenisProvider>
  )
}
