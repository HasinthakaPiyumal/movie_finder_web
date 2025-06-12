"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import { MovieDetails } from "../types/Movie";
import MovieCard from "@/components/movie-card";

export default function RecommendationsList({ query, recommendations }: { query: string; recommendations: MovieDetails[] }) {
    const router = useRouter();


    if (!query) {
        return <p>Please enter a search query.</p>;
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => router.back()} className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Button>
                <div>
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-6 w-6 text-red-400" />
                        <h1 className="text-4xl font-bold">Recommended for You</h1>
                    </div>
                    <p>Based on &quot;{query}&quot;</p>
                </div>
            </div>

            {recommendations.length === 0 ? (
                <div className="text-center py-12">
                    <p>No recommendations found for &quot;{query}&quot;</p>
                    <Button onClick={() => router.push("/")}>Try Another Search</Button>
                </div>
            ) : (
                <div className="grid max-w-7xl mx-auto grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {recommendations.map((movie, index) => {
                        return <MovieCard key={index} movie={movie} />;
                    })}
                </div>
            )}
        </div>
    );
}
