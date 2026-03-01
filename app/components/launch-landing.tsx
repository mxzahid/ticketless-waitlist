"use client"

import Image from "next/image"
import { motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion"
import { useRef, useState, useEffect, type CSSProperties } from "react"
import GlassButton from "./ui/glass-button"

const IOS_DOWNLOAD_URL = "https://apps.apple.com/"

type Screen = {
  src: string
  title: string
  summary: string
  bullets: string[]
  caption: string
}

const screens: Screen[] = [
  {
    src: "/launch_screenshots/parking banner.png",
    title: "Auto parking detection",
    summary:
      "Ticketless detects as soon as you park, then understands the parking rules for you, and notifies you before you get a ticket.",
    bullets: ["Background auto-detection", "No tap-to-start flow", "Drag-and-drop pin when needed"],
    caption: "",
  },
  {
    src: "/launch_screenshots/explore.png",
    title: "Plan before you go.",
    summary:
      "Explore mode helps you inspect any spot in advance, while manual controls let you override location or reminder behavior anytime.",
    bullets: ["Explore mode spot checks", "Street-cleaning alerts", "Meter expiration reminders", "Tow-away zone warnings", "Color curb detection"],
    caption: "",
  },
  {
    src: "/launch_screenshots/hotspots.png",
    title: "Avoid high-enforcement zones.",
    summary:
      "Ticketless shows you where high-enforcement zones are, so you can avoid them and park safely.",
    bullets: ["High-enforcement zone warnings", "Currently active hotspots","Updated live"],
    caption: "",
  },
  {
    src: "/launch_screenshots/meter_time.png",
    title: "Track limits, paid or unpaid.",
    summary:
      "Review your parking timeline with hourly zone logic and meter expiration reminders to reduce risky parking decisions.",
    bullets: ["1–4 hour limit tracking", "Meter expiration reminders", "Paid-time tracking"],
    caption: "",
  },
  {
    src: "/launch_screenshots/sf_boundary.png",
    title: "Made for San Francisco.",
    summary:
      "By a San Francisco resident, for my fellow San Franciscans.",
    bullets: ["SF boundary warnings", "Live updates", "100% free"],
    caption: "",
  },
]

const CAROUSEL_RADIUS_DESKTOP = 230
const CAROUSEL_RADIUS_MOBILE = 155
const ANGLE_STEP = 360 / screens.length

const keyFeatures = [
  "Auto parking detection (works even when app is closed)",
  "Street-cleaning alerts with complex weekly patterns",
  "Meter expiration reminders + custom paid-time tracking",
  "Hourly time-limit tracking for 1-4 hour zones",
  "Tow-away and construction permit warnings",
  "Color curb detection (red, green, yellow, white, blue, more)",
  "Explore mode to check any spot before parking",
  "Citation hotspots to avoid high enforcement areas",
  "Drag-and-drop parking pin with manual controls",
]

function AppleIcon() {
  return (
    <svg 
      viewBox="0 0 384 512" 
      aria-hidden="true" 
      width="18" 
      height="18"
      style={{ flexShrink: 0 }}
      preserveAspectRatio="xMidYMid meet"
    >
      <path 
        fill="currentColor" 
        d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
      />
    </svg>
  )
}

export function LaunchLanding() {
  const showcaseRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: showcaseRef,
    offset: ["start start", "end end"],
  })

  const snappedRotateTarget = useMotionValue(0)
  const rotateY = useSpring(snappedRotateTarget, {
    stiffness: 100,
    damping: 30,
    mass: 1,
  })
  const rawProgressScale = useTransform(scrollYProgress, [0, 1], [0.12, 1])
  const progressScale = useSpring(rawProgressScale, {
    stiffness: 200,
    damping: 30,
    mass: 0.5,
  })
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)")
    setIsMobile(mq.matches)
    const fn = () => setIsMobile(mq.matches)
    mq.addEventListener("change", fn)
    return () => mq.removeEventListener("change", fn)
  }, [])

  const carouselRadius = isMobile ? CAROUSEL_RADIUS_MOBILE : CAROUSEL_RADIUS_DESKTOP

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    // More responsive step detection - changes happen at 20% through each section
    const totalSections = screens.length
    const progressPerSection = 1 / totalSections
    const currentSection = value / progressPerSection
    const nextIndex = Math.min(totalSections - 1, Math.max(0, Math.floor(currentSection + 0.2)))

    setActiveIndex((prev) => {
      if (prev !== nextIndex) {
        snappedRotateTarget.set(-nextIndex * ANGLE_STEP)
      }
      return nextIndex
    })
  })

  const sectionStyle = {
    "--screen-count": screens.length,
  } as CSSProperties

  const activeScreen = screens[activeIndex]

  return (
    <div className="launch-shell">
      <div className="launch-background" aria-hidden="true">
        <motion.span 
          className="launch-orb launch-orb-one"
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.span 
          className="launch-orb launch-orb-two"
          animate={{
            y: [0, 30, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <section className="hero-grid">
        <motion.div 
          className="hero-copy"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div 
            className="proof-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="proof-brand">
              <span className="proof-mark">
                <Image src="/adaptive_icon.png" alt="Ticketless icon" width={40} height={40} className="proof-mark-icon" />
              </span>
              <div>
                <p className="proof-title">Join Ticketless</p>
                <p className="proof-subtitle">Stop getting tickets for parking in San Francisco</p>
              </div>
            </div>
            <div className="proof-stars" aria-label="Rated five out of five">
              {Array.from({ length: 5 }).map((_, index) => (
                <span key={index}>★</span>
              ))}
            </div>
          </motion.div>

          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Park in SF.
            <br />
            <span>Let Ticketless keep watch.</span>
          </motion.h1>

          <motion.p 
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            A privacy-first parking assistant that tracks local restrictions and notifies you before
            you might get a ticket.
            
          </motion.p>

          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlassButton 
              variant="dark" 
              href={IOS_DOWNLOAD_URL}
              className="ios-button"
            >
              <AppleIcon />
              <span>Download for iOS</span>
            </GlassButton>
          </motion.div>

          <motion.div 
            className="hero-points"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {[
              { label: "TRACK", title: "Smart parking detection" },
              { label: "WARN", title: "Early violation alerts" },
              { label: "MOVE", title: "Avoid tickets and towing" }
            ].map((point, index) => (
              <motion.article
                key={point.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <p>{point.label}</p>
                <h3>{point.title}</h3>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>

        <div className="hero-phones" aria-hidden="true">
          <motion.div 
            className="hero-shot hero-shot-back"
            initial={{ opacity: 0, x: 100, y: -50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ translateX: "25%", translateY: "-12%", rotate: "6deg" }}
          >
            <div className="hero-shot-screen">
              <Image
                src="/launch_screenshots/onboarding.png"
                alt=""
                fill
                className="hero-shot-image"
                sizes="(max-width: 1024px) 250px, 320px"
                priority
              />
            </div>
          </motion.div>
          <motion.div 
            className="hero-shot hero-shot-front"
            initial={{ opacity: 0, x: -100, y: 50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ translateX: "-35%", translateY: "5%", rotate: "-8deg" }}
          >
            <div className="hero-shot-screen">
              <Image
                src="/launch_screenshots/in_location_search.png"
                alt=""
                fill
                className="hero-shot-image"
                sizes="(max-width: 1024px) 300px, 360px"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section ref={showcaseRef} className="showcase-scroll desktop-showcase" style={sectionStyle}>
        <div className="showcase-sticky">
          <div className="showcase-copy showcase-copy-desktop">
            <p className="showcase-label">Scroll to rotate</p>
            <h2>{activeScreen.title}</h2>
            <p>{activeScreen.summary}</p>
            <ul>
              {activeScreen.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="showcase-progress" aria-hidden="true">
              <motion.span style={{ scaleX: progressScale }} />
            </div>
          </div>

          <h2 className="showcase-mobile-title">{activeScreen.title}</h2>

          <div className="carousel-stage" aria-label="Ticketless screenshot carousel">
            <motion.div className="carousel-ring" style={{ rotateY }}>
              {screens.map((screen, index) => (
                <article
                  key={screen.src}
                  className={`carousel-item ${activeIndex === index ? "is-active" : ""}`}
                  style={{ transform: `translate(-50%, -50%) rotateY(${index * ANGLE_STEP}deg) translateZ(${carouselRadius}px)` }}
                >
                  <div className="carousel-shot">
                    <div className="carousel-shot-screen">
                      <Image src={screen.src} alt={screen.title} fill className="carousel-shot-image" sizes="280px" />
                    </div>
                  </div>
                  <p>{screen.caption}</p>
                </article>
              ))}
            </motion.div>
          </div>

          <div className="showcase-mobile-desc">
            <p>{activeScreen.summary}</p>
            <div className="showcase-progress" aria-hidden="true">
              <motion.span style={{ scaleX: progressScale }} />
            </div>
          </div>
        </div>
      </section>

      <motion.section 
        className="launch-cta"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.h2 
          className="cta-headline"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {["FREE.", "No Ads.", "No Accounts.", "FOREVER."].map((line, index) => (
            <motion.span 
              key={index}
              className="cta-line"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.4 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              {line}
            </motion.span>
          ))}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <GlassButton 
            variant="dark" 
            href={IOS_DOWNLOAD_URL}
            className="ios-button-compact"
          >
            <AppleIcon />
            <span>Download for iOS</span>
          </GlassButton>
        </motion.div>
      </motion.section>
    </div>
  )
}
