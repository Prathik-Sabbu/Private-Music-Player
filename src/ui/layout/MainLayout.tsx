import React from "react"
import { PlayerBar } from "./PlayerBar"

export function MainLayout({children}: { children: React.ReactNode }){
    return (
    <div>
      <main>{children}</main>
      <PlayerBar />
    </div>
  )
}