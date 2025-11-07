import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "ae527aa2"; // your OMDb API key

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
        );
        if (response.data.Response === "True") {
          setMovie(response.data);
        } else {
          setError(response.data.Error);
        }
      } catch (err) {
        setError("Failed to load movie details.");
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!movie) return <p>Loading...</p>;

  return (
    <div className="details-page">
      <Link to="/" className="back-btn">⬅ Back to Search</Link>

      <div className="details-container">
        {/* Poster Section */}
        <div className="poster-section">
          <img
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/300x450?text=No+Image"
            }
            alt={movie.Title}
            className="details-poster"
          />
        </div>

        {/* Info Section */}
        <div className="info-section">
          <h2>{movie.Title}</h2>
          <p className="details-year">{movie.Year}</p>

          <p><strong>🎭 Genre:</strong> {movie.Genre}</p>
          <p><strong>🎬 Director:</strong> {movie.Director}</p>
          <p><strong>⭐ IMDb Rating:</strong> {movie.imdbRating}</p>
          <p><strong>🧑‍🎤 Actors:</strong> {movie.Actors}</p>

          <p className="plot">
            <strong>📜 Plot:</strong> {movie.Plot}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
