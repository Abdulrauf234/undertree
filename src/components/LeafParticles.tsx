'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Leaf {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  duration: number;
  delay: number;
  sway: number;
}

export default function LeafParticles() {
  const [leaves, setLeaves] = useState<Leaf[]>([]);

  useEffect(() => {
    // Generate static details on mount to avoid hydration mismatch
    const generatedLeaves = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage width
      y: -10, // start above screen
      size: Math.random() * 14 + 10, // 10px to 24px
      rotation: Math.random() * 360,
      duration: Math.random() * 15 + 15, // 15s to 30s
      delay: Math.random() * -20, // negative delay so some start mid-screen
      sway: Math.random() * 100 + 50,
    }));
    setLeaves(generatedLeaves);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute opacity-40"
          style={{
            left: `${leaf.x}%`,
            width: leaf.size,
            height: leaf.size,
          }}
          initial={{ y: '-10%', rotation: leaf.rotation }}
          animate={{
            y: '110%',
            x: [
              `0px`, 
              `${leaf.sway}px`, 
              `-${leaf.sway / 2}px`, 
              `${leaf.sway / 3}px`
            ],
            rotate: leaf.rotation + 360,
          }}
          transition={{
            duration: leaf.duration,
            repeat: Infinity,
            delay: leaf.delay,
            ease: 'linear',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-full h-full text-[#A7C957]/30"
          >
            <path
              d="M17 8C17 8 13.5 12 12 12C10.5 12 7 8 7 8C7 8 6 12 12 18C18 12 17 8 17 8Z"
              fill="currentColor"
            />
            <path
              d="M12 4V12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
