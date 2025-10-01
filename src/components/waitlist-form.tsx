"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSearchParams } from "next/navigation"

const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const Loader2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
)

const Copy = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  </svg>
)

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function WaitlistForm() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [referralCode, setReferralCode] = useState<string>("")
  const [userReferralCode, setUserReferralCode] = useState<string>("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const refCode = searchParams?.get("ref")
    if (refCode) {
      setReferralCode(refCode)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Validate email
    if (!email || !isValidEmail(email)) {
      setError("Please enter a valid email address.")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          phone: phone || null,
          referralCode: referralCode || null,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to join waitlist")
      }

      setUserReferralCode(data.referralCode)
      setIsSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyLink = async () => {
    const referralLink = `${window.location.origin}?ref=${userReferralCode}`
    try {
      await navigator.clipboard.writeText(referralLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  if (isSuccess) {
    return (
      <section id="waitlist" className="py-24 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="glass rounded-3xl p-12">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-4">You're on the list!</h3>
              <p className="text-lg text-muted-foreground text-pretty">
                I'll send you an email the moment TICKETLESS launches on the App Store.
              </p>
            </div>

            <div className="border-t border-border pt-8">
              <h4 className="text-xl font-bold mb-3 text-center">
                <span className="gradient-text">Get Early Access</span>
              </h4>
              <p className="text-sm text-muted-foreground text-center mb-6 text-pretty">
                Share TICKETLESS with friends and move up the waitlist. The more friends who join, the earlier you get
                access!
              </p>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="referral-link" className="text-sm font-semibold mb-2 block">
                    Your Referral Link
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="referral-link"
                      type="text"
                      value={`${typeof window !== "undefined" ? window.location.origin : ""}?ref=${userReferralCode}`}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button
                      onClick={handleCopyLink}
                      variant="outline"
                      className="shrink-0 bg-transparent"
                      aria-label="Copy referral link"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                </div>

                <div className="bg-primary/5 rounded-xl p-4 text-center">
                  <p className="text-sm font-semibold text-primary mb-1">Your Referral Code</p>
                  <p className="text-2xl font-bold font-mono tracking-wider">{userReferralCode}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="waitlist" className="py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Join the <span className="gradient-text">Waitlist</span>
          </h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Be the first to know when TICKETLESS launches. No spam, just one email when we go live.
          </p>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 md:p-12">
            <div className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-base font-semibold mb-2 block">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 text-base"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-base font-semibold mb-2 block">
                  Phone Number (Optional)
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(415) 555-0123"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-12 text-base"
                />
                <p className="text-sm text-muted-foreground mt-2">We'll only text you once when the app launches.</p>
              </div>

              {referralCode && (
                <div className="bg-accent/10 border border-accent/20 rounded-xl p-4">
                  <p className="text-sm font-semibold text-accent-foreground mb-1">🎉 You were referred by a friend!</p>
                  <p className="text-xs text-muted-foreground">
                    You'll both get priority access when TICKETLESS launches.
                  </p>
                </div>
              )}

              {error && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 text-base bg-primary hover:bg-primary-dark text-white rounded-xl"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Joining...
                  </>
                ) : (
                  "Join the Waitlist"
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By joining, you agree to receive one email when we launch. I respect your privacy and won't share your
                info.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
