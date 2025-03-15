import React from "react";
// import { FaHeartCirclePlus } from "react-icons/fa6";
import { MdLocalMovies } from "react-icons/md";
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
          <div className="flex justify-between items-center mt-2">
            <p className="text-gray-700">{movie?.Year}</p>
            <div className="text-xl"><MdLocalMovies /></div>
          </div>

        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
