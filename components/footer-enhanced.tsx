"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Heart } from "lucide-react"

export function EnhancedFooter() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, href: "https://github.com/mhdsahil1", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/muhammad-sahil-474a59293/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:muhammedsahilshaz09@gmail.com", label: "Email" },
  ]

  return (
    <footer className="py-12 border-t border-border/40 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-lg font-bold mb-2">
              <span className="text-primary">Muhammed</span> Sahil
            </h3>
            <p className="text-muted-foreground text-sm">
              Full Stack Developer & Cyber Security Enthusiast building innovative digital solutions.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Home", href: "#home" },
                { label: "About", href: "#about" },
                { label: "Skills", href: "#skills" },
                { label: "Projects", href: "#projects" },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border/40 mb-6"></div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground"
        >
          <p className="flex items-center gap-1">
            © {currentYear} Muhammed Sahil. Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> and
            passion.
          </p>
          <p className="mt-4 md:mt-0">
            Designed & Built with{" "}
            <span className="text-primary font-semibold">Next.js, React, Tailwind CSS, and Framer Motion</span>
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
