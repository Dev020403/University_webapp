import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-red-200 via-red-500 to-red-800">
    <div className="bg-white rounded-xl shadow-lg w-full max-w-xl py-8 px-10 text-center">
      <h1 className="text-5xl font-bold mb-4 text-gray-800">404</h1>
      <p className="text-2xl text-gray-600">Page Not Found</p>
      <p className="text-gray-500 mt-4">
        The page you are looking for does not exist.
      </p>
      <Link to="/" className="text-blue-500 mt-4 inline-block">
        Go back to Home
      </Link>
    </div>
  </div>
);

export default NotFound;
