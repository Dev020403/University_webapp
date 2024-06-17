import React from "react";

const WelcomeCard = ({ name }) => {
  return (
    <>
      <div className="bg-white rounded-md shadow">
        <div className="flex flex-col p-9 gap-2">
          <span className="font-bold text-xl">Hello, {name}</span>
          <span className="text-gray-500">Welcome to your Dashboard</span>
        </div>
      </div>
    </>
  );
};

export default WelcomeCard;
