"use client";
import { useState } from "react";
import MovieCard from "./movieCard";

export default function Form() {
  const backend = process.env.NEXT_PUBLIC_BACKEND_ADDRESS

  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [minRuntime, setMinRuntime] = useState("");
  const [maxRuntime, setMaxRuntime] = useState("");
  const [genre1, setGenre1] = useState("");
  const [genre2, setGenre2] = useState("");
  const [moviesData, setMoviesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function GenreSelect({ id, value, onChange, className }) {
    return (
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className={className}
      >
        <option value="">--Choisir un genre--</option>
        <option value="28">Action</option>
        <option value="12">Aventure</option>
        <option value="16">Animation</option>
        <option value="35">Comédie</option>
        <option value="80">Crime</option>
        <option value="99">Documentaire</option>
        <option value="18">Drame</option>
        <option value="10751">Familial</option>
        <option value="14">Fantastique</option>
        <option value="36">Histoire</option>
        <option value="27">Horreur</option>
        <option value="10402">Musique</option>
        <option value="9648">Mystère</option>
        <option value="10749">Romance</option>
        <option value="878">Science-Fiction</option>
        <option value="10770">Téléfilm</option>
        <option value="53">Thriller</option>
        <option value="10752">Guerre</option>
        <option value="37">Western</option>
      </select>
    );
  }

  async function handleSubmit() {
    setIsLoading(true);
    if (
      !genre1 ||
      !genre2 ||
      !startYear ||
      !endYear ||
      !minRuntime ||
      !maxRuntime
    ) {
      alert("Tous les critères doivent être remplis.");
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch(`${backend}/movies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          genres: [genre1, genre2],
          startYear,
          endYear,
          minRuntime,
          maxRuntime,
        }),
      });
      const data = await response.json();
      if (data.error) {
        alert(data.message || "Une erreur s'est produite. Veuillez réessayer.");
        setMoviesData([]);
        return;
      }
      setMoviesData(data);
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire :", error);
      alert("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  }

  const movies = moviesData.map((movie, i) => {
    return <MovieCard key={i} {...movie} />;
  });

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 mb-8 border border-gray-200 dark:border-gray-700">
        {/* Version mobile - layout vertical */}
        <div className="block md:hidden space-y-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">Critères de recherche</h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Premier genre</label>
              <GenreSelect
                id="genre1"
                value={genre1}
                onChange={(e) => setGenre1(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-button focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Second genre</label>
              <GenreSelect
                id="genre2"
                value={genre2}
                onChange={(e) => setGenre2(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-button focus:border-transparent"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Année début</label>
                <input
                  type="number"
                  placeholder="2000"
                  value={startYear}
                  onChange={(e) => setStartYear(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-center text-foreground focus:outline-none focus:ring-2 focus:ring-button focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Année fin</label>
                <input
                  type="number"
                  placeholder="2010"
                  value={endYear}
                  onChange={(e) => setEndYear(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-center text-foreground focus:outline-none focus:ring-2 focus:ring-button focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Durée min</label>
                <input
                  type="number"
                  placeholder="90"
                  value={minRuntime}
                  onChange={(e) => setMinRuntime(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-center text-foreground focus:outline-none focus:ring-2 focus:ring-button focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Durée max</label>
                <input
                  type="number"
                  placeholder="150"
                  value={maxRuntime}
                  onChange={(e) => setMaxRuntime(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-center text-foreground focus:outline-none focus:ring-2 focus:ring-button focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Version desktop - layout en ligne */}
        <div className="hidden md:block">
          <p className="text-base lg:text-lg leading-relaxed text-foreground">
            Je veux regarder un film dans le genre{" "}
            <span className="inline-block mx-1">
              <GenreSelect
                id="genre1"
                value={genre1}
                onChange={(e) => setGenre1(e.target.value)}
                className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-button focus:border-transparent"
              />
            </span>{" "}
            et{" "}
            <span className="inline-block mx-1">
              <GenreSelect
                id="genre2"
                value={genre2}
                onChange={(e) => setGenre2(e.target.value)}
                className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-button focus:border-transparent"
              />
            </span>
            , sorti entre{" "}
            <span className="inline-block mx-1">
              <input
                type="number"
                placeholder="2000"
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
                className="w-20 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-center text-foreground focus:outline-none focus:ring-2 focus:ring-button focus:border-transparent"
              />
            </span>{" "}
            et{" "}
            <span className="inline-block mx-1">
              <input
                type="number"
                placeholder="2010"
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
                className="w-20 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-center text-foreground focus:outline-none focus:ring-2 focus:ring-button focus:border-transparent"
              />
            </span>
            , d'une durée comprise entre{" "}
            <span className="inline-block mx-1">
              <input
                type="number"
                placeholder="90"
                value={minRuntime}
                onChange={(e) => setMinRuntime(e.target.value)}
                className="w-16 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-center text-foreground focus:outline-none focus:ring-2 focus:ring-button focus:border-transparent"
              />
            </span>{" "}
            et{" "}
            <span className="inline-block mx-1">
              <input
                type="number"
                placeholder="150"
                value={maxRuntime}
                onChange={(e) => setMaxRuntime(e.target.value)}
                className="w-16 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-center text-foreground focus:outline-none focus:ring-2 focus:ring-button focus:border-transparent"
              />
            </span>{" "}
            minutes.
          </p>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`${
              isLoading 
                ? 'opacity-50 cursor-not-allowed' 
                : 'cursor-pointer hover:opacity-90 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl'
            } bg-button text-white font-bold py-3 px-4 sm:px-6 lg:px-8 rounded-2xl text-sm sm:text-base w-full sm:w-auto`}
          >
            {isLoading ? '⏳ Recherche...' : '🎬 Propose moi des films'}
          </button>
        </div>
      </div>
      <div>{movies.length > 0 && movies}</div>
    </>
  );
}