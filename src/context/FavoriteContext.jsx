import { createContext, useContext, useEffect, useState } from "react";

const FavContext = createContext();

export function FavProvider({ children }) {
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("favmovies");
    if (stored) {
      setFavs(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favmovies", JSON.stringify(favs));
  }, [favs]);

  const addFav = (movie) => {
    setFavs((prev) => {
      if (prev.some((m) => m.imdbID === movie.imdbID)) return prev; // sudah ada
      return [...prev, movie];
    });
  };

  const unfav = (id) => {
    setFavs((prev) => prev.filter((m) => m.imdbID !== id));
  };

  return (
    <FavContext.Provider value={{ favs, addFav, unfav }}>
      {children}
    </FavContext.Provider>
  );
}


export function useFav() {
  return useContext(FavContext);
}
