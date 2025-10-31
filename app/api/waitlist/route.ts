import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// Hash IP address for privacy
async function hashIP(ip: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(ip)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, phone, referralCode } = body

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    // Get IP address for duplicate prevention
    const forwarded = request.headers.get("x-forwarded-for")
    const ip = forwarded ? forwarded.split(",")[0] : "unknown"
    const ipHash = await hashIP(ip)

    const supabase = await createClient()

    // Check if email already exists
    const { data: existingEmail } = await supabase.from("waitlist").select("email").eq("email", email).single()

    if (existingEmail) {
      return NextResponse.json({ error: "This email is already on the waitlist" }, { status: 400 })
    }

    // Rate limiting: Check entries from this IP in the last 24 hours (allow up to 5 per day)
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    const { data: recentEntries } = await supabase
      .from("waitlist")
      .select("id")
      .eq("ip_hash", ipHash)
      .gte("created_at", twentyFourHoursAgo)

    if (recentEntries && recentEntries.length >= 10) {
      return NextResponse.json({
        error: "Too many entries from this location recently. Please try again later."
      }, { status: 429 })
    }

    // Validate referral code if provided
    let validReferralCode = null
    if (referralCode) {
      const { data: referrer } = await supabase
        .from("waitlist")
        .select("referral_code")
        .eq("referral_code", referralCode.toUpperCase())
        .single()

      if (referrer) {
        validReferralCode = referralCode.toUpperCase()
      }
    }

    // Insert into waitlist
    const { data, error } = await supabase
      .from("waitlist")
      .insert({
        email,
        phone: phone || null,
        ip_hash: ipHash,
        referred_by: validReferralCode,
      })
      .select("referral_code")
      .single()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to join waitlist" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      referralCode: data.referral_code,
    })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const referralCode = searchParams.get("code")

    if (!referralCode) {
      return NextResponse.json({ error: "Referral code required" }, { status: 400 })
    }

    const supabase = await createClient()

    // Get referral stats
    const { data, error } = await supabase
      .from("waitlist")
      .select("email, referral_count")
      .eq("referral_code", referralCode.toUpperCase())
      .single()

    if (error || !data) {
      return NextResponse.json({ error: "Invalid referral code" }, { status: 404 })
    }

    return NextResponse.json({
      email: data.email,
      referralCount: data.referral_count,
    })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
