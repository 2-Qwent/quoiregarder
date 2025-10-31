"use client";
import { useState } from "react";
import MovieCard from "./movieCard";
import countries from "@/data/countries";
import genres from "@/data/genres";
import toast from 'react-hot-toast';

export default function Form() {
  const backend = process.env.NEXT_PUBLIC_BACKEND_ADDRESS;

  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [minRuntime, setMinRuntime] = useState("");
  const [maxRuntime, setMaxRuntime] = useState("");
  const [genre1, setGenre1] = useState("");
  const [genre2, setGenre2] = useState("");
  const [originCountry, setOriginCountry] = useState("");
  const [voteAverageMin, setVoteAverageMin] = useState("");
  const [voteCountMin, setVoteCountMin] = useState("");
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
        <option value="">— Choisir un genre —</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    );
  }

  function CountrySelect({ id, value, onChange, className }) {
    return (
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className={className}
      >
        <option value="">— Choisir un pays —</option>
        {countries.map((country) => (
          <option key={country.iso_3166_1} value={country.iso_3166_1}>
            {country.french_name}
          </option>
        ))}
      </select>
    );
  }

  async function handleSubmit() {
    const currentYear = new Date().getFullYear();

    if (
      startYear &&
      (parseInt(startYear) < 1892 || parseInt(startYear) > currentYear)
    ) {
      toast.error(`L'année de début doit être entre 1892 et ${currentYear}`);
      return;
    }

    if (
      endYear &&
      (parseInt(endYear) < 1892 || parseInt(endYear) > currentYear)
    ) {
      toast.error(`L'année de fin doit être entre 1892 et ${currentYear}`);
      return;
    }

    if (
      voteAverageMin &&
      (parseFloat(voteAverageMin) < 0 || parseFloat(voteAverageMin) > 10)
    ) {
      toast.error("La note moyenne doit être entre 0 et 10");
      return;
    }

    if (minRuntime && parseInt(minRuntime) < 0) {
      toast.error("La durée minimum ne peut pas être négative");
      return;
    }

    if (maxRuntime && parseInt(maxRuntime) < 0) {
      toast.error("La durée maximum ne peut pas être négative");
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch(`${backend}/movies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          genres: [genre1, genre2],
          startYear: startYear ? parseInt(startYear) : undefined,
          endYear: endYear ? parseInt(endYear) : undefined,
          minRuntime: minRuntime ? parseInt(minRuntime) : undefined,
          maxRuntime: maxRuntime ? parseInt(maxRuntime) : undefined,
          originCountry,
          voteAverageMin: voteAverageMin
            ? parseFloat(voteAverageMin)
            : undefined,
          voteCountMin: voteCountMin ? parseInt(voteCountMin) : undefined,
        }),
      });
      const data = await response.json();
      if (data.error) {
        toast.error(data.message || "Une erreur s'est produite. Veuillez réessayer.");
        setMoviesData([]);
        setIsLoading(false);
        return;
      }
      setMoviesData(data);
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire :", error);
      toast.error("Une erreur s'est produite. Veuillez réessayer.");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  const movies = moviesData.map((movie, i) => {
    return <MovieCard key={i} {...movie} />;
  });

  const resetCriteria = () => {
    setStartYear("");
    setEndYear("");
    setMinRuntime("");
    setMaxRuntime("");
    setGenre1("");
    setGenre2("");
    setOriginCountry("");
    setVoteAverageMin("");
    setVoteCountMin("");
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 mb-8 border border-gray-200 dark:border-gray-700">
        {/* Version mobile - layout vertical */}
        <div className="block md:hidden space-y-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Critères de recherche
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Premier genre
              </label>
              <GenreSelect
                id="genre1"
                value={genre1}
                onChange={(e) => setGenre1(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-button focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Second genre
              </label>
              <GenreSelect
                id="genre2"
                value={genre2}
                onChange={(e) => setGenre2(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-button focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Pays d'origine
              </label>
              <CountrySelect
                id="country"
                value={originCountry}
                onChange={(e) => setOriginCountry(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-button focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Année début
                </label>
                <input
                  type="number"
                  min="1892"
                  max={new Date().getFullYear()}
                  placeholder="2000"
                  value={startYear}
                  onChange={(e) => setStartYear(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-center text-foreground placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-button focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Année fin
                </label>
                <input
                  type="number"
                  min="1892"
                  max={new Date().getFullYear()}
                  placeholder="2010"
                  value={endYear}
                  onChange={(e) => setEndYear(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-center text-foreground placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-button focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Durée min
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="90"
                  value={minRuntime}
                  onChange={(e) => setMinRuntime(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-center text-foreground placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-button focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Durée max
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="180"
                  value={maxRuntime}
                  onChange={(e) => setMaxRuntime(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-center text-foreground placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-button focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Note moyenne min
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  placeholder="7.0"
                  value={voteAverageMin}
                  onChange={(e) => setVoteAverageMin(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-center text-foreground placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-button focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Nombre de votes min
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="150"
                  value={voteCountMin}
                  onChange={(e) => setVoteCountMin(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-center text-foreground placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-button focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Version desktop - layout en ligne */}
        <div className="hidden md:block">
          <p className="text-base lg:text-lg leading-relaxed text-foreground">
            Je veux regarder un film originaire de{" "}
            <span className="inline-block mx-1">
              <CountrySelect
                id="country"
                value={originCountry}
                onChange={(e) => setOriginCountry(e.target.value)}
                className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-button focus:border-transparent"
              />
            </span>{" "}
            dans le genre{" "}
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
                min="1892"
                max={new Date().getFullYear()}
                placeholder="2000"
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
                className="w-20 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-center text-foreground placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-button focus:border-transparent"
              />
            </span>{" "}
            et{" "}
            <span className="inline-block mx-1">
              <input
                type="number"
                min="1892"
                max={new Date().getFullYear()}
                placeholder="2010"
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
                className="w-20 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-center text-foreground placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-button focus:border-transparent"
              />
            </span>
            , d'une durée comprise entre{" "}
            <span className="inline-block mx-1">
              <input
                type="number"
                min="0"
                placeholder="90"
                value={minRuntime}
                onChange={(e) => setMinRuntime(e.target.value)}
                className="w-16 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-center text-foreground placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-button focus:border-transparent"
              />
            </span>{" "}
            et{" "}
            <span className="inline-block mx-1">
              <input
                type="number"
                min="0"
                placeholder="150"
                value={maxRuntime}
                onChange={(e) => setMaxRuntime(e.target.value)}
                className="w-16 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-center text-foreground focus:outline-none focus:ring-2 focus:ring-button focus:border-transparent"
              />
            </span>{" "}
            minutes, avec une note moyenne de{" "}
            <span className="inline-block mx-1">
              <input
                type="number"
                min="0"
                max="10"
                placeholder="5"
                value={voteAverageMin}
                onChange={(e) => setVoteAverageMin(e.target.value)}
                className="w-16 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-center text-foreground placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-button focus:border-transparent"
              />
            </span>{" "}
            et un nombre de votes minimum de{" "}
            <span className="inline-block mx-1">
              <input
                type="number"
                min="0"
                placeholder="100"
                value={voteCountMin}
                onChange={(e) => setVoteCountMin(e.target.value)}
                className="w-16 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-center text-foreground placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-button focus:border-transparent"
              />
            </span>
            .
          </p>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`${
              isLoading
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:opacity-90 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            } bg-button text-white font-bold py-3 px-4 sm:px-6 lg:px-8 rounded-2xl text-sm sm:text-base w-full sm:w-auto`}
          >
            {isLoading ? "⏳ Recherche..." : "🎬 Propose moi des films"}
          </button>
          <button
            onClick={resetCriteria}
            className="mx-2 cursor-pointer hover:opacity-90 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl bg-blue-700 dark:bg-cyan-500 text-white font-bold py-3 px-4 sm:px-6 lg:px-8 rounded-2xl text-sm sm:text-base w-full sm:w-auto"
          >
            ❌ Réinitialiser les critères
          </button>
        </div>
      </div>
      <div>{movies.length > 0 && movies}</div>
    </>
  );
}
