import React, { useEffect, useState } from 'react';
import Header from '../Header';

const FavouriteMovies = () => {

    const [movies, setMovies] = useState([]);

    const allStorage = () => {
        let values = [],
            keys = Object.keys(localStorage),
            i = keys.length;

        while (i--) {
            // console.log(keys[i]);
            values.push(localStorage.getItem(keys[i]));
        }

        // return values;
        setMovies(values);
    }
    useEffect(() => {
        allStorage();
    }, []);
    return (
        <div>
            <Header />
         
                <h1 className="text-3xl font-bold">
                   Your favourite Movies:-
                </h1>
            
            {movies.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 m-8 mt-2">
                    {movies.map((movie, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md">
                            <img
                                src={JSON.parse(movie).Poster}
                                alt={JSON.parse(movie).Title}
                                className=" w-full h-64 object-fill "
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-bold mb-2">{JSON.parse(movie).Title}</h2>
                                <p>{JSON.parse(movie).Year}</p>

                            </div>

                        </div>
                    ))}
                </div>
            ) : (
                <h1 className="text-center text-2xl mt-8">No favourite movies</h1>
            )};
        </div>
    );
};

export default FavouriteMovies;