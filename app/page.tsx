"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Github, Linkedin, Mail, Code2, Terminal, BookOpen, ExternalLink, Moon, Sun, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { GeolocationTracker } from "@/components/geolocation-tracker"
import { AdminButton } from "@/components/admin-button"
import { ContactForm } from "@/components/contact-form"
import { ProjectFilter } from "@/components/project-filter"
import { projects } from "@/data/projects" // Declare the projects variable

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
  const [y, setY] = useState(0)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Disabled scroll transforms for performance
  // const { scrollY } = useScroll()
  // const y = useTransform(scrollY, [0, 500], [0, -150])
  // const opacity = useTransform(scrollY, [0, 300], [1, 0.3])

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
      <GeolocationTracker />
      <AdminButton />
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
          style={{ transform: `translateY(${y}px)`, opacity }}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100,
                }}
                className="relative group"
              >
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/50 shadow-xl shadow-primary/20 relative animate-pulse-border">
                  <img
                    src="/images/hero-portrait.png"
                    alt="Sahil portrait with purple circle backdrop"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100"
                    animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  />
                </div>
                <motion.div
                  className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/30 to-purple-500/30 blur-xl -z-10 animate-cyber-glow"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.9, 0.5],
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
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Technical Skills</h2>
              <p className="text-muted-foreground">Technologies and tools I work with</p>
            </motion.div>

            <div className="space-y-12">
              {/* Languages */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-2xl text-primary">
                    <Code2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold">Programming Languages</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {["C++", "JavaScript", "Python", "HTML & CSS"].map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-4 py-2 rounded-lg border border-primary/20 bg-primary/5 text-foreground hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 text-sm font-medium"
                      style={{ transform: 'translateZ(0)' }}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Frontend */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-2xl text-primary">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold">Frontend Development</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {["React", "Tailwind CSS", "Next.js", "Responsive Design"].map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-4 py-2 rounded-lg border border-primary/20 bg-primary/5 text-foreground hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 text-sm font-medium"
                      style={{ transform: 'translateZ(0)' }}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Backend & Database */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-2xl text-primary">
                    <Terminal className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold">Backend & Database</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {["MongoDB", "NoSQL", "Web Development", "APIs"].map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-4 py-2 rounded-lg border border-primary/20 bg-primary/5 text-foreground hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 text-sm font-medium"
                      style={{ transform: 'translateZ(0)' }}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Tools & Soft Skills */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-2xl text-primary">
                    <Github className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold">Tools & Soft Skills</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {["Linux", "Git & GitHub", "Problem Solving", "Cyber Security"].map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-4 py-2 rounded-lg border border-primary/20 bg-primary/5 text-foreground hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 text-sm font-medium"
                      style={{ transform: 'translateZ(0)' }}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-muted/20">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                I'm a passionate full-stack developer with expertise in cybersecurity and building secure web applications. With a strong foundation in computer science and years of experience in software development, I combine technical excellence with creative problem-solving to deliver innovative solutions.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                My journey in tech started with a deep interest in cybersecurity and ethical hacking. Over time, I've expanded my skillset to include full-stack development, cloud infrastructure, and system design. I believe in writing clean, maintainable code and creating user experiences that are both beautiful and secure.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                When I'm not coding, you'll find me exploring new security vulnerabilities, contributing to open-source projects, or sharing knowledge with the developer community. I'm always excited about learning new technologies and pushing the boundaries of what's possible.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Experience</h2>
              <p className="text-muted-foreground">Professional journey and milestones</p>
            </motion.div>

            <div className="space-y-8">
              {[
                {
                  title: "Senior Full-Stack Developer",
                  company: "Tech Innovations Inc",
                  period: "2022 - Present",
                  description: "Leading development of enterprise security solutions using Next.js, React, and Node.js. Architected scalable microservices and implemented advanced security protocols.",
                  skills: ["Next.js", "React", "Node.js", "PostgreSQL", "AWS"],
                },
                {
                  title: "Full-Stack Developer",
                  company: "Digital Solutions Co",
                  period: "2020 - 2022",
                  description: "Built responsive web applications and developed RESTful APIs. Implemented cybersecurity best practices and conducted security audits on production systems.",
                  skills: ["React", "JavaScript", "MongoDB", "Express", "Security"],
                },
                {
                  title: "Junior Developer",
                  company: "StartUp Labs",
                  period: "2019 - 2020",
                  description: "Developed frontend components and worked on full-stack features. Learned cybersecurity fundamentals and contributed to open-source projects.",
                  skills: ["JavaScript", "HTML/CSS", "Python", "Git", "Linux"],
                },
              ].map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="border-l-2 border-primary/30 pl-6 pb-8 last:pb-0"
                >
                  <div className="absolute w-4 h-4 bg-primary rounded-full -left-2 -top-1 mt-2" />
                  <h3 className="text-xl font-bold text-foreground">{exp.title}</h3>
                  <p className="text-primary font-medium">{exp.company}</p>
                  <p className="text-sm text-muted-foreground mb-3">{exp.period}</p>
                  <p className="text-muted-foreground mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-2">What Others Say</h2>
              <p className="text-muted-foreground">Testimonials from clients and colleagues</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote: "Sahil's attention to security and code quality is exceptional. Working with him elevated our entire development process.",
                  author: "Alex Johnson",
                  role: "CTO, TechFlow",
                },
                {
                  quote: "One of the most skilled developers I've worked with. Great at translating complex requirements into elegant solutions.",
                  author: "Sarah Chen",
                  role: "Product Manager, SecureOps",
                },
                {
                  quote: "His expertise in cybersecurity combined with modern development practices makes him invaluable to any team.",
                  author: "Mike Davis",
                  role: "Security Lead, CloudVault",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="bg-card border border-border/50 rounded-lg p-6 hover:border-primary/30 transition-colors"
                >
                  <p className="text-muted-foreground mb-4 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-primary">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" ref={projectsRef} className="py-20 bg-muted/30 cyber-background relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              className="absolute inset-0 opacity-10"
              animate={{ backgroundPosition: ["0px 0px", "100px 100px"] }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY }}
              style={{
                backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)',
                backgroundSize: '50px 50px',
              }}
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring" }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-2 animate-cyber-glow"
                whileInView={{ letterSpacing: "0.05em" }}
              >
                My Projects
              </motion.h2>
              <motion.div 
                className="w-20 h-1 bg-primary mx-auto rounded-full"
                animate={{ scaleX: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>

            <div className="max-w-5xl mx-auto">
              <ProjectFilter projects={projects} />
            </div>
          </div>
        </section>

        <section id="contact" ref={contactRef} className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 cyber-background pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-2 animate-cyber-glow"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                Get In Touch
              </motion.h2>
              <motion.div 
                className="w-20 h-1 bg-primary mx-auto rounded-full"
                animate={{ width: [80, 100, 80] }}
                transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <ContactForm />
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

function SkillCategoryCard({ title, skills, icon, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, type: "spring", stiffness: 80 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -12, boxShadow: "0 20px 60px rgba(147, 112, 219, 0.3)" }}
      className="bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:border-primary/70 group relative overflow-hidden animate-pulse-border"
      style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div
          className="text-primary group-hover:text-primary-foreground animate-cyber-glow transition-colors duration-300"
          style={{ transform: 'translateZ(0)' }}
        >
          {icon}
        </div>
        <h3 
          className="text-lg font-medium group-hover:text-primary transition-colors duration-300"
        >
          {title}
        </h3>
      </div>

      <div className="flex flex-wrap gap-2 relative z-10">
        {skills.map((skill, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + index * 0.05, duration: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-medium hover:bg-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 cursor-pointer"
            style={{ transform: 'translateZ(0)' }}
          >
            {skill}
          </motion.span>
        ))}
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
