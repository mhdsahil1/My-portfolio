"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X, MapPin, Users } from "lucide-react"

interface Visitor {
  id: string
  country: string
  city: string
  visited_at: string
}

export function AdminDashboard({ onClose }: { onClose: () => void }) {
  const [visitors, setVisitors] = useState<Visitor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchVisitors()
  }, [])

  const fetchVisitors = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/visitors")
      if (!response.ok) throw new Error("Failed to fetch visitors")
      const data = await response.json()
      setVisitors(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const uniqueCountries = new Set(visitors.map((v) => v.country)).size
  const uniqueCities = new Set(visitors.map((v) => v.city)).size

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-card border border-border rounded-xl shadow-xl p-6 w-full max-w-2xl my-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Visitor Analytics</h2>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-primary/10 rounded-lg p-4 text-center"
            >
              <div className="text-3xl font-bold text-primary">{visitors.length}</div>
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1 mt-1">
                <Users className="h-4 w-4" />
                Total Visitors
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-primary/10 rounded-lg p-4 text-center"
            >
              <div className="text-3xl font-bold text-primary">{uniqueCountries}</div>
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1 mt-1">
                <MapPin className="h-4 w-4" />
                Countries
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-primary/10 rounded-lg p-4 text-center"
            >
              <div className="text-3xl font-bold text-primary">{uniqueCities}</div>
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1 mt-1">
                <MapPin className="h-4 w-4" />
                Cities
              </div>
            </motion.div>
          </div>

          {/* Visitors List */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            <h3 className="font-semibold mb-3">Recent Visitors</h3>
            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : visitors.length === 0 ? (
              <p className="text-muted-foreground">No visitors yet</p>
            ) : (
              visitors.map((visitor, index) => (
                <motion.div
                  key={visitor.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-muted/50 rounded-lg p-3 text-sm"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">
                        {visitor.city}, {visitor.country}
                      </p>
                      <p className="text-xs text-muted-foreground">{new Date(visitor.visited_at).toLocaleString()}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          <Button onClick={onClose} className="w-full mt-6">
            Close
          </Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
