"use client"

import { useRouter } from "next/navigation"
import { Eye, Trash2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useWatchedMovies } from "@/components/watched-movies-provider"

export default function WatchedMoviesPage() {
  const router = useRouter()
  const { watchedMovies, removeFromWatched } = useWatchedMovies()

  const handleMovieClick = (movieId: number) => {
    router.push(`/movie/${movieId}`)
  }

  return (
    <div className="space-y-8">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-xl blur-xl"></div>
        <div className="relative flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-lg">
            <Eye className="h-6 w-6 text-red-400" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Your Watched Movies
          </h1>
          <Badge className="bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-300 border-red-500/30">
            {watchedMovies.length} movies
          </Badge>
        </div>
      </div>

      {watchedMovies.length === 0 ? (
        <div className="text-center py-16 space-y-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
            <div className="relative text-8xl">🎬</div>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-white">No watched movies yet</h2>
            <p className="text-gray-400 max-w-md mx-auto">
              Start exploring and mark movies as watched to see them here
            </p>
          </div>
          <Button
            onClick={() => router.push("/")}
            className="mt-6 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 border-0"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Discover Movies
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {watchedMovies.map((movie, index) => (
            <Card
              key={movie.id}
              className="group transition-all duration-500 hover:scale-105 bg-gray-900/50 backdrop-blur-xl border-gray-700/50 hover:border-red-500/50 overflow-hidden"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <CardContent className="p-0 relative">
                <div className="relative overflow-hidden">
                  <img
                    src={movie.Poster || "/placeholder.svg"}
                    alt={movie.Title}
                    className="w-full h-64 object-cover cursor-pointer transition-transform duration-500 group-hover:scale-110"
                    onClick={() => handleMovieClick(movie.id)}
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-gradient-to-r from-red-500 to-rose-600 text-white border-0">
                      <Eye className="h-3 w-3 mr-1" />
                      Watched
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-4">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-white/10 backdrop-blur-md text-white border-white/20 hover:bg-white/20"
                      onClick={() => handleMovieClick(movie.id)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="cursor-pointer" onClick={() => handleMovieClick(movie.id)}>
                    <h3 className="font-semibold line-clamp-1 text-white hover:text-red-400 transition-colors">
                      {movie.Title}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <Badge className="bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-300 border-red-500/30">
                        {movie.Genre}
                      </Badge>
                      <span className="text-sm text-gray-400">{movie.Year}</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFromWatched(movie.id)
                    }}
                    className="flex items-center gap-1 w-full bg-gradient-to-r from-red-600/80 to-rose-700/80 hover:from-red-700 hover:to-rose-800 border-0"
                  >
                    <Trash2 className="h-3 w-3" />
                    Remove from Watched
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
