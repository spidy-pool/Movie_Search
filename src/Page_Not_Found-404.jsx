import React from 'react';
import { Link } from 'react-router-dom';


 const PageNotFound =()=> {
  return (
    <div class="bg-gray-100 h-screen flex items-center justify-center">
    <div class="text-center">
        <h1 class="text-6xl font-bold text-red-800 mb-4">404</h1>
        <p class="text-4xl text-gray-900 mb-8">Page Not Found</p>
        <p class="text-gray-600 mb-8">We couldn't find the page you were looking for.</p>
        <Link to="/" class="bg-blue-400 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
            Go Home
        </Link>
    </div>
</div>
  )
}


export default PageNotFound;