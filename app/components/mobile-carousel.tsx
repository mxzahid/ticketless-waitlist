const mobileImages = [
  {
    src: "/mobile-screenshots/onboarding_start.png",
    alt: "TICKETLESS app screen landing page"
  },
  {
    src: "/mobile-screenshots/main_screen.png",
    alt: "TICKETLESS app screen showing parking restrictions"
  },
  {
    src: "/mobile-screenshots/app-screen-4.png",
    alt: "TICKETLESS app screen showing settings"
  }
]

export function MobileCarousel() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            See <span className="gradient-text">TICKETLESS</span> in Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Experience the app that keeps you one step ahead of parking restrictions
          </p>
        </div>

        {/* Images displayed side by side on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 items-start justify-items-center">
          {mobileImages.map((image, index) => (
            <div key={index} className="w-full max-w-xs">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
