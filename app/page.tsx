// app/recommendations/page.tsx (or page.jsx)
import { Suspense } from "react";
import { WatchedMoviesProvider } from "@/components/watched-movies-provider"; // your context provider
import Home from "./home-page"; // new client component
import { LoadingSpinner } from "@/components/loading-spinner";
import { MovieDetails } from "@/app/types/Movie";

async function getMovies() {
    // Simulate or call your real API (must be async)
    try {
        const res = await fetch(`${process.env.BASE_URL}/get-movies?favorite=2025&n_recommendations=4`, {
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.SYSTEM_KEY || ""
            }
        });
        console.log("Fetching trending movies...", res);

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        // console.log("Fetched data:", data);
        const movies: MovieDetails[] = await Promise.all(
            data.recommended_movies.map(async (movieName: string) => {
                const res = await fetch(`https://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&t=${encodeURIComponent(movieName)}`);
                if (!res.ok) throw new Error(`Failed to fetch movie: ${movieName}`);
                const data: MovieDetails = await res.json();
                // console.log("Fetched movie details:", data);
                return data;
            })
        );
        console.log("Fetched movies:", movies);
        return movies;
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        return [];
    }
}

export default async function HomePage() {

    let trending: MovieDetails[] = [];
    trending = await getMovies();
    console.log("Trending movies fetched:", trending);

    return (
        <WatchedMoviesProvider>
            <Suspense fallback={<LoadingSpinner />}>
                {trending && <Home trending={trending} />}
            </Suspense>
        </WatchedMoviesProvider>
    );
}
