// src/components/MovieCard.jsx
import "../styles/movie-card.css";
import { useFav } from "../context/FavoriteContext.jsx";

export default function MovieCard({ movie }) {
  const { Poster, Title, Year } = movie;
  const hasPoster = Poster && Poster !== "N/A";
	const { favs, addFav, removeFav } = useFav();

	const isFav = favs.some((m) => m.imdbID === movie.imdbID);

	const toggleFav = () => {
		if (isFav) {
			removeFav(movie.imdbID);
		} else {
			addFav(movie);
		}
	};

  return (
    <div className="card">
      <div className="poster-wrapper">
        {hasPoster ? (
          <img src={Poster} alt={Title} loading="lazy" />
        ) : (
          <div className="poster-fallback">No Image</div>
        )}

        {/* Icon Love (dummy, belum ada state favourites) */}
        <button
          className="fav-icon"
          onClick={toggleFav}
          title={isFav ? "Remove from Favourites" : "Add to Favourites"}
        >
          {isFav ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="card-body">
        <div className="card-title" title={Title}>
          {Title}
        </div>
        <div className="card-year">{Year}</div>
      </div>
    </div>
  );
}
