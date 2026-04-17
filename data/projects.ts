export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  category: string
  link?: string
  github?: string
}

export const projects: Project[] = [
  {
    id: "portfolio",
    title: "Personal Portfolio Website",
    description:
      "A fully responsive portfolio website showcasing my projects, skills, and experience built with Next.js and Tailwind CSS.",
    tags: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    category: "Web Development",
    link: "https://v0-sahil-folio.vercel.app/",
    github: "https://github.com/mhdsahil1/portfolio",
  },
  {
    id: "zestora",
    title: "Zestora – Full Stack E-commerce Platform",
    description:
      "A production-ready e-commerce platform built with Next.js, featuring secure Google authentication, Razorpay payment integration, and a complete order management system. Includes dynamic product listings, real-time checkout flow, and backend verification for secure transactions.",
    tags: ["Next.js", "MongoDB", "NextAuth", "Razorpay", "Tailwind CSS"],
    category: "Full Stack Development",
    link: "https://v0-zestora-spices-in.vercel.app/",
    github: "https://github.com/mhdsahil1/Zestora",
  },
  {
    id: "cyber-blog",
    title: "Cyber Security Blog",
    description:
      "An informative blog platform dedicated to cyber security topics, best practices, and recent security trends.",
    tags: ["Next.js", "Markdown", "Tailwind CSS", "SEO"],
    category: "Content & Education",
    link: "https://cyber-blog-example.vercel.app",
  },
  {
    id: "calculator",
    title: "Scientific Calculator",
    description:
      "A fully functional calculator built with vanilla JavaScript supporting basic and advanced mathematical operations.",
    tags: ["JavaScript", "HTML", "CSS", "Algorithms"],
    category: "Utilities",
    github: "https://github.com/mhdsahil1/calculator",
  },
  {
    id: "weather-app",
    title: "Weather Application",
    description:
      "Real-time weather app with geolocation support, forecast data, and beautiful UI for checking weather conditions.",
    tags: ["React", "API Integration", "Geolocation", "Tailwind CSS"],
    category: "Web Development",
    link: "https://weather-app-example.vercel.app",
    github: "https://github.com/mhdsahil1/weather-app",
  },
  {
    id: "password-generator",
    title: "Secure Password Generator",
    description:
      "A utility tool that generates strong, customizable passwords with various security options and copy-to-clipboard functionality.",
    tags: ["JavaScript", "React", "Cryptography", "UI/UX"],
    category: "Utilities",
    github: "https://github.com/mhdsahil1/password-generator",
  },
]
