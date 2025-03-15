import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    movies: [], 
    searchCache: {}, 
  },
  reducers: {
    setSearchResults: (state, action) => {
      state.query = action.payload.query;
      state.movies = action.payload.movies;
    },
    cacheSuggestions: (state, action) => {
      state.searchCache = { ...state.searchCache, ...action.payload };
    },
  },
});

export const { setSearchResults, cacheSuggestions } = searchSlice.actions;
export default searchSlice.reducer;
