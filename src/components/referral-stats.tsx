"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Copy = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  </svg>
)

const Users = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
)

interface ReferralStatsProps {
  referralCode: string
}

export function ReferralStats({ referralCode }: ReferralStatsProps) {
  const [referralCount, setReferralCount] = useState<number>(0)
  const [email, setEmail] = useState<string>("")
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch(`/api/waitlist?code=${referralCode}`)
        if (response.ok) {
          const data = await response.json()
          setReferralCount(data.referralCount)
          setEmail(data.email)
        }
      } catch (error) {
        console.error("Failed to fetch referral stats:", error)
      } finally {
        setLoading(false)
      }
    }

    if (referralCode) {
      fetchStats()
    }
  }, [referralCode])

  const handleCopyLink = async () => {
    const referralLink = `${window.location.origin}?ref=${referralCode}`
    try {
      await navigator.clipboard.writeText(referralLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading...</CardTitle>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="glass border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Your Referral Stats
        </CardTitle>
        <CardDescription>Share your link and track your referrals</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-primary/5 rounded-xl p-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">Total Referrals</p>
          <p className="text-5xl font-bold text-primary">{referralCount}</p>
          <p className="text-xs text-muted-foreground mt-2">
            {referralCount === 0
              ? "Share your link to get started!"
              : `You've referred ${referralCount} ${referralCount === 1 ? "person" : "people"}!`}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="referral-code" className="text-sm font-semibold mb-2 block">
              Your Referral Code
            </Label>
            <div className="bg-background rounded-lg p-4 text-center border border-border">
              <p className="text-2xl font-bold font-mono tracking-wider text-primary">{referralCode}</p>
            </div>
          </div>

          <div>
            <Label htmlFor="referral-link" className="text-sm font-semibold mb-2 block">
              Your Referral Link
            </Label>
            <div className="flex gap-2">
              <Input
                id="referral-link"
                type="text"
                value={`${typeof window !== "undefined" ? window.location.origin : ""}?ref=${referralCode}`}
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
        </div>

        <div className="bg-accent/10 border border-accent/20 rounded-xl p-4">
          <p className="text-sm font-semibold mb-2">🚀 How it works</p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Share your unique referral link with friends</li>
            <li>• When they join the waitlist, you both move up</li>
            <li>• More referrals = earlier access to TICKETLESS</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
