import { ReferralStats } from "@/components/referral-stats"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Referral Stats - TICKETLESS",
  description: "Track your referrals and share TICKETLESS with friends",
}

export default async function ReferralsPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>
}) {
  const params = await searchParams
  const referralCode = params.code

  if (!referralCode) {
    redirect("/")
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="map-bg fixed inset-0 opacity-30 pointer-events-none" />
      <div className="relative z-10 py-24 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your <span className="gradient-text">Referral Dashboard</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Share TICKETLESS with friends and get early access
            </p>
          </div>

          <ReferralStats referralCode={referralCode} />
        </div>
      </div>
    </main>
  )
}
