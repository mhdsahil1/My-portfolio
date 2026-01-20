import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceRoleKey) {
      console.error("[v0] Missing Supabase environment variables")
      return NextResponse.json({ error: "Missing environment variables" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey)

    const { data, error } = await supabase
      .from("visitors")
      .select("*")
      .order("visited_at", { ascending: false })
      .limit(100)

    if (error) {
      console.error("[v0] Supabase query error:", error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("[v0] Successfully fetched visitors:", data?.length || 0)
    return NextResponse.json(data || [])
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error("[v0] Unexpected error in GET /api/visitors:", errorMessage)
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
