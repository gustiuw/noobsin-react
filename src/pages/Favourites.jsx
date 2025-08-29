import MovieCard from "../components/MovieCard";
import { useFav } from "../context/FavoriteContext.jsx";

export default function Favourites() {
	const { favs, unfav } = useFav();
	if (favs.length === 0) return <p className="text-muted">No favourite movies found.</p>;
	return (
		<main className="container">
			<section className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3" aria-label="Movie list">
				{favs.map((m) => (
					<MovieCard key={m.imdbID} movie={m} />
				))}
			</section>
		</main>
	);
}
