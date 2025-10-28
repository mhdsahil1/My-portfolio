"use client"

import { useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

export function GeolocationTracker() {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Request geolocation permission
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords

              // Get location data from IP geolocation API
              const geoResponse = await fetch(`https://ipapi.co/json/`)
              const geoData = await geoResponse.json()

              // Store visitor data in Supabase
              const supabase = createClient()
              await supabase.from("visitors").insert({
                ip_address: geoData.ip,
                country: geoData.country_name,
                city: geoData.city,
                latitude: latitude,
                longitude: longitude,
                user_agent: navigator.userAgent,
              })
            },
            (error) => {
              // If geolocation fails, still track with IP-based location
              trackWithIPOnly()
            },
          )
        } else {
          trackWithIPOnly()
        }
      } catch (error) {
        console.error("[v0] Error tracking visitor:", error)
      }
    }

    const trackWithIPOnly = async () => {
      try {
        const geoResponse = await fetch(`https://ipapi.co/json/`)
        const geoData = await geoResponse.json()

        const supabase = createClient()
        await supabase.from("visitors").insert({
          ip_address: geoData.ip,
          country: geoData.country_name,
          city: geoData.city,
          user_agent: navigator.userAgent,
        })
      } catch (error) {
        console.error("[v0] Error tracking visitor with IP:", error)
      }
    }

    trackVisitor()
  }, [])

  return null
}
