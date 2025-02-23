import UserProfile from "@/components/auth/user/UserProfile";
import AppLayout from "@/components/UI/layout/app/AppLayout";
import React from "react";
import { getSession } from "next-auth/react";

//laravel api url
const api = process.env.NEXT_PUBLIC_BACKEND_URL;

const UserProfilePage = ({ user }) => {
  return (
    <AppLayout>
      <UserProfile user={user} />
    </AppLayout>
  );
};

export async function getServerSideProps(context) {
  //get user session
  const session = await getSession({ req: context.req });
  //get user type
  const userType = session?.user?.userData?.role || null;
  //check session exists or not
  if (session && userType !== "user") {
    return {
      redirect: {
        destination: "/login",
        permanent: true,
      },
    };
  }

  //extract token from session
  const token = session?.user?.userData?.token;
  // const res = await fetch("http://127.0.0.1:8000/api/v1/user", {
  const res = await fetch(`${api}/api/v1/user`, {
    method: "GET",
    headers: {
      Accept: "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  //extract user information
  const user = await res?.json();
  //return user
  return {
    props: {
      session,
      user,
    },
  };
}

export default UserProfilePage;
