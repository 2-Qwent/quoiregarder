"use client";

import { useState } from "react";
import MovieCard from "./movieCard";

export default function randomGenerator() {
  const backend = process.env.NEXT_PUBLIC_BACKEND_ADDRESS;

  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {
    setIsLoading(true);
    try {
      const response = await fetch(`${backend}/movies/random`);
      const data = await response.json();
      setMovieData(data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du film aléatoire :",
        error
      );
      alert("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  }

  const movie = movieData ? <MovieCard {...movieData} /> : null;

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 mb-8 border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto">
        {/* Version mobile */}
        <div className="block md:hidden text-center space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Film aléatoire
          </h3>
          <p className="text-sm leading-relaxed text-foreground">
            Pas d'inspiration ? Laissez le
            <span className="font-semibold text-button"> hasard décider</span> !
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Films avec une note de 6+ sur TMDb uniquement
          </p>
        </div>

        {/* Version desktop */}
        <div className="hidden md:block text-center">
          <p className="text-lg leading-relaxed text-foreground">
            Pas d'inspiration ? Laissez le
            <span className="font-semibold text-button"> hasard décider</span> !
          </p>
          <p className="text-base text-gray-600 dark:text-gray-400 mb-2">
            Films avec une note de 6+ sur TMDb uniquement
          </p>
        </div>

        <div className="flex justify-center mt-4 md:mt-0">
          <button
            disabled={isLoading}
            onClick={handleSubmit}
            className={`${
              isLoading
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:opacity-90 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            } bg-button text-white font-bold py-3 px-4 sm:px-6 lg:px-8 rounded-2xl text-sm sm:text-base w-full sm:w-auto max-w-xs sm:max-w-none`}
          >
            {isLoading ? "⏳ Recherche..." : "🎲 Générer un film aléatoire"}
          </button>
        </div>
      </div>
      <div>{movie && movie}</div>
    </>
  );
}
