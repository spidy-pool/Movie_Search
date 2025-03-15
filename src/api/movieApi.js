import axios from "axios";

export const searchMovies = async (query, page, year) => {
  // console.log(year);

  try {
    
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}&s=${query.trim()}&page=${page}&y=${year}` // Corrected line
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch movies.");
  }
};