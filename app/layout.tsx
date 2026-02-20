import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"

const kortaki = localFont({
  src: [
    {
      path: '../public/fonts/Kortaki-ExtraBold.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-kortaki',
  display: 'swap',
  fallback: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
})

export const metadata: Metadata = {
  title: "TICKETLESS",
  description:
    "Privacy-first iOS parking assistant with street-cleaning and tow-window alerts.",
  icons: {
    icon: [{ url: "/adaptive_icon.png", type: "image/png" }],
    apple: [{ url: "/adaptive_icon.png", type: "image/png" }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`antialiased ${kortaki.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
