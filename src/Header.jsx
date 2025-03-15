import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { BiSolidCameraMovie } from "react-icons/bi";
import { RiMovie2AiLine  } from "react-icons/ri";

const Header = () => {
    return(
         <div className="flex items-center justify-center mb-8 p-2 bg-gray-300">
        <BiSolidCameraMovie className="text-5xl mr-3 text-yellow-600 animate-pulse" />
        <Link to="/" className="text-4xl font-extrabold tracking-wide">
            MovieSearch
        </Link>
        <RiMovie2AiLine className="text-3xl ml-3 text-yellow-600 animate-pulse" />
        <Link to="/favourite-movies" className="absolute right-6 text-5xl"><FaHeart /></Link>
    </div>
    )};

export default Header;