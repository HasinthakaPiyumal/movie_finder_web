"use client"

import posthog from "posthog-js"
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react"
import { Suspense, useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

function SuspendedPostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { posthog: ph, loaded } = usePostHog()

  useEffect(() => {
    if (!loaded) return
    ph.capture('$pageview', { path: pathname + searchParams.toString() })
  }, [loaded, ph, pathname, searchParams])

  return null
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: "/ingest",
      ui_host: "https://us.posthog.com",
      capture_pageview: 'history_change',
      capture_pageleave: true, // Enable pageleave capture
      capture_exceptions: true, // Enable exception tracking
      debug: process.env.NODE_ENV === "development",
    })
  }, [])

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <SuspendedPostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  )
}
