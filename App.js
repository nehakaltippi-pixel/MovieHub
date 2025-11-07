import { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MovieDetails from "./MovieDetails"; // We'll create this next
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const API_KEY = "ae527aa2";

  const fetchMovies = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`
      );

      if (response.data.Response === "True") {
        setMovies(response.data.Search);
      } else {
        setError(response.data.Error);
        setMovies([]);
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    }
  };

  return (
    <Router>
      <div className="App">
        <h1>🎬 MovieHub</h1>

        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <form onSubmit={fetchMovies}>
                  <input
                    type="text"
                    placeholder="Search for a movie..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button type="submit">Search</button>
                </form>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <div className="movie-grid">
                  {movies.map((movie) => (
                    <div key={movie.imdbID} className="movie-card">
                      <Link to={`/movie/${movie.imdbID}`}>
                        <img
                          src={
                            movie.Poster !== "N/A"
                              ? movie.Poster
                              : "https://via.placeholder.com/200x300?text=No+Image"
                          }
                          alt={movie.Title}
                        />
                      </Link>
                      <h3>{movie.Title}</h3>
                      <p>({movie.Year})</p>
                    </div>
                  ))}
                </div>
              </>
            }
          />

          {/* Movie Details Page */}
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
