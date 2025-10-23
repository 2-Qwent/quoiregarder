"use client";

import { useState } from "react";
import MovieCard from "./movieCard";

export default function randomGenerator() {
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {
    setIsLoading(true);
    try {
      console.log("📡 Envoi de la requête vers:", "https://quoiregarder-back.vercel.app/movies/random");
      const response = await fetch("https://quoiregarder-back.vercel.app/movies/random");
      const data = await response.json();
      console.log("Film aléatoire reçu :", data);
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
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8 border border-gray-200 dark:border-gray-700">
        <p className="text-lg leading-relaxed text-foreground mb-6">
          Pas d'inspiration ? Laissez le
          <span className="font-semibold text-button">
            {" "}
            hasard décider
          </span>{" "}
          ! On est gentil, on a pris uniquement des films avec une note moyenne de 6
          ou plus sur TMDB !
        </p>
        <div className="flex justify-center">
          <button
            disabled={isLoading}
            onClick={handleSubmit}
            className={`${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-90 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl'}  bg-button text-white font-bold py-3 px-8 rounded-2xl `}
          >
            {isLoading ? '⏳ Recherche...' : '🎲 Générer un film aléatoire'}
          </button>
        </div>
      </div>
      <div>{movie && movie}</div>
    </>
  );
}
