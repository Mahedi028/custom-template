import Button from "@/components/UI/button/Button";
import React, { useEffect } from "react";

const MyProfile = ({ user }) => {
  useEffect(() => {}, [user]);

  const { name, email, phone_number } = user?.data || {};

  return (
    <div className="w-full flex justify-center items-start bg-gray-200 gap-3 rounded-md drop-shadow-md">
      <ul className="w-full flex flex-col justify-center items-start">
        <li className="w-full flex justify-start items-center px-4 py-2 border-b border-gray-400 rounded-t-lg dark:border-gray-600 gap-5">
          <p>Name:{name}</p>
          <Button text="EDIT" />
        </li>
        <li className="w-full px-4 py-2 border-b border-gray-400 rounded-t-lg dark:border-gray-600">
          Email:{email}
        </li>
        <li className="w-full px-4 py-2 border-b border-gray-400 rounded-t-lg dark:border-gray-600">
          Phone Number:{phone_number}
        </li>
        <li className="w-full px-4 py-2 border-b border-gray-400 rounded-t-lg dark:border-gray-600">
          Payment Status:
        </li>
        <li></li>
      </ul>
    </div>
  );
};

export default MyProfile;
