"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"

const faqs = [
  {
    question: "Why is this free?",
    answer:
      "I built TICKETLESS because I was tired of getting tickets in SF. It's a passion project, not a business. No ads, no subscriptions, no data selling. Just a useful tool for the community.",
  },
  {
    question: "How does TICKETLESS detect when I park?",
    answer:
      "I use Apple's CoreLocation APIs to detect significant location changes and stationary periods. When your phone stops moving for a few minutes, the app checks if you're parked on a street with cleaning restrictions. It's battery-efficient and works entirely on your device.",
  },
  {
    question: "Does this work for all of San Francisco?",
    answer:
      "Yes! It covers all street-cleaning zones in SF, from the Marina to the Mission. The data comes directly from SF's official DataSF portal and is updated daily to ensure accuracy.",
  },
  {
    question: "Will this drain my battery?",
    answer:
      "No. TICKETLESS uses Apple's built-in location APIs that are designed to be battery-efficient. It only check your location when you've stopped moving, and all processing happens locally on your device",
  },
  {
    question: "What if I park in a garage or private lot?",
    answer:
      "The app is smart enough to know when you're not on a public street. If you park in a garage, private lot, or driveway, you won't receive any notifications. Ticketless only alerts you for street parking with active restrictions.",
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
