// app/recommendations/page.tsx (or page.jsx)
import { Suspense } from "react";
import { WatchedMoviesProvider } from "@/components/watched-movies-provider"; // your context provider
import MovieView from "./view-movie"; // new client component
import { LoadingSpinner } from "@/components/loading-spinner";
import { MovieDetails } from "@/app/types/Movie";

async function getMovie(movieName: string) {
    // Simulate or call your real API (must be async)
    try {
        console.log("Fetching movie details for:", movieName);
        const res = await fetch(`https://www.omdbapi.com/?plot=full&apikey=${process.env.OMDB_KEY}&t=${movieName}`);
        if (!res.ok) throw new Error(`Failed to fetch movie: ${movieName}`);
        const data: MovieDetails = await res.json();
        console.log("Fetched movie details:", data);
        return data;
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        return null;
    }
}

interface Props {
    params: {
        movie_name: string;
    };
}

export default async function RecommendationsPage({ params }: Props) {
    const { movie_name } = params;

    let movie: MovieDetails | null = null;
    if (movie_name) {
        movie = await getMovie(movie_name);
    }

    return (
        <WatchedMoviesProvider>
            <Suspense fallback={<LoadingSpinner />}>
                {movie && <MovieView movie={movie} />}
            </Suspense>
        </WatchedMoviesProvider>
    );
}
