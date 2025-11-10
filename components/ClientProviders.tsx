"use client"
import React from "react"
import ClientClerkProvider from "@/components/ClientClerkProvider"

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return <ClientClerkProvider>{children}</ClientClerkProvider>
}
