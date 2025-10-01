import { Hero } from "./components/hero"
import { Features } from "./components/features"
import { HowItWorks } from "./components/how-it-works"
import { WhyAccurate } from "./components/why-accurate"
import { FAQ } from "./components/faq"
import { WaitlistForm } from "./components/waitlist-form"
import { MobileCarousel } from "./components/mobile-carousel"
import { Footer } from "./components/footer"

export const metadata = {
  title: "TICKETLESS",
  description:
    "Free iOS app that auto-detects your parking and warns you about street-cleaning and tow-away restrictions in San Francisco.",
  openGraph: {
    title: "TICKETLESS",
    description:
      "Free iOS app that auto-detects your parking and warns you about street-cleaning and tow-away restrictions in San Francisco.",
  },
}

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <div className="map-bg fixed inset-0 opacity-30 pointer-events-none" />
      <div className="relative z-10">
        <Hero />
        <MobileCarousel />
        <Features />
        <HowItWorks />
        <WhyAccurate />
        <FAQ />
        <WaitlistForm />
        <Footer />
      </div>
    </main>
  )
}
