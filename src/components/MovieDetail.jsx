import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { BiSolidCameraMovie } from "react-icons/bi";
import { RiMovie2AiLine  } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Header from "../Header";
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
          `${import.meta.env.VITE_BASE_URL}&i=${id}` // Removed page parameter
        );
        if (response.data.Response === "True") {
          setMovie(response.data);
          // console.log(id)
          // localStorage.setItem(JSON.stringify(id), JSON.stringify(response.data));
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

  const AddToFav = () => {
    localStorage.setItem(JSON.stringify(id), JSON.stringify(movie));
    alert("Movie added to favourite list");
  }

  return (
    <>
    <Header />
    <div className="container mx-auto">
     
      
      <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-xl font-bold">Movie Detail :-</h1>
        {!loading ? (
          !error ? (
            <div className="flex flex-col gap-2">
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
                <div className="flex aligh-center justify-between">
                <h1 className="text-3xl font-bold">{movie?.Title}</h1>
                <div onClick={()=>AddToFav()} className="text-4xl font-bold cursor-pointer"><FaHeartCirclePlus /></div>
                </div>
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
    </>
  );
};

export default MovieDetail;