"use client"

import { Button } from "@/components/ui/button"

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
)

export function Hero() {
  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="animate-fade-in">
          <div className="inline-block mb-4 px-4 py-2 glass rounded-full">
            <span className="text-sm font-medium text-primary">Coming Soon to iOS</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            Never Get <span className="gradient-text">Towed</span> in SF Again
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto leading-relaxed">
            TICKETLESS auto-detects when you park and sends you a push notification before street-cleaning or tow-away
            hours. 100% free, forever.
          </p>

          <div className="animate-fade-in-delay">
            <Button
              size="lg"
              onClick={scrollToWaitlist}
              className="bg-primary hover:bg-primary-dark text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Join the Waitlist
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
