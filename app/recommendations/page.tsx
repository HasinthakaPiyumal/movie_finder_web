// app/recommendations/page.tsx (or page.jsx)
import { Suspense } from "react";
import { WatchedMoviesProvider } from "@/components/watched-movies-provider"; // your context provider
import RecommendationsList from "./recommendation-list"; // new client component
import { LoadingSpinner } from "@/components/loading-spinner";
import { MovieDetails } from "../types/Movie";

async function getRecommendations(query: string) {
  // Simulate or call your real API (must be async)
  try {
    const res = await fetch(`http://localhost:8000/get-movies?favorite=${query}&n_recommendations=40`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.SYSTEM_KEY || ""
      }
    });

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    const movies: MovieDetails[] = await Promise.all(
      data.recommended_movies.map(async (movieName: string) => {
        const res = await fetch(`https://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&t=${encodeURIComponent(movieName)}`);
        if (!res.ok) throw new Error(`Failed to fetch movie: ${movieName}`);
        const data: MovieDetails = await res.json();
        console.log("Fetched movie details:", data);
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

interface Props {
  searchParams: { query?: string };
}

export default async function RecommendationsPage({ searchParams }: Props) {
  const query = searchParams.query ?? "";

  let recommendations: MovieDetails[] = [];
  if (query) {
    recommendations = await getRecommendations(query);
    console.log("Recommendations fetched:", recommendations);
  }

  console.log("Query:", query);
  console.log("Recommendations:", recommendations);
  return (
    <WatchedMoviesProvider>
      <Suspense fallback={<LoadingSpinner />}>
        <RecommendationsList query={query} recommendations={recommendations} />
      </Suspense>
    </WatchedMoviesProvider>
  );
}
