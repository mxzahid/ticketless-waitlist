import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

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
    const { email, phone } = body

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    const forwarded = request.headers.get("x-forwarded-for")
    const ip = forwarded ? forwarded.split(",")[0] : "unknown"
    const ipHash = await hashIP(ip)

    const supabase = await createClient()

    const { data: existing } = await supabase
      .from("android_waitlist")
      .select("email")
      .eq("email", email)
      .single()

    if (existing) {
      return NextResponse.json({ error: "This email is already on the Android waitlist" }, { status: 400 })
    }

    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    const { data: recentEntries } = await supabase
      .from("android_waitlist")
      .select("id")
      .eq("ip_hash", ipHash)
      .gte("created_at", twentyFourHoursAgo)

    if (recentEntries && recentEntries.length >= 10) {
      return NextResponse.json(
        { error: "Too many entries from this location recently. Please try again later." },
        { status: 429 }
      )
    }

    const { error } = await supabase.from("android_waitlist").insert({
      email,
      phone: phone || null,
      ip_hash: ipHash,
    })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to join waitlist" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
