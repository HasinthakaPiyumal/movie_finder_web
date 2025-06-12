"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, Star, Clock, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
// import { useWatchedMovies } from "@/components/watched-movies-provider"
import { MovieDetails } from "@/app/types/Movie"

export default function MovieDetailsPage({ movie }: { movie: MovieDetails }) {
  const router = useRouter()
  // const { watchedMovies, addToWatched, removeFromWatched } = useWatchedMovies()


  // const toggleWatched = () => {
  //   if (movie) {
  //     if (watchedMovies.some((m) => m.id === movie.id)) {
  //       removeFromWatched(movie.id)
  //     } else {
  //       addToWatched(movie)
  //     }
  //   }
  // }

  if (!movie) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-400">Movie not found</p>
        <Button
          variant="outline"
          className="mt-4 border-gray-700 text-gray-300 hover:bg-gray-800"
          onClick={() => router.push("/")}
        >
          Go Home
        </Button>
      </div>
    )
  }

  // const isWatched = watchedMovies.some((m) => m.id === movie.id)

  return (
    <div className="space-y-8 max-w-7xl mx-auto ">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-800/50"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      {/* Header Section */}
      <div className="grid md:grid-cols-[350px_1fr] gap-8">
        <div className="space-y-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-red-500/20 to-transparent rounded-xl blur-xl"></div>
            <div className="relative">
              <img
                src={movie.Poster || "/placeholder.svg"}
                alt={movie.Title}
                className="w-full rounded-xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
              />
              {/* {isWatched && (
                <div className="absolute top-3 right-3">
                  <Badge className="bg-gradient-to-r from-red-500 to-rose-600 text-white border-0">
                    <Eye className="h-3 w-3 mr-1" />
                    Watched
                  </Badge>
                </div>
              )} */}
            </div>
          </div>
          {/* <div className="flex flex-col gap-3">
            <Button
              onClick={toggleWatched}
              className={`flex items-center gap-2 ${isWatched
                ? "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                : "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 border-0"
                }`}
            >
              {isWatched ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {isWatched ? "Mark as Unwatched" : "Mark as Watched"}
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 border-gray-700 text-gray-300 hover:bg-gray-800/50"
            >
              <Play className="h-4 w-4" />
              Watch Trailer
            </Button>
          </div> */}
        </div>

        <div className="space-y-8">
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-xl blur-xl"></div>
              <div className="relative">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {movie.Title}
                </h1>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Badge className="bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-300 border-red-500/30 text-sm px-3 py-1">
                {movie.Genre}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <Calendar className="h-4 w-4" />
                {movie.Year}
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <Clock className="h-4 w-4" />
                {movie.Runtime}
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-red-400 text-red-400" />
                <span className="text-white">{movie.imdbRating}/10</span>
                <span className="text-gray-400">IMDb</span>
              </div>
            </div>
          </div>

          <Separator className="bg-gradient-to-r from-red-500/20 to-pink-500/20" />

          {/* Description Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Plot Summary</h2>
            <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
          </div>

          <Separator className="bg-gradient-to-r from-red-500/20 to-pink-500/20" />

          {/* Cast Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Cast</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {movie.Actors.split(",").map((actor: string, index: number) => (
                <Card key={index} className="bg-gray-900/50 backdrop-blur-xl border-gray-700/50">
                  <CardContent className="p-3">
                    <p className="text-sm font-medium text-gray-300">{actor}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator className="bg-gradient-to-r from-red-500/20 to-pink-500/20" />

          {/* Crew Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Crew</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="font-medium text-white">Director</p>
                <p className="text-gray-300">{movie.Director}</p>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-white">Writer</p>
                <p className="text-gray-300">{movie.Writer}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
