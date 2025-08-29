import MovieCard from "../components/MovieCard";
import { useFav } from "../context/FavoriteContext.jsx";


export default function Favourites() {
	const { favs, unfav } = useFav();
	if (favs.length === 0) return <p className="text-muted">No favourite movies found.</p>;
	return (
		<div className="container">
			<div className="grid">
				{favs.map((m) => (
					<MovieCard key={m.imdbID} movie={m} />
				))}
			</div>
		</div>
	);
}
