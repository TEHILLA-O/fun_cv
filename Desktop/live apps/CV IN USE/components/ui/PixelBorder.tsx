import React from 'react';

interface PixelBorderProps {
  children: React.ReactNode;
  className?: string;
  border?: string;
  hover?: boolean;
}

const PixelBorder: React.FC<PixelBorderProps> = ({ 
  children, 
  className = '', 
  border = 'border-2 border-pixel-brown',
  hover = true 
}) => {
  return (
    <div 
      className={`
        relative ${border} 
        ${hover ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-pixel active:translate-y-0 active:shadow-pixel-hover hover-lift border-animate' : ''} 
        shadow-pixel bg-modern-darker
        ${className}
      `}
    >
      {children}
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-pixel-brown -mt-2 -mr-2"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-pixel-brown -mb-2 -ml-2"></div>
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-pixel-brown -mt-2 -ml-2"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-pixel-brown -mb-2 -mr-2"></div>
    </div>
  );
};

export default PixelBorder;