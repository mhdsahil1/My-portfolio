import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-background/80 px-4">
      <div className="text-center">
        <div className="inline-block text-6xl md:text-8xl font-bold text-primary/30 mb-4">
          404
        </div>
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
          Page Not Found
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          ❯ The page you're looking for doesn't exist. Time to return to the main system.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/" className="rounded-full px-8 py-6 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 text-primary-foreground font-medium transition-all duration-300 inline-flex items-center gap-2">
            Return Home
          </Link>
          <Link href="/#projects" className="rounded-full px-8 py-6 border border-primary/50 hover:border-primary/80 text-foreground hover:bg-primary/10 font-medium transition-all duration-300 inline-flex items-center gap-2">
            View Projects
          </Link>
        </div>
        <div className="mt-12 text-sm text-primary/50 font-mono">
          $ error_code: 404 | status: page_not_found
        </div>
      </div>
    </div>
  )
}
