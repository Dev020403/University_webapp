import React from "react";

const WelcomeCard = ({ userName }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-5">
      <h1 className="text-2xl font-bold">Welcome, {userName}!</h1>
      <p className="mt-2 text-gray-600">
        Discover universities, browse courses, and apply now.
      </p>
    </div>
  );
};

export default WelcomeCard;
