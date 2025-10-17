import React from 'react';
import { motion } from 'framer-motion';
import DumpsterMenu from './DumpsterMenu';

const Footer: React.FC = () => {
  return (
    <>
      <footer className="py-8 bg-modern-darker relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-500 text-sm font-pixel text-center"
          >
            <span className="text-pixel-green">Hint:</span> Try pressing ↑↑↓↓
          </motion.div>
        </div>
      </footer>
      
      {/* Hidden Dumpster Menu */}
      <DumpsterMenu />
    </>
  );
};

export default Footer;