"use client"

const Bell = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
    />
  </svg>
)

const MapPin = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
    />
  </svg>
)

const Smartphone = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
    />
  </svg>
)

const Shield = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
    />
  </svg>
)

const Zap = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
    />
  </svg>
)

const Heart = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
    />
  </svg>
)

const features = [
  {
    icon: Heart,
    title: "100% Free",
    description: "No ads, no subscriptions, no catch. Just a useful app for SF residents.",
  },
  {
    icon: MapPin,
    title: "Auto-Detection",
    description: "Knows when you park without draining your battery. No manual check-ins required.",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Get notified 2 hours before street-cleaning or tow-away. Never miss a warning.",
  },
  {
    icon: Smartphone,
    title: "iOS Native",
    description: "Built for a smooth, native experience that feels right at home.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your location data never leaves your device. We can't see where you park.",
  },
  {
    icon: Zap,
    title: "Battery Efficient",
    description: "Uses Apple's CoreLocation APIs intelligently. Minimal impact on battery life.",
  },
]

export function Features() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Parking Protection on <span className="gradient-text">Autopilot</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Set it and forget it. TICKETLESS works silently in the background to keep you safe.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const isFirstCard = index === 0;
            return (
              <div
                key={feature.title}
                className={`group relative rounded-3xl p-8 glass-card overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 ${
                  isFirstCard ? 'ring-2 ring-primary/40 ring-offset-4 ring-offset-background shadow-lg shadow-primary/10' : ''
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fade-in 0.6s ease-out forwards',
                  opacity: 0
                }}
              >
              {/* Animated liquid-like background element */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/30 via-accent/20 to-transparent rounded-full blur-xl animate-pulse" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/30 via-primary/20 to-transparent rounded-full blur-lg animate-pulse" style={{animationDelay: '1s'}} />
              </div>

              {/* Liquid reflection effect */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-60" />

              {/* Icon container with enhanced glass effect */}
              <div className="relative w-16 h-16 rounded-2xl mb-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10" />
                <div className="relative w-full h-full flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-white drop-shadow-lg" strokeWidth={1.5} />
                </div>
                {/* Liquid shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
              </div>

              <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent relative z-10">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base relative z-10">{feature.description}</p>

              {/* Bottom accent dot with enhanced animation */}
              <div className="absolute bottom-6 right-6 w-3 h-3 rounded-full bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />

                {/* Subtle border animation */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-px" style={{padding: '1px'}} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}
