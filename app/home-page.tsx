"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, TrendingUp, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MovieDetails } from "./types/Movie"
import MovieCard from "@/components/movie-card"
// import ClientSmokeCursor from "@/components/client-smoke-cursor"

export default function HomePage({ trending }: { trending: MovieDetails[] }) {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const [isFocused, setIsFocused] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/recommendations?query=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="space-y-12">
      {/* <ClientSmokeCursor /> */}
      {/* Hero Section */}

      <div className="text-center space-y-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-rose-500/5 to-pink-500/10 rounded-3xl blur-3xl"></div>
        <div className="relative space-y-6 h-[300px] flex flex-col items-center justify-center">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-8 w-8 text-red-400 animate-pulse" />
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-red-400 via-rose-400 to-pink-400 bg-clip-text text-transparent">
                MovieFinder
              </h1>
              <Sparkles className="h-8 w-8 text-pink-400 animate-pulse" />
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover your next favorite film with AI-powered recommendations
            </p>
          </div>

          {/* Search Section */}
          <form onSubmit={handleSearch} className="max-w-2xl w-[100%] mx-auto">
            <div className="search-wrapper relative">
              <div className={`absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500' ${isFocused ? 'opacity-90' : 'opacity-20'} rounded-xl blur-xl transition-all duration-500`}></div>
              <div className="relative flex gap-3 p-2 bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl">
                <div className="relative flex-1 pointer-events-auto">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Enter movie name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}

                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="pl-12 h-14 text-lg bg-transparent border-0 focus-visible:ring-0 text-white placeholder:text-gray-400"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="h-14 px-8 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 border-0"
                >
                  Find Recommendations
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Trending Movies Section */}
      <div className="space-y-8 max-w-7xl mx-auto ">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-lg">
            <TrendingUp className="h-6 w-6 text-red-400" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Trending Now
          </h2>
        </div>

        <div className="grid max-w-7xl mx-auto grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {trending.map((movie, index) => {
            return <MovieCard key={index} movie={movie} />;
          })}
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingMovies.map((movie, index) => (
            <Card
              key={movie.id}
              className="group cursor-pointer transition-all duration-500 hover:scale-105 bg-gray-900/50 backdrop-blur-xl border-gray-700/50 hover:border-red-500/50 overflow-hidden pointer-events-auto"
              onClick={() => handleMovieClick(movie.id)}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <CardContent className="p-0 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-red-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                <div className="relative overflow-hidden">
                  <img
                    src={movie.poster || "/placeholder.svg"}
                    alt={movie.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-4">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-white/10 backdrop-blur-md text-white border-white/20 hover:bg-white/20"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <h3 className="font-semibold line-clamp-1 text-white group-hover:text-red-400 transition-colors">
                    {movie.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-300 border-red-500/30">
                      {movie.genre}
                    </Badge>
                    <span className="text-sm text-gray-400">{movie.year}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div> */}
      </div>
    </div>
  )
}
