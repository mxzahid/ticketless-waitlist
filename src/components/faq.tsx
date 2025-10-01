"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How does TICKETLESS detect when I park?",
    answer:
      "We use Apple's CoreLocation APIs to detect significant location changes and stationary periods. When your phone stops moving for a few minutes, the app checks if you're parked on a street with cleaning restrictions. It's battery-efficient and works entirely on your device.",
  },
  {
    question: "Does this work for all of San Francisco?",
    answer:
      "Yes! We cover all street-cleaning zones in SF, from the Marina to the Mission. Our data comes directly from SF's official DataSF portal and is updated daily to ensure accuracy.",
  },
  {
    question: "Will this drain my battery?",
    answer:
      "No. TICKETLESS uses Apple's built-in location APIs that are designed to be battery-efficient. We only check your location when you've stopped moving, and all processing happens locally on your device. Most users report less than 1% additional battery drain per day.",
  },
  {
    question: "What if I park in a garage or private lot?",
    answer:
      "The app is smart enough to know when you're not on a public street. If you park in a garage, private lot, or driveway, you won't receive any notifications. We only alert you for street parking with active restrictions.",
  },
  {
    question: "Is my location data private?",
    answer:
      "Absolutely. Your location data never leaves your device. All street-cleaning checks happen locally using data we've pre-downloaded. We can't see where you park, and we don't track your movements. Privacy is a core feature, not an afterthought.",
  },
  {
    question: "Why is this free?",
    answer:
      "We built TICKETLESS because we were tired of getting towed in SF. It's a passion project, not a business. No ads, no subscriptions, no data selling. Just a useful tool for the community.",
  },
  {
    question: "When will the app launch?",
    answer:
      "We're in final testing and aiming for a launch in Spring 2025. Join the waitlist to be notified the moment we go live on the App Store.",
  },
]

export function FAQ() {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground text-pretty">Everything you need to know about TICKETLESS.</p>
        </div>

        <div>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="glass rounded-xl px-6 border-0">
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold text-lg">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
