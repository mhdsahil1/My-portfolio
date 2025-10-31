"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
        setTimeout(() => setSubmitStatus("idle"), 3000)
      } else {
        setSubmitStatus("error")
        setTimeout(() => setSubmitStatus("idle"), 3000)
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
      setTimeout(() => setSubmitStatus("idle"), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true, margin: "-100px" }}
      className="w-full max-w-2xl"
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Email</h3>
              <a
                href="mailto:muhammedsahilshaz09@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                muhammedsahilshaz09@gmail.com
              </a>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Phone</h3>
              <p className="text-muted-foreground">+91 XXXXX XXXXX</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Location</h3>
              <p className="text-muted-foreground">India</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="What's this about?"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Your message here..."
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:border-primary transition-colors resize-none"
            />
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 text-white shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
            >
              <Send className="h-4 w-4" />
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </motion.div>

          {submitStatus === "success" && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-600 text-sm text-center">
              Message sent successfully! I'll get back to you soon.
            </motion.p>
          )}
          {submitStatus === "error" && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-600 text-sm text-center">
              Failed to send message. Please try again.
            </motion.p>
          )}
        </form>
      </div>
    </motion.div>
  )
}
