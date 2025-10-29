"use client";
import { useWatchlist } from "@/contexts/WatchlistContext";
import MovieCard from "@/components/movieCard";
import { useDarkMode } from "@/hooks/useDarkMode";

export default function WatchlistPage() {
  const { watchlist, clearWatchlist } = useWatchlist();
  useDarkMode();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-foreground">
            Ma liste de films
          </h1>
          {watchlist.length > 0 && (
            <button
              onClick={clearWatchlist}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 cursor-pointer text-white rounded-lg transition-colors duration-200 font-medium"
            >
              Vider la liste
            </button>
          )}
        </div>

        {watchlist.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">🎬</div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Votre liste est vide
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                <span
                  onClick={() => (window.location.href = "/")}
                  className="text-button hover:underline cursor-pointer transition-colors"
                >
                  Ajoutez des films depuis la recherche
                </span>{" "}
                pour créer votre watchlist personnalisée !
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="mb-4">
              <p className="text-gray-600 dark:text-gray-400">
                {watchlist.length} film{watchlist.length > 1 ? "s" : ""} dans
                votre liste
              </p>
            </div>
            {watchlist.map((movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
