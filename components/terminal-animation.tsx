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
      {/* Floating terminal blocks */}
      {codeSnippets.map((code, index) => (
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
            opacity: [0, 0.3, 0.3, 0],
          }}
          transition={{
            duration: 15 + index * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: index * 2,
          }}
          style={{
            color: 'hsl(var(--primary) / 0.4)',
            textShadow: '0 0 10px hsl(var(--primary) / 0.3)',
          }}
        >
          <span className="block">{`$`}</span>
          <span className="block animate-terminal-glow">{code}</span>
        </motion.div>
      ))}

      {/* Animated grid background in bottom corners */}
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 opacity-5"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
        }}
        style={{
          backgroundImage: 'linear-gradient(45deg, transparent 24%, hsl(var(--primary)) 25%, hsl(var(--primary)) 26%, transparent 27%, transparent 74%, hsl(var(--primary)) 75%, hsl(var(--primary)) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Scanline effect overlay */}
      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        animate={{
          backgroundPosition: ['0px 0px', '0px 100px'],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'linear',
        }}
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, hsl(var(--primary)) 0px, hsl(var(--primary)) 1px, transparent 1px, transparent 2px)',
          backgroundSize: '100% 2px',
        }}
      />
    </div>
  )
}
