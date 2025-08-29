import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY || "YOUR_OMDB_KEY";
const DEFAULT_QUERY = "2025";

export default function Home({ mode }) {
	const [query, setQuery] = useState("");
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);
	const [err, setErr] = useState("");

	const fetchMovies = async (q, page = 1) => {
		if (!API_KEY || API_KEY === "YOUR_OMDB_KEY") {
			setErr("Error.");
			return;
		}

		setLoading(true);
		setErr("");

		try {
			const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(
				q
			)}&type=movie&page=${page}`;
			const res = await fetch(url);
			const data = await res.json();

			if (data.Response === "True") {
				setMovies(data.Search || []);
			} else {
				setMovies([]);
				setErr(data.Error || "No results");
			}

		} catch {
			setErr("Error fetching movies.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchMovies(DEFAULT_QUERY);
	}, []);

	useEffect(() => {
		if (!query.trim()) return;
		const handler = setTimeout(() => {
			fetchMovies(query);
		}, 500);

		return () => clearTimeout(handler);
	}, [query]);

	const handleSearch = () => {
		const q = query.trim();
		if (!q) return;
		fetchMovies(q);
	};

	return (
		<div className="container py-4">
			<div className="input-group mb-3" aria-label="Movie search form">
				<input
					className="form-control"
					placeholder="Search movie title"
					aria-label="Search movie title"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && handleSearch()} />
				<button className={`btn ${mode === "dark" ? "btn-light" : "btn-dark"}`} aria-label="Search movies" onClick={handleSearch}>
					Search
				</button>
			</div>

			{loading && <div className="text-center">Loading…</div>}
			{err && !loading && (
				<div className="alert alert-warning" role="alert">{err}</div>
			)}


			{!loading && !err && movies.length > 0 && (
				<section className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3" aria-label="Movie list">
					{movies.map((m) => (
						<div className="col" key={m.imdbID}>
							<MovieCard movie={m} />
						</div>
					))}
				</section>
			)}
		</div>
	);
}
