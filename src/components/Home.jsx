import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import Header from "../Header";
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
    <>
    <Header />
    <div className="container mx-auto p-4">
       
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
        <div className="text-center mt-12">
          <img
            src={movies_logo}
            alt="movies"
            className="w-80 mx-auto mb-6 animate-pulse"
          />
          <p className="text-xl text-gray-400 font-bold tracking-wide">
            Discover Your Next Movie Adventure
          </p>
        </div>
      )}
    </div>
    </>
  );
};

export default Home;
