import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie?.imdbID}`} className="block">
      <div className="bg-white h-full rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <img
          src={
            movie?.Poster != "N/A"
              ? movie?.Poster
              : "https://lrs.org.za/wp-content/uploads/2020/11/placeholder.png"
          }
          alt={movie?.Title}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold">
            {movie?.Title.length > 50
              ? movie?.Title.slice(0, 50) + "..."
              : movie?.Title}
          </h3>
          <p className="text-gray-600">{movie?.Year}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
