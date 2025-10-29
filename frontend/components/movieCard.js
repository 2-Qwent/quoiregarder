import languages from "@/data/languages";
import { useWatchlist } from "@/contexts/WatchlistContext";

export default function movieCard(props) {
  const getFrenchLanguage = (languageCode) => {
    const language = languages.find((lang) => lang.iso_639_1 === languageCode);
    return language ? language.french_name : "Inconnu";
  };

  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  const handleWatchlistToggle = () => {
    if (isInWatchlist(props.id)) {
      removeFromWatchlist(props.id);
    } else {
      addToWatchlist({
        id: props.id,
        title: props.title,
        poster: props.poster,
        releaseDate: props.releaseDate,
        voteAverage: props.voteAverage,
        runtime: props.runtime,
        genres: props.genres,
        originalTitle: props.originalTitle,
        overview: props.overview,
        originalLanguage: props.originalLanguage,
      });
    }
  };

  return (
    <div className="mb-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-200 dark:border-gray-700">
      {/* Version mobile - layout vertical */}
      <div className="block md:hidden space-y-4">
        {/* Poster centré en haut */}
        <div className="flex justify-center">
          {props.poster ? (
            <img
              src={props.poster}
              alt={props.title}
              className="w-48 h-64 sm:w-56 sm:h-80 object-cover rounded-lg"
            />
          ) : (
            <div className="w-48 h-64 sm:w-56 sm:h-80 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-lg">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Aucune image disponible
              </p>
            </div>
          )}
        </div>

        {/* Contenu en dessous */}
        <div className="space-y-3">
          <h3 className="text-xl sm:text-2xl leading-tight text-button font-bold text-center">
            {props.title}
          </h3>

          <div className="text-center">
            <p className="text-sm text-foreground font-medium">
              Titre original : {props.originalTitle}
            </p>
          </div>

          {/* Infos techniques en grille */}
          <div className="grid grid-cols-1 gap-2 text-xs sm:text-sm text-foreground bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            <p>
              <span className="font-medium">Date :</span> {props.releaseDate}
            </p>
            <p>
              <span className="font-medium">Durée :</span>{" "}
              {props.runtime ? `${props.runtime} min` : "N/A"}
            </p>
            <p>
              <span className="font-medium">Note :</span> {props.voteAverage} (
              {props.voteCount} votes)
            </p>
            <p>
              <span className="font-medium">Langue :</span>{" "}
              {getFrenchLanguage(props.originalLanguage)}
            </p>
            <p>
              <span className="font-medium">Genre(s) :</span>{" "}
              {props.genres && props.genres.length > 0
                ? props.genres.join(", ")
                : "N/A"}
            </p>
          </div>

          {/* Résumé */}
          <div>
            <h4 className="font-semibold text-foreground mb-2">Résumé :</h4>
            <div className="max-h-32 overflow-y-auto">
              <p className="text-sm sm:text-base text-foreground leading-relaxed">
                {props.overview}
              </p>
            </div>
          </div>
        </div>

        {/* Bouton au même niveau, largeur pleine */}
        <button
          onClick={handleWatchlistToggle}
          className={`w-full px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
            isInWatchlist(props.id)
              ? "bg-button text-white"
              : "bg-gray-200 dark:bg-gray-700 text-foreground hover:bg-button hover:text-white"
          }`}
        >
          {isInWatchlist(props.id) ? "✓ Dans ma liste" : "+ Ajouter à ma liste"}
        </button>
      </div>

      {/* Version desktop - layout horizontal */}
      <div className="hidden md:flex gap-8">
        {/* Poster à gauche */}
        <div className="shrink-0">
          {props.poster ? (
            <img
              src={props.poster}
              alt={props.title}
              className="w-72 h-96 object-cover rounded-lg"
            />
          ) : (
            <div className="w-72 h-96 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-lg">
              <p className="text-gray-500 dark:text-gray-400">
                Aucune image disponible
              </p>
            </div>
          )}
        </div>

        {/* Contenu à droite */}
        <div className="flex-1 h-96 flex flex-col">
          <h3 className="text-3xl leading-relaxed text-button font-bold mb-2">
            {props.title}
          </h3>
          <h3 className="text-base leading-relaxed text-foreground font-bold mb-2">
            Titre original : {props.originalTitle}
          </h3>
          <p className="mb-3 text-sm leading-relaxed text-foreground">
            Date de sortie : {props.releaseDate} — Durée :{" "}
            {props.runtime ? `${props.runtime} minutes` : "N/A"} — Note moyenne
            : {props.voteAverage} ({props.voteCount} votes) — Langue originale :{" "}
            {getFrenchLanguage(props.originalLanguage)}
          </p>

          <div className="flex-1 space-y-2">
            <div className="max-h-40 overflow-y-auto mb-6">
              <p className="text-xl text-foreground">{props.overview}</p>
            </div>
            <p className="text-base text-foreground">
              Genre(s) :{" "}
              {props.genres && props.genres.length > 0
                ? props.genres.join(", ")
                : "N/A"}
            </p>
          </div>
          <button
            onClick={handleWatchlistToggle}
            className={`mt-4 px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
              isInWatchlist(props.id)
                ? "bg-button text-white"
                : "bg-gray-200 dark:bg-gray-700 text-foreground hover:bg-button hover:text-white"
            }`}
          >
            {isInWatchlist(props.id)
              ? "✓ Dans ma liste"
              : "+ Ajouter à ma liste"}
          </button>
        </div>
      </div>
    </div>
  );
}
