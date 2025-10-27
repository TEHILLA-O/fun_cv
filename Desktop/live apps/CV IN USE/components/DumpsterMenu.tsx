'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, X, Github, ExternalLink, Link2 } from 'lucide-react'
import PixelBorder from './ui/PixelBorder'
import { additionalProjects } from '../data/userData'

const DumpsterMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
    setSelectedProject(null)
  }

  return (
    <>
      {/* Hidden Dumpster Icon */}
      <motion.button
        onClick={toggleMenu}
        className="cursor-target fixed bottom-8 right-8 z-50 group"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        whileHover={{ 
          opacity: 1, 
          scale: 1.1,
          y: -5, // Lift the trash can slightly
          rotate: -10, // Tilt it to simulate lid opening
          transition: { duration: 0.2, ease: 'easeOut' }
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ 
          duration: 0.3
        }}
      >
        <PixelBorder className="p-3 bg-modern-darker/80 hover:bg-modern-darker border-pixel-green/30 hover:border-pixel-green transition-all duration-300">
          <Trash2 
            size={24} 
            className="text-pixel-green group-hover:text-pixel-green/80 transition-colors duration-300"
          />
        </PixelBorder>
        
        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-modern-darker border border-pixel-green/50 text-pixel-green text-xs font-pixel whitespace-nowrap"
        >
          Hidden Projects
        </motion.div>
      </motion.button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>

      {/* Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30 
            }}
            className="fixed top-0 right-0 h-full w-96 bg-modern-darker border-l border-pixel-green/30 z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-pixel text-pixel-green">
                  HIDDEN PROJECTS
                </h2>
                <button
                  onClick={closeMenu}
                  className="p-2 hover:bg-modern-purple/20 rounded transition-colors"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              {/* Projects Grid */}
              <div className="space-y-4">
                {additionalProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="cursor-pointer"
                    onClick={() => setSelectedProject(project.id)}
                  >
                    <PixelBorder className="p-4 hover:border-pixel-green/50 transition-colors">
                      <div className="flex items-start space-x-3">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-pixel text-sm text-white line-clamp-2 mb-1">
                            {project.title}
                          </h3>
                          <p className="text-xs text-gray-400 line-clamp-2">
                            {project.description}
                          </p>
                          <div className="mt-2">
                            <span className="inline-block px-2 py-1 bg-pixel-green/20 text-pixel-green text-xs rounded">
                              {project.category === 'design' && 'Graphic Design'}
                              {project.category === 'data' && 'Data Analysis'}
                              {project.category === 'ui' && 'UI/UX Design'}
                              {project.category === 'web' && 'Web Development'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </PixelBorder>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-60 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {additionalProjects.filter(p => p.id === selectedProject).map((project) => (
                <PixelBorder key={project.id} className="p-6 bg-modern-darker">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-pixel text-pixel-green">
                      {project.title}
                    </h3>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="p-2 hover:bg-modern-purple/20 rounded transition-colors"
                    >
                      <X size={20} className="text-gray-400" />
                    </button>
                  </div>
                  
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
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
                </PixelBorder>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default DumpsterMenu
