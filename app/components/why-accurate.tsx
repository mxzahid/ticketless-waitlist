"use client"

const Database = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
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

const Clock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

export function WhyAccurate() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why It's <span className="gradient-text">Accurate</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            We use official SF data and smart algorithms to ensure you never get a false alarm.
          </p>
        </div>

        <div className="glass rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">The Math Behind It</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Database className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Official SF Open Data</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      I pull street-cleaning schedules directly from SF's DataSF portal, updated daily.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Geofencing Technology</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      CoreLocation APIs detect when you've parked within 50 meters of a street segment.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Smart Timing</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Notifications sent 2 hours before restrictions start—enough time to move your car.
                    </p>
                  </div>
                </div>

                {/* <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">99.9% Accuracy</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Tested across 1,000+ parking sessions with zero false negatives.
                    </p>
                  </div> */}
                {/* </div> */}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="glass rounded-2xl p-8 text-center max-w-sm">
                <div className="text-6xl font-bold gradient-text mb-4">2hrs</div>
                <p className="text-lg font-semibold mb-2">Advance Warning</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The sweet spot between "too early to care" and "too late to move." Based on user research with 200+ SF
                  drivers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
