"use client"

import { IconDotsVertical } from "@tabler/icons-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { useClerk, useUser } from "@clerk/nextjs"
import { dark } from '@clerk/themes'
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function NavUser() {
  const { isMobile } = useSidebar()
  const { openUserProfile } = useClerk()
  const { theme } = useTheme()
  const { user: clerkUser, isLoaded } = useUser();
  const [mounted, setMounted] = useState(false)

  // Ensure component only renders user data after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const appearance = {
    baseTheme: theme === "dark" ? dark : undefined,
  }

  // Show loading state during SSR and initial client render
  if (!mounted || !isLoaded) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Avatar className="h-8 w-8 rounded-lg grayscale">
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Loading...</span>
              <span className="text-muted-foreground truncate text-xs">
                Loading...
              </span>
            </div>
            <IconDotsVertical className="ml-auto size-4" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              onClick={() => openUserProfile({ appearance: {
                baseTheme: theme === "dark" ? dark : undefined,
              } })}
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={clerkUser?.imageUrl || ""} alt={clerkUser?.fullName || ""} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{clerkUser?.fullName || "User"}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {clerkUser?.primaryEmailAddress?.emailAddress || ""}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
