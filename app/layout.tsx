import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { PostHogProvider } from "@/components/PostHogProvider"
import { WatchedMoviesProvider } from "@/components/watched-movies-provider"
import { AppBar } from "@/components/app-bar"
import { BackgroundEffects } from "@/components/background-effects"
// import ClientSmokeCursor from "@/components/client-smoke-cursor"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MovieFinder - Discover Your Next Favorite Film",
  description: "Find movie recommendations based on your preferences",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PostHogProvider>
          <WatchedMoviesProvider>
            <div className="min-h-screen bg-background relative overflow-hidden">
              <BackgroundEffects />
              <AppBar />
              <main className="container mx-auto px-4 py-8 relative z-10">
                {children}
              </main>
            </div>
          </WatchedMoviesProvider>
        </PostHogProvider>
      </body>
    </html>
  )
}