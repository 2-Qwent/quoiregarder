import languages from "@/data/languages";

export default function movieCard(props) {

    const getFrenchLanguage = (languageCode) => {
        const language = languages.find((lang) => lang.iso_639_1 === languageCode);
        return language ? language.french_name : "Inconnu";
    }

  return (
    <div className="flex gap-8 mb-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
      {/* Poster à gauche */}
      <div className="shrink-0">
        {props.poster ? (
          <img
            src={props.poster}
            alt={props.title}
            className="w-72 h-96 object-cover"
          />
        ) : (
          <div className="w-72 h-96 flex items-center justify-center border">
            <p>Aucune image disponible</p>
          </div>
        )}
      </div>

      {/* Contenu à droite */}
      <div className="flex-1 h-60 flex flex-col">
        {/* Titre en haut à droite du poster */}
        <h3 className="text-3xl leading-relaxed text-button font-bold mb-2">
          {props.title}
        </h3>
        <h3 className="text-base leading-relaxed text-foreground font-bold mb-2">
          Titre original : {props.originalTitle}
        </h3>
        <p className="mb-3 text-sm leading-relaxed text-foreground">
          Date de sortie : {props.releaseDate} — Durée :{" "}
          {props.runtime ? `${props.runtime} minutes` : "N/A"} — Note moyenne :{" "}
          {props.voteAverage} ({props.voteCount} votes) — Langue originale :{" "}
          {getFrenchLanguage(props.originalLanguage)}
        </p>
        {/* Reste des informations en dessous du titre */}
        <div className="flex-1 space-y-2">
          <p className="mb-6 text-xl text-foreground">{props.overview}</p>
          <p className="text-base text-foreground">
            Genre(s) :{" "}
            {props.genres && props.genres.length > 0 ? props.genres.join(", ") : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
