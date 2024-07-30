import React from "react";
import { useNavigate } from "react-router-dom";
import profile from "../../assets/1.jpg";

const ProfilePicture = () => {
  const navigator = useNavigate();
  const navigateToHome = () => {
    navigator("/home");
  };

  return (
    <div className="flex flex-col justify-center text-center h-1/3">
     
      <div className="m-auto w-40 h-40 rounded-full bg-gray-500">
        <img
          src={profile}
          alt="profile"
          className="w-full h-full rounded-full border border-white"
        />
      </div>
      <h1 className="text-white">Profile Picture</h1>
    </div>
  );
};

export default ProfilePicture;