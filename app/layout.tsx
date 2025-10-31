import type React from "react"
import "@/app/globals.css"
import { Inter, Space_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })
const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
})

export const metadata = {
  title: "Muhammed Sahil - Full Stack Developer & Cyber Security Enthusiast",
  description:
    "B.Tech Computer Science student specializing in web development, cyber security, and full-stack technologies. Portfolio featuring projects, skills, and contact information.",
  keywords: ["developer", "web development", "cyber security", "portfolio", "React", "Next.js", "full-stack"],
  author: "Muhammed Sahil",
  openGraph: {
    title: "Muhammed Sahil - Developer Portfolio",
    description: "Explore my projects, skills, and experience in web development and cyber security.",
    url: "https://mhdsahil-portfolio.vercel.app",
    siteName: "Muhammed Sahil Portfolio",
    images: [
      {
        url: "/images/hero-portrait.png",
        width: 1200,
        height: 630,
        alt: "Muhammed Sahil - Developer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammed Sahil - Developer Portfolio",
    description: "Check out my latest projects and skills in web development.",
    images: ["/images/hero-portrait.png"],
    creator: "@mhdsahil1",
  },
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1.0",
  icons: {
    icon: "/favicon.jpg",
    apple: "/favicon.jpg",
  },
  canonical: "https://mhdsahil-portfolio.vercel.app",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Muhammed Sahil",
              url: "https://mhdsahil-portfolio.vercel.app",
              image: "/images/hero-portrait.png",
              jobTitle: "Full Stack Developer",
              sameAs: ["https://github.com/mhdsahil1", "https://www.linkedin.com/in/muhammad-sahil-474a59293/"],
              contact: {
                "@type": "ContactPoint",
                contactType: "Website Contact",
                email: "muhammedsahilshaz09@gmail.com",
              },
            }),
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
