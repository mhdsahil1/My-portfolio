'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function TerminalAnimation() {
  const [mounted, setMounted] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 800, height: 600 })

  useEffect(() => {
    setMounted(true)
    setWindowSize({
      width: typeof window !== 'undefined' ? window.innerWidth : 800,
      height: typeof window !== 'undefined' ? window.innerHeight : 600,
    })
  }, [])

  const codeSnippets = [
    '> npm run build',
    '> const fullStack = true',
    '> git commit -m "epic"',
    '> sudo make me cyber',
    '> echo "Security First"',
    '> whoami developer',
  ]

  if (!mounted) {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Floating terminal blocks - reduced count for performance */}
      {codeSnippets.slice(0, 3).map((code, index) => (
        <motion.div
          key={index}
          className="absolute text-xs font-mono"
          initial={{
            x: Math.random() * windowSize.width,
            y: -50,
            opacity: 0,
          }}
          animate={{
            y: ['-50px', windowSize.height + 50],
            opacity: [0, 0.2, 0.2, 0],
          }}
          transition={{
            duration: 20 + index * 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: index * 3,
            ease: "linear",
          }}
          style={{
            color: 'hsl(var(--primary) / 0.3)',
            textShadow: '0 0 8px hsl(var(--primary) / 0.2)',
            transform: 'translateZ(0)',
            willChange: 'transform, opacity',
          }}
        >
          <span className="block">{`$`}</span>
          <span className="block">{code}</span>
        </motion.div>
      ))}

      {/* Static grid background for better performance */}
      <div
        className="absolute bottom-0 right-0 w-96 h-96 opacity-3 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(45deg, transparent 24%, hsl(var(--primary)) 25%, hsl(var(--primary)) 26%, transparent 27%, transparent 74%, hsl(var(--primary)) 75%, hsl(var(--primary)) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  )
}
