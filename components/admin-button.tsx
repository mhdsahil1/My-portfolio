"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"
import { AdminLoginModal } from "./admin-login-modal"

export function AdminButton() {
  const [showLoginModal, setShowLoginModal] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowLoginModal(true)}
        className="fixed bottom-4 right-4 z-30 rounded-full gap-2"
      >
        <Lock className="h-4 w-4" />
        Admin
      </Button>

      <AdminLoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  )
}
