'use client'

import { ReactNode } from 'react'
import { ClerkProvider } from '@clerk/nextjs'

export default function ClientClerkProvider({ children }: { children: ReactNode }) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  return (
    <ClerkProvider publishableKey={publishableKey}>
      {children}
    </ClerkProvider>
  )
}


