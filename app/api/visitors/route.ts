import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    console.log("[v0] API Route - Checking env vars...")
    console.log("[v0] SUPABASE_URL:", supabaseUrl ? "✓ Set" : "✗ Missing")
    console.log("[v0] SERVICE_ROLE_KEY:", serviceRoleKey ? "✓ Set" : "✗ Missing")

    if (!supabaseUrl || !serviceRoleKey) {
      console.error("[v0] Missing Supabase environment variables")
      return NextResponse.json(
        { 
          error: "Missing environment variables", 
          debug: {
            hasUrl: !!supabaseUrl,
            hasKey: !!serviceRoleKey
          }
        }, 
        { status: 500 }
      )
    }

    console.log("[v0] Creating Supabase client...")
    const supabase = createClient(supabaseUrl, serviceRoleKey)

    console.log("[v0] Querying visitors table...")
    const { data, error } = await supabase
      .from("visitors")
      .select("*")
      .order("visited_at", { ascending: false })
      .limit(100)

    if (error) {
      console.error("[v0] Supabase query error:", error)
      return NextResponse.json(
        { 
          error: "Failed to fetch visitors", 
          details: error.message,
          code: error.code
        }, 
        { status: 500 }
      )
    }

    console.log("[v0] Successfully fetched visitors:", data?.length || 0)
    
    // Ensure we're returning proper JSON
    const responseData = Array.isArray(data) ? data : []
    return NextResponse.json({ visitors: responseData, count: responseData.length })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    const errorStack = error instanceof Error ? error.stack : ""
    console.error("[v0] Unexpected error in GET /api/visitors:", errorMessage)
    console.error("[v0] Stack trace:", errorStack)
    
    return NextResponse.json(
      { 
        error: "Unexpected error", 
        message: errorMessage,
        timestamp: new Date().toISOString()
      }, 
      { status: 500 }
    )
  }
}
