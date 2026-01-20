'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export default function NotFound() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-background/80 px-4">
        <div className="text-center">
          <div className="inline-block text-6xl md:text-8xl font-bold text-primary/30 mb-4">
            404
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Page Not Found</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            <Terminal className="inline h-5 w-5 mr-2" />
            The page you're looking for doesn't exist.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild className="rounded-full px-8 py-6 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700">
              <Link href="/">
                <Home className="h-5 w-5 mr-2" />
                Return Home
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-8 py-6 bg-transparent">
              <Link href="/#projects">View Projects</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-background/80 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="mb-8"
        >
          <div className="inline-block text-6xl md:text-8xl font-bold text-primary/30 mb-4">
            404
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-5xl font-bold mb-4 animate-cyber-glow"
        >
          Page Not Found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-muted-foreground mb-8 max-w-md mx-auto"
        >
          <Terminal className="inline h-5 w-5 mr-2" />
          The page you're looking for doesn't exist. Time to return to the main system.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <Button
            asChild
            className="rounded-full px-8 py-6 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700"
          >
            <Link href="/">
              <Home className="h-5 w-5 mr-2" />
              Return Home
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="rounded-full px-8 py-6 bg-transparent"
          >
            <Link href="/#projects">
              View Projects
            </Link>
          </Button>
        </motion.div>

        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          className="mt-12 text-sm text-primary/50 font-mono"
        >
          $ error_code: 404 | status: page_not_found
        </motion.div>
      </motion.div>
    </div>
  )
}
