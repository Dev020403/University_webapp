import React from "react";

const UniversityCard = ({
  coverImage,
  logo,
  name,
  description,
  address,
  ratings,
}) => {
  return (
    <div className="h-72 bg-white shadow-lg rounded-lg overflow-hidden mx-2">
      <div className="md:flex h-full">
        <div className="md:flex-shrink-0">
          <img
            src={coverImage}
            alt="cover"
            className="w-full h-full object-cover md:w-48"
          />
        </div>
        <div className="p-4 flex flex-col justify-between">
          <div className="mb-2 flex">
            <img
              src={logo}
              alt="logo"
              className="w-10 h-10 rounded-full mr-2"
            />
            <span className="font-bold text-xl ">{name}</span>
          </div>
          <p className="text-gray-700 text-base mb-4">{description}</p>
          <p className="text-gray-600 text-sm mb-2">{address}</p>
          <p className="text-gray-600 text-sm">Rating: {ratings}</p>
        </div>
      </div>
    </div>
  );
};

export default UniversityCard;
