"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"

export function SwitchDemo() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // ✅ Fix hydration issues (next-themes requirement)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative"
    >
      {/* Sun icon */}
      <Sun
        className={`h-[1.8rem] w-[1.8rem] transition-transform duration-500
        ${theme === "light" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`}
      />

      {/* Moon icon */}
      <Moon
        className={`absolute h-[1.8rem] w-[1.8rem] transition-transform duration-500
        ${theme === "dark" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"}`}
      />

      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
