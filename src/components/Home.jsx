import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidCameraMovie } from "react-icons/bi";
import { RiMovie2AiFill ,RiMovie2AiLine  } from "react-icons/ri";
import SearchBar from "./SearchBar";
import MovieGrid from "./MovieGrid";
import LoadingPlaceholder from "./LoadingPlaceholder";
import ErrorBoundary from "./ErrorBoundary";
import { searchMovies } from "../api/movieApi";
import {
  setSearchResults,
  cacheSuggestions,
} from "../redux/slices/searchSlice";
import movies_logo from "../assets/movies_logo.png";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [selectedYear, setSelectedYear] = useState("");

  const dispatch = useDispatch();
  const { query, movies, searchCache } = useSelector((state) => state.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[`${query}-${selectedYear}`]) {
        setError("");
        dispatch(
          setSearchResults({
            movies: searchCache[`${query}-${selectedYear}`],
            query,
          })
        );
      } else {
        handleSearch(query, 1, selectedYear);
      }
    }, 1000);

    if (!query) {
      setError("");
    }

    return () => clearTimeout(timer);
  }, [query, selectedYear, dispatch, searchCache]);
  // const [trimdata, setTrimdata] = useState("");

  const handleChange = (e) => {

    dispatch(setSearchResults({ movies, query: e.target.value}));
    setPage(1);
  };

  const handleClear = () => {
    dispatch(setSearchResults({ movies: [], query: "" }));
    setPage(1);
    setError("");
    setSelectedYear("");
  };

  const handleSearch = useCallback(
    async (query, pageNum, year) => {
      if (!query) {
        dispatch(setSearchResults({ movies: [], query }));
        return;
      }
      setLoading(true);
      setError("");

      try {
        const data = await searchMovies(query, pageNum, year);

        if (data.Response === "True") {
          const newMovies =
            pageNum === 1 ? data.Search : [...movies, ...data.Search];
          dispatch(setSearchResults({ movies: newMovies, query }));
          dispatch(cacheSuggestions({ [`${query}-${year}`]: newMovies }));
        } else {
          if (pageNum === 1) dispatch(setSearchResults({ movies: [], query }));
          setError(data.Error || "No results found.");
        }
      } catch (err) {
        setError("Failed to fetch movies.");
      } finally {
        setLoading(false);
      }
    },
    [dispatch, movies]
  );

  useEffect(() => {
    if (page > 1) {
      handleSearch(query, page, selectedYear);
    }
  }, [page, selectedYear]);

  useEffect(() => {
    const infiniteScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 400 &&
        !loading &&
        !error
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", infiniteScroll);
    return () => window.removeEventListener("scroll", infiniteScroll);
  }, [loading, error]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
      <BiSolidCameraMovie className="text-4xl" />
      <span className="flex justify-center">
        Movie Search App 
        <RiMovie2AiLine className="text-xl" />
        {/* <RiMovie2AiLine /> */}
        </span>
        </h1>  
      <SearchBar
        query={query}
        handleChange={handleChange}
        handleClear={handleClear}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />
      <ErrorBoundary error={error} />
      <MovieGrid movies={movies} />
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <LoadingPlaceholder key={index} />
          ))}
        </div>
      )}
      {!movies?.length && !query && (
        <div className="text-3xl font-bold text-center flex flex-col justify-center items-center">
          <img src={movies_logo} alt="movies" />
          <p>Search Your Favourite Movie Here</p>
        </div>
      )}
    </div>
  );
};

export default Home;
