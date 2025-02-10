import VerticalTab from "@/components/UI/tab/vertical/VerticalTab";
import React, { useEffect } from "react";

const UserProfile = ({ user }) => {

  useEffect(() => {}, [user]);


  return (
    <div className="w-full min-h-screen flex justify-center items-start">
       <VerticalTab user={user}/>
    </div>
  );
};

export default UserProfile;
