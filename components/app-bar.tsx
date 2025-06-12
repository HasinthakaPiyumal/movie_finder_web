"use client"

import { useRouter } from "next/navigation"
import { Film } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { useWatchedMovies } from "@/components/watched-movies-provider"

export function AppBar() {
  const router = useRouter()
  // const pathname = usePathname()
  // const { watchedMovies } = useWatchedMovies()

  return (
    <header className="border-b border-gray-800/50 bg-gray-900/50 backdrop-blur-xl relative z-20">
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-pink-500/5"></div>
      <div className="container max-w-7xl mx-auto h-16 flex items-center justify-between relative">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => router.push("/")}>
          <div className="p-1 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-lg group-hover:from-red-500/30 group-hover:to-pink-500/30 transition-all">
            <Film className="h-6 w-6 text-red-400" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            MovieFinder
          </span>
        </div>
        {/* 
        <nav className="hidden md:flex items-center gap-6">
          <Button
            variant={pathname === "/" ? "default" : "ghost"}
            onClick={() => router.push("/")}
            className={
              pathname === "/"
                ? "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 border-0"
                : "text-gray-300 hover:text-white hover:bg-gray-800/50"
            }
          >
            Home
          </Button>
          <Button
            variant={pathname === "/watched" ? "default" : "ghost"}
            onClick={() => router.push("/watched")}
            className={`flex items-center gap-2 ${
              pathname === "/watched"
                ? "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 border-0"
                : "text-gray-300 hover:text-white hover:bg-gray-800/50"
            }`}
          >
            <Eye className="h-4 w-4" />
            Watched
            {watchedMovies.length > 0 && (
              <Badge className="ml-1 bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-300 border-red-500/30">
                {watchedMovies.length}
              </Badge>
            )}
          </Button>
        </nav> */}

        {/* <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-300 hover:text-white hover:bg-gray-800/50"
            onClick={() => router.push("/watched")}
          >
            <Eye className="h-4 w-4" />
            {watchedMovies.length > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-gradient-to-r from-red-500 to-rose-600 text-white border-0">
                {watchedMovies.length}
              </Badge>
            )}
          </Button>
        </div> */}
      </div>
    </header>
  )
}
