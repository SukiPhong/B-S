import React from 'react'
import { cn } from '@/lib/utils'



export const CalligraphyBanner = ({ text, className = '' }) => {
  return (
    <div 
      className={cn(
        "relative w-full min-h-[500px] bg-red-600 rounded-lg overflow-hidden",
        "before:absolute before:inset-0 before:bg-[url('/patterns/chinese-pattern.png')] before:opacity-10 before:animate-float",
        className
      )}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-radial  to-transparent animate-pulse" />
      <div className="absolute inset-0 bg-[url('/patterns/clouds.png')] opacity-20 animate-float" />
      
      {/* Main content */}
      <div className="relative h-full w-full flex flex-col items-center justify-center p-8 gap-4">
        {text.map((char, index) => (
          <span 
            key={index}
            className="text-yellow-300 text-4xl arizonia-regular animate-fadeIn"
            style={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              animationDelay: `${index * 0.1}s`
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  )
}

