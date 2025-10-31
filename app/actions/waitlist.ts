"use server"

import { createClient } from "@/lib/supabase/server"
import { headers } from "next/headers"

interface WaitlistFormData {
  email: string
  phone?: string
}

interface WaitlistResponse {
  success: boolean
  error?: string
}

async function hashIP(ip: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(ip)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  return hashHex
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate phone format (optional, basic validation)
function isValidPhone(phone: string): boolean {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, "")
  // Check if it's 10 or 11 digits (US format)
  return digits.length === 10 || digits.length === 11
}

export async function submitWaitlist(data: WaitlistFormData): Promise<WaitlistResponse> {
  try {
    // Validate email
    if (!data.email || !isValidEmail(data.email)) {
      return { success: false, error: "Please enter a valid email address." }
    }

    // Validate phone if provided
    if (data.phone && data.phone.trim() !== "" && !isValidPhone(data.phone)) {
      return { success: false, error: "Please enter a valid phone number." }
    }

    // Get IP address for rate limiting
    const headersList = await headers()
    const forwardedFor = headersList.get("x-forwarded-for")
    const realIP = headersList.get("x-real-ip")
    const ip = forwardedFor?.split(",")[0] || realIP || "unknown"
    const ipHash = await hashIP(ip)

    const supabase = await createClient()

    // Rate limiting: Check entries from this IP in the last 24 hours (allow up to 5 per day)
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    const { data: recentSubmissions, error: rateLimitError } = await supabase
      .from("waitlist")
      .select("id")
      .eq("ip_hash", ipHash)
      .gte("created_at", twentyFourHoursAgo)

    if (rateLimitError) {
      console.error("[v0] Rate limit check error:", rateLimitError)
      return { success: false, error: "Something went wrong. Please try again later." }
    }

    if (recentSubmissions && recentSubmissions.length >= 5) {
      return {
        success: false,
        error: "Too many entries from this location recently. Please try again later.",
      }
    }

    // Insert into waitlist
    const { error: insertError } = await supabase.from("waitlist").insert({
      email: data.email.toLowerCase().trim(),
      phone: data.phone?.trim() || null,
      ip_hash: ipHash,
    })

    if (insertError) {
      console.error("[v0] Insert error:", insertError)

      // Check if it's a duplicate email error
      if (insertError.code === "23505") {
        return {
          success: false,
          error: "This email is already on the waitlist. Check your inbox for updates!",
        }
      }

      return { success: false, error: "Something went wrong. Please try again later." }
    }

    return { success: true }
  } catch (error) {
    console.error("[v0] Waitlist submission error:", error)
    return { success: false, error: "Something went wrong. Please try again later." }
  }
}
