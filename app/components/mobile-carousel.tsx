const mobileImages = [
  {
    src: "/mobile-screenshots/app-screen-1.png",
    alt: "TICKETLESS app screen showing parking detection feature"
  },
  {
    src: "/mobile-screenshots/app-screen-3.png",
    alt: "TICKETLESS app screen showing parking restrictions"
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

        {/* Images displayed side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-items-center">
          {mobileImages.map((image, index) => (
            <div key={index} className="w-full max-w-sm">
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
