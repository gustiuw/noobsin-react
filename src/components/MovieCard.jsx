import "../styles/movie-card.css";
import { useFav } from "../context/FavoriteContext.jsx";
import { toast, ToastContainer } from "react-toastify";


export default function MovieCard({ movie }) {
  const { Poster, Title, Year } = movie;
  const hasPoster = Poster && Poster !== "N/A";
  const { favs, addFav, unfav } = useFav();

  const isFav = favs.some((m) => m.imdbID === movie.imdbID);

  const toggleFav = () => {
    if (isFav) {
      unfav(movie.imdbID);
      toast(
        <div>
          Removed <strong>{movie.Title}</strong> from Favourites
          <button
            type="button"
            className="btn btn-outline-danger btn-sm ms-2"
            onClick={() => {
              addFav(movie);
              toast.dismiss();
            }}
          >
            Undo
          </button>
        </div>,
        { autoClose: 5000 }
      );

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

        <button
          className="fav-icon"
          onClick={toggleFav}
          aria-pressed={isFav}
          aria-label={isFav ? "Remove from Favourites" : "Add to Favourites"}
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
