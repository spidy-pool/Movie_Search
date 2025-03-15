import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const SearchBar = ({
  query,
  handleChange,
  handleClear,
  selectedYear,
  setSelectedYear,
}) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={handleChange}
        className="w-full p-2 md:text-xl md:h-14 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {query && (
        <>
          <button
            onClick={handleClear}
            className="p-2 md:h-14 w-20 cursor-pointer hover:bg-red-700 transform duration-300 text-white rounded-md bg-red-500"
          >
            Clear
          </button>
          <DatePicker
            selected={selectedYear}
            onChange={(date) => setSelectedYear(date.getFullYear().toString())}
            showYearPicker
            dateFormat="yyyy"
            placeholderText="Filter"
            className="border p-2 md:h-14 text-xl w-20 focus:outline-none rounded-md"
          />
        </>
      )}
    </div>
  );
};

export default SearchBar;
