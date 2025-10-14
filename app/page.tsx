"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Github, Linkedin, Mail, Code2, Terminal, BookOpen, ExternalLink, Moon, Sun, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export default function Portfolio() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, -150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3])

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = window.scrollY / totalHeight
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200

      const sections = [
        { ref: heroRef, id: "home" },
        { ref: aboutRef, id: "about" },
        { ref: skillsRef, id: "skills" },
        { ref: projectsRef, id: "projects" },
        { ref: contactRef, id: "contact" },
      ]

      for (const section of sections) {
        if (section.ref.current) {
          const offsetTop = section.ref.current.offsetTop
          const offsetHeight = section.ref.current.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const [text, setText] = useState("")
  const fullText = "Pursuing B.Tech in Computer Science (Cyber Security)"
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + fullText[index])
        setIndex(index + 1)
      }, 50)
      return () => clearTimeout(timeout)
    }
  }, [index, fullText])

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ]

  const scrollToSection = (id: string) => {
    console.log("[v0] Scrolling to section:", id)
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
      setIsMenuOpen(false)
    }
  }

  const handleThemeToggle = () => {
    console.log("[v0] Current theme:", theme)
    if (!mounted) return

    if (theme === "light") {
      setTheme("dark")
      console.log("[v0] Switching to theme: dark")
    } else {
      setTheme("light")
      console.log("[v0] Switching to theme: light")
    }
  }

  const handleMobileMenuToggle = () => {
    console.log("[v0] Mobile menu toggle clicked, current state:", isMenuOpen)
    setIsMenuOpen(!isMenuOpen)
    console.log("[v0] Mobile menu new state:", !isMenuOpen)
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80 text-foreground">
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 z-50"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/40">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold"
          >
            <span className="text-primary">Muhammed</span> Sahil
          </motion.div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handleThemeToggle} className="rounded-full">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </motion.div>
              </AnimatePresence>
            </Button>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  onClick={() => scrollToSection(item.id)}
                  className={`rounded-full transition-all duration-300 ${
                    activeSection === item.id ? "bg-primary text-primary-foreground" : ""
                  }`}
                >
                  {item.label}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="md:hidden rounded-full bg-transparent"
              onClick={handleMobileMenuToggle}
            >
              <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isMenuOpen ? "rotate-180" : ""}`} />
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="container mx-auto px-4 py-2 flex flex-col gap-2">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeSection === item.id ? "default" : "ghost"}
                    onClick={() => scrollToSection(item.id)}
                    className="w-full justify-start"
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-16">
        <motion.section
          id="home"
          ref={heroRef}
          className="min-h-[90vh] flex items-center justify-center py-20"
          style={{ y, opacity }}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100,
                }}
                className="relative"
              >
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/50 shadow-xl shadow-primary/20">
                  <img
                    src="/images/design-mode/sahil%20crop%202.jpg"
                    alt="Portfolio portrait"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <motion.div
                  className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/30 to-purple-500/30 blur-xl -z-10"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
              </motion.div>

              <div className="text-center md:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Muhammed <span className="text-primary">Sahil</span>
                  </h1>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="h-16"
                >
                  <h2 className="text-xl md:text-2xl font-medium text-primary/90 mb-6">
                    {text}
                    <span className="animate-pulse">|</span>
                  </h2>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex gap-4 justify-center md:justify-start"
                >
                  <motion.a
                    href="https://github.com/mhdsahil1"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-background/80 border border-border p-3 rounded-full hover:bg-primary/10 transition-colors"
                  >
                    <Github className="h-6 w-6" />
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/muhammad-sahil-474a59293/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-background/80 border border-border p-3 rounded-full hover:bg-primary/10 transition-colors"
                  >
                    <Linkedin className="h-6 w-6" />
                  </motion.a>
                  <motion.a
                    href="mailto:muhammedsahilshaz09@gmail.com"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-background/80 border border-border p-3 rounded-full hover:bg-primary/10 transition-colors"
                  >
                    <Mail className="h-6 w-6" />
                  </motion.a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="mt-8"
                >
                  <Button
                    onClick={() => scrollToSection("contact")}
                    className="rounded-full px-8 py-6 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 text-white shadow-lg shadow-primary/20"
                  >
                    Get In Touch
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        <section id="about" ref={aboutRef} className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-2">About Me</h2>
              <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-center"
              >
                <p className="text-lg leading-relaxed">
                  I'm a passionate B.Tech student at Yenepoya University, dedicated to expanding my knowledge in
                  software development. Currently focusing on mastering C++, JavaScript, and web development
                  technologies to build innovative solutions.
                </p>

                <motion.div
                  className="mt-8 flex flex-wrap gap-3 justify-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
                  viewport={{ once: true }}
                >
                  {["Cyber Security", "Web Development", "C++", "JavaScript", "Problem Solving"].map((tag, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="skills" ref={skillsRef} className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Technical Skills</h2>
              <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="space-y-8">
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-2xl font-bold"
                >
                  Programming Languages
                </motion.h3>

                <SkillProgressBar name="C++" percentage={75} delay={0.1} icon={<Code2 className="h-5 w-5" />} />
                <SkillProgressBar
                  name="JavaScript"
                  percentage={70}
                  delay={0.2}
                  icon={<Terminal className="h-5 w-5" />}
                />
                <SkillProgressBar
                  name="HTML & CSS"
                  percentage={85}
                  delay={0.3}
                  icon={<BookOpen className="h-5 w-5" />}
                />
                <SkillProgressBar name="Python" percentage={60} delay={0.4} icon={<Code2 className="h-5 w-5" />} />
              </div>

              <div className="space-y-8">
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-2xl font-bold"
                >
                  Technologies & Tools
                </motion.h3>

                <SkillProgressBar
                  name="Web Development"
                  percentage={80}
                  delay={0.1}
                  icon={<BookOpen className="h-5 w-5" />}
                />
                <SkillProgressBar
                  name="Cyber Security"
                  percentage={65}
                  delay={0.2}
                  icon={<Terminal className="h-5 w-5" />}
                />
                <SkillProgressBar
                  name="Git & GitHub"
                  percentage={75}
                  delay={0.3}
                  icon={<Github className="h-5 w-5" />}
                />
                <SkillProgressBar
                  name="Problem Solving"
                  percentage={85}
                  delay={0.4}
                  icon={<Code2 className="h-5 w-5" />}
                />
              </div>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <SkillCard
                icon={<Code2 className="h-10 w-10" />}
                title="C++"
                description="Learning data structures and algorithms with C++"
                delay={0}
              />
              <SkillCard
                icon={<Terminal className="h-10 w-10" />}
                title="JavaScript"
                description="Building interactive web applications"
                delay={0.2}
              />
              <SkillCard
                icon={<BookOpen className="h-10 w-10" />}
                title="Web Development"
                description="Creating responsive and modern websites"
                delay={0.4}
              />
            </div>
          </div>
        </section>

        <section id="projects" ref={projectsRef} className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Learning Projects</h2>
              <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <ProjectCard
                title="Portfolio Website"
                description="A personal portfolio website built with HTML, CSS, and JavaScript"
                tags={["HTML", "CSS", "JavaScript"]}
                delay={0}
              />
              <ProjectCard
                title="Cyber Security Blog"
                description="A blog focused on cyber security topics and best practices"
                tags={["React", "Next.js", "Tailwind"]}
                delay={0.2}
              />
            </div>
          </div>
        </section>

        <section id="contact" ref={contactRef} className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Get In Touch</h2>
              <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
            </motion.div>

            <div className="max-w-md mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-card rounded-xl shadow-xl p-6 border border-border"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <a
                        href="mailto:muhammedsahilshaz09@gmail.com"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        muhammedsahilshaz09@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Linkedin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">LinkedIn</h3>
                      <a
                        href="https://www.linkedin.com/in/muhammad-sahil-474a59293/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        muhammad-sahil
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Github className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">GitHub</h3>
                      <a
                        href="https://github.com/mhdsahil1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        mhdsahil1
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-border/40">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">© {new Date().getFullYear()} Muhammed Sahil. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function SkillCard({ icon, title, description, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -10 }}
      className="bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/50 group"
    >
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="mb-4 text-primary group-hover:text-primary-foreground"
        >
          {icon}
        </motion.div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  )
}

function ProjectCard({ title, description, tags, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -10 }}
      className="bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/50 group"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{title}</h3>
          <motion.div
            whileHover={{ scale: 1.2, rotate: 15 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <ExternalLink className="h-5 w-5 text-primary" />
          </motion.div>
        </div>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay + index * 0.1 }}
              viewport={{ once: true }}
              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function SkillProgressBar({ name, percentage, delay = 0, icon }) {
  const [isInView, setIsInView] = useState(false)
  const progressRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.1 },
    )

    if (progressRef.current) {
      observer.observe(progressRef.current)
    }

    return () => {
      if (progressRef.current) {
        observer.unobserve(progressRef.current)
      }
    }
  }, [])

  return (
    <motion.div
      ref={progressRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="text-primary">{icon}</div>
          <h4 className="font-medium">{name}</h4>
        </div>
        <span className="text-sm font-bold text-primary">{percentage}%</span>
      </div>

      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${percentage}%` : 0 }}
          transition={{
            duration: 1.5,
            delay: delay + 0.3,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full"
        />
      </div>
    </motion.div>
  )
}
