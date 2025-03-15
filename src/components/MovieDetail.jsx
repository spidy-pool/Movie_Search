import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import LoadingPlaceholder from "./LoadingPlaceholder";
import novideo from "../assets/no_video.jpg";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=21e81da2&i=${id}` // Removed page parameter
        );
        if (response.data.Response === "True") {
          setMovie(response.data);
        } else {
          setError("Movie not found.");
        }
      } catch (err) {
        setError("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl p-6 font-bold">Movie Detail</h1>
      <div className="max-w-4xl mx-auto p-4">
        {!loading ? (
          !error ? (
            <div className="flex flex-col gap-5">
              <img
                
                src={
                  movie?.Poster !== "N/A"
                    ? movie.Poster
                    : "https://lrs.org.za/wp-content/uploads/2020/11/placeholder.png"
                }
                alt={movie?.Title}
                className="w-full aspect-video m-auto rounded-lg"
              />
              <div className="">
                <h1 className="text-3xl font-bold">{movie?.Title}</h1>
                <p className="text-gray-600 mt-2">{movie?.Year}</p>
                <p className="mt-4">{movie?.Plot}</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-5">
              <img src={novideo} alt="No video found" />
              <p className="text-2xl font-bold text-center text-red-500">
                {error}
              </p>
            </div>
          )
        ) : (
          <LoadingPlaceholder />
        )}
      </div>
    </div>
  );
};

export default MovieDetail;