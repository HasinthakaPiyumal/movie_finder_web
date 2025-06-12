import React from 'react'
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
// import { Button } from './ui/button';
import { MovieDetails } from '@/app/types/Movie';
import { useRouter } from 'next/navigation';
import { Star, Calendar } from 'lucide-react';
// import { useWatchedMovies } from './watched-movies-provider';

const MovieCard = ({ movie }: { movie: MovieDetails }) => {
    const router = useRouter();
    // const { watchedMovies, addToWatched, removeFromWatched } = useWatchedMovies();


    // const toggleWatched = (movie: MovieDetails) => {
    //     if (watchedMovies.some((m) => m.imdbID === movie.imdbID)) {
    //         removeFromWatched(movie.id);
    //     } else {
    //         addToWatched(movie);
    //     }
    // };

    // const isWatched = watchedMovies.some((m: MovieDetails) => m.imdbID === movie.imdbID);

    if (!movie.Title) {
        return null; // Skip rendering if Year or Poster is not available
    }
    console.log("Rendering movie card for:", movie.Title);
    return (
        <Card
            key={movie.id}
            className="py-0 group relative overflow-hidden rounded-xl border border-gray-800 shadow-lg hover:shadow-red-900/20 hover:scale-[1.02] transition-all duration-300 ease-out bg-black/20 backdrop-blur-sm"
        >
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-md"></div>

            <CardContent className='relative p-0 overflow-hidden h-[400px]'>
                {/* Watched badge at top-right */}
                {/* {isWatched && (
                    <div className="absolute top-2 right-2 z-20">
                        <Badge className="bg-red-500/90 text-white border-0 px-2 py-1">
                            <Eye className="h-3 w-3 mr-1" />
                            Watched
                        </Badge>
                    </div>
                )} */}

                {/* Poster Image with overlay gradient */}
                <div className="relative h-full cursor-pointer" onClick={() => router.push(`/movie/${movie.Title}`)}>
                    <img
                        src={movie.Poster || "/placeholder.svg"}
                        alt={movie.Title}
                        className="cursor-pointer h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"

                    />

                    {/* First overlay - bottom details */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-90"></div>

                    {/* Content overlay */}
                    <div className='absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out'>
                        {/* Movie info */}
                        <div className="space-y-1">
                            <div className="flex items-center justify-between">
                                <Badge className="bg-red-500/20 text-red-300 border-red-500/30 text-xs hover:bg-red-500/30 transition-colors">
                                    {movie.Genre?.split(",")[0] || "Unknown"}
                                </Badge>

                                {movie.imdbRating && (
                                    <div className="flex items-center gap-1">
                                        <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                                        <span className="text-xs font-medium text-yellow-100">{movie.imdbRating}</span>
                                    </div>
                                )}
                            </div>

                            <h3
                                onClick={() => router.push(`/movie/${movie.Title}`)}
                                className="text-lg font-bold text-white cursor-pointer leading-tight line-clamp-2 hover:text-red-300 transition-colors duration-200"
                            >
                                {movie.Title}
                            </h3>

                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <Calendar className="h-3 w-3" />
                                <span>{movie.Year}</span>
                            </div>
                        </div>

                        {/* Button - initially hidden then slides up */}
                        {/* <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                            <Button
                                size="sm"
                                className={`w-full cursor-pointer ${isWatched
                                    ? "bg-gray-700/60 text-gray-300 hover:bg-gray-700/80"
                                    : "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 border-0"
                                    }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleWatched(movie);
                                }}
                            >
                                {isWatched ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                                {isWatched ? "Remove from Watched" : "Mark as Watched"}
                            </Button>
                        </div> */}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default MovieCard