"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  category: string
  link?: string
  github?: string
}

interface ProjectFilterProps {
  projects: Project[]
  onProjectSelect?: (project: Project) => void
}

export function ProjectFilter({ projects, onProjectSelect }: ProjectFilterProps) {
  const [activeFilter, setActiveFilter] = useState("All")

  const categories = ["All", ...new Set(projects.map((p) => p.category))]

  const filteredProjects = activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter)

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setActiveFilter(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              activeFilter === category
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ y: -10 }}
            onClick={() => onProjectSelect?.(project)}
            className="bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/50 group cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
            </div>

            <p className="text-muted-foreground mb-4">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + idx * 0.05 }}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            <div className="flex gap-2">
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="px-4 py-2 text-sm rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  GitHub
                </motion.a>
              )}
              {project.link && (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Live
                </motion.a>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
