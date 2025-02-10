import AdminLayout from "@/components/UI/layout/admin/AdminLayout";
import React from "react";
import Dashboard from "@/components/admin/dashboard/Dashboard";
import { getSession } from "next-auth/react";

//laravel api url
const api = process.env.NEXT_PUBLIC_BACKEND_URL;

const DashboardPage = ({ user }) => {
  return (
    <AdminLayout>
      <Dashboard user={user} />
    </AdminLayout>
  );
};

export async function getServerSideProps(context) {
  //get session
  const session = await getSession({ req: context.req });
  //get user type
  const userType = session?.user?.userData?.role || null;
  //check if session is already available or not
  if (!session && userType!=="admin") {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
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
  //extract the user
  const user = await res?.json();
  //return the user to the props
  return {
    props: {
      session,
      user,
    },
  };
}

export default DashboardPage;
