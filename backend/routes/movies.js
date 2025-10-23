var express = require("express");
var router = express.Router();

// Récupérer la liste des films
router.post("/", async (req, res) => {
  const tmdbApiKey = process.env.TMDB_API_KEY;

  const formatFrenchDate = (dateString) => {
  if (!dateString) return "Date inconnue";
  return new Date(dateString).toLocaleDateString('fr-FR');
};

  try {
    const { genres, startYear, endYear, minRuntime, maxRuntime } = req.body;

    if (!genres || !startYear || !endYear || !minRuntime || !maxRuntime) {
      return res
        .status(400)
        .json({ error: "Tous les paramètres sont requis." });
    }

    const randomPage = Math.floor(Math.random() * 20) + 1;

    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&language=fr-FR&vote_average.gte=5&include_adult=false&page=${randomPage}`;

    if (genres.length > 0) url += `&with_genres=${genres.join(",")}`;
    if (startYear) url += `&primary_release_date.gte=${startYear}-01-01`;
    if (endYear) url += `&primary_release_date.lte=${endYear}-12-31`;
    if (minRuntime) url += `&with_runtime.gte=${minRuntime}`;
    if (maxRuntime) url += `&with_runtime.lte=${maxRuntime}`;

    const response = await fetch(url);
    const data = await response.json();
    const movies = data.results.slice(0, 20);

    if (movies.length === 0) return res.json("Aucun film ne correspond à vos critères.");

    const detailedMovies = await Promise.all(
      movies.map(async (movie) => {
        try {
          const detailsResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${tmdbApiKey}&language=fr-FR`
          );
          const details = await detailsResponse.json();

          return {
            id: movie.id,
            poster: movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "",
            title: movie.title,
            originalTitle: movie.original_title,
            overview: movie.overview || "Aucun résumé disponible.",
            releaseDate: formatFrenchDate(movie.release_date),
            originalLanguage: movie.original_language,
            voteAverage: movie.vote_average,
            voteCount: movie.vote_count,
            popularity: movie.popularity,
            runtime: details.runtime || null,
            genres: details.genres?.map((g) => g.name) || [],
          };
        } catch (err) {
          console.error(`Erreur sur le film ${movie.id}:`, err.message);
          return { ...movie, runtime: null };
        }
      })
    );

    res.json(detailedMovies);
  } catch (error) {
    console.error("Erreur serveur:", error);
    res.status(500).json({ error: "Erreur serveur", message: error.message });
  }
});

// Trouver un film aléatoire
router.get("/random", async (req, res) => {
  const tmdbApiKey = process.env.TMDB_API_KEY;

  try {

    const formatFrenchDate = (dateString) => {
  if (!dateString) return "Date inconnue";
  return new Date(dateString).toLocaleDateString('fr-FR');
};

    const randomPage = Math.floor(Math.random() * 500) + 1;
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&language=fr-FR&include_adult=false&page=${randomPage}&vote_average.gte=6`;

    const response = await fetch(url);
    const data = await response.json();
    const movies = data.results;

    const randomIndex = Math.floor(Math.random() * movies.length);
    const movie = movies[randomIndex];

    const detailsResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${tmdbApiKey}&language=fr-FR`
    );
    const details = await detailsResponse.json();

    const detailedMovie = {
      id: details.id,
      poster: details.poster_path
        ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
        : "",
      title: details.title,
      originalTitle: details.original_title,
      overview: details.overview || "Aucun résumé disponible.",
      releaseDate: formatFrenchDate(details.release_date),
      originalLanguage: details.original_language,
      voteAverage: details.vote_average,
      voteCount: details.vote_count,
      popularity: details.popularity,
      runtime: details.runtime || null,
      genres: details.genres?.map((g) => g.name) || [],
    };

    res.json(detailedMovie);
  } catch (error) {
    console.error("Erreur serveur:", error);
    res
      .status(500)
      .json({ error: "Erreur serveur : ", message: error.message });
  }
});

module.exports = router;
