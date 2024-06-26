import React from "react";
import { useNavigate } from "react-router-dom";

const UniversityCard = ({
  id,
  coverImage,
  logo,
  name,
  description,
  address,
  ratings,
}) => {
  const defaultCoverImage = "https://dummyimage.com/300";
  const defaultLogo = "https://dummyimage.com/50x50";
  const defaultName = "Unknown University";
  const defaultDescription = "No description available";
  const defaultAddress = "No address provided";
  const defaultRatings = "N/A";

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/university/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="max-w-sm w-full lg:max-w-full lg:flex shadow-lg rounded-lg overflow-hidden mx-2 my-4 border border-gray-200 cursor-pointer "
    >
      <div className="flex-none h-64 lg:h-auto lg:w-48 relative">
        <img
          src={coverImage || defaultCoverImage}
          alt="cover"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-between p-4 leading-normal bg-white">
        <div className="mb-4">
          <div className="flex items-center">
            <img
              src={logo || defaultLogo}
              alt="logo"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div className="text-xl font-bold text-gray-900">
              {name || defaultName}
            </div>
          </div>
        </div>
        <p className="text-gray-700 text-base mb-4">
          {description || defaultDescription}
        </p>
        <p className="text-gray-600 text-sm mb-2">
          {address || defaultAddress}
        </p>
        <p className="text-gray-600 text-sm">
          Rating: {ratings || defaultRatings}
        </p>
      </div>
    </div>
  );
};

export default UniversityCard;
