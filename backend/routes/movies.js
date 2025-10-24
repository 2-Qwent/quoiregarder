var express = require("express");
var router = express.Router();

const formatFrenchDate = (dateString) => {
  if (!dateString) return "Date inconnue";
  return new Date(dateString).toLocaleDateString("fr-FR");
};

// Récupérer la liste des films
router.post("/", async (req, res) => {
  const tmdbApiKey = process.env.TMDB_API_KEY;

  try {
    const {
      genres,
      startYear,
      endYear,
      minRuntime,
      maxRuntime,
      originCountry,
      voteAverageMin,
      voteCountMin,
    } = req.body;

    if (
      (!genres || genres.length === 0) &&
      !startYear &&
      !endYear &&
      !minRuntime &&
      !maxRuntime &&
      !originCountry
    ) {
      return res
        .status(400)
        .json({
          error: "Critères manquants",
          message: "Au moins un critère requis.",
        });
    }

    if (
      (voteAverageMin && isNaN(voteAverageMin)) ||
      (voteCountMin && isNaN(voteCountMin)) ||
      (minRuntime && isNaN(minRuntime)) ||
      (maxRuntime && isNaN(maxRuntime)) ||
      (startYear && isNaN(startYear)) ||
      (endYear && isNaN(endYear))
    ) {
      return res.status(400).json({
        error: "Critères invalides",
        message: "Valeurs numériques attendues.",
      });
    }

    let baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&language=fr-FR&vote_average.gte=5&include_adult=false&page=1`;

    if (genres.length > 0) baseUrl += `&with_genres=${genres.join(",")}`;
    if (minRuntime) baseUrl += `&with_runtime.gte=${minRuntime}`;
    if (maxRuntime) baseUrl += `&with_runtime.lte=${maxRuntime}`;
    if (originCountry) baseUrl += `&with_origin_country=${originCountry}`;
    if (voteAverageMin) baseUrl += `&vote_average.gte=${voteAverageMin}`;
    if (voteCountMin) baseUrl += `&vote_count.gte=${voteCountMin}`;
    if (startYear && endYear && startYear === endYear) {
      baseUrl += `&primary_release_year=${startYear}`;
    } else {
      if (startYear) baseUrl += `&primary_release_date.gte=${startYear}-01-01`;
      if (endYear) baseUrl += `&primary_release_date.lte=${endYear}-12-31`;
    }

    const firstResponse = await fetch(baseUrl);
    const firstData = await firstResponse.json();

    if (!firstData.results) {
      console.error("❌ Pas de 'results' dans la réponse");
      return res
        .status(500)
        .json({ error: "Réponse TMDB invalide", message: "Erreur serveur." });
    }

    if (firstData.results.length === 0) {
      console.error("❌ Résultats vides");
      return res
        .status(404)
        .json({
          error: "Aucun film trouvé",
          message: "Aucun film correspondant.",
        });
    }

    const totalPages = firstData.total_pages;
    const maxPages = Math.min(totalPages, 500);
    const randomPage = Math.floor(Math.random() * maxPages) + 1;

    const finalUrl = baseUrl.replace("&page=1", `&page=${randomPage}`);

    const response = await fetch(finalUrl);
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      console.error("❌ Page vide malgré la validation");
      return res.status(404).json({
        error: "Page vide.",
        message: "Aucun film correspondant.",
      });
    }

    const movies = data.results.slice(0, 20);

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
        } catch (error) {
          console.error(`Erreur sur le film ${movie.id}:`, error.message);
          res
            .status(500)
            .json({
              error: `Erreur sur le film ${movie.id}:`,
              message: error.message,
            });
          return { ...movie, runtime: null, genres: [] };
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
    const randomPage = Math.floor(Math.random() * 500) + 1;
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&language=fr-FR&include_adult=false&page=${randomPage}&vote_average.gte=6`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.results) {
      console.error("❌ Pas de propriété 'results' dans la réponse TMDB");
      return res.status(500).json({
        error: "Réponse invalide de TMDB",
        message: "Pas de résultats",
      });
    }

    if (data.results.length === 0) {
      console.error("❌ Aucun film trouvé dans les résultats");
      return res
        .status(404)
        .json({ error: "Aucun film trouvé", message: "Résultats vides" });
    }

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
