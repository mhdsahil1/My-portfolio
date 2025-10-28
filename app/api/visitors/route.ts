import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("visitors")
      .select("*")
      .order("visited_at", { ascending: false })
      .limit(100)

    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("[v0] Error fetching visitors:", error)
    return NextResponse.json({ error: "Failed to fetch visitors" }, { status: 500 })
  }
}
