import HttpService from "@/services/HttpService";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const csrf = () => HttpService.get("/sanctum/csrf-cookie");

export default async function auth(req, res) {

  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const providers = [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",

      async authorize(credentials, req, res) {
        //show user credentials
        //get laravel csrf token
        await csrf();

        try {
          //send login request to backend url:http://127.0.0.1:8000/api/v1/login
          const response = await fetch(`${apiUrl}/api/v1/login`, {
            method: "POST",
            body: JSON.stringify({
              email:credentials.email,
              password:credentials.password
            }),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            withCredentials: true,
          });
          //extract user from response
          const data = await response?.json();
          //if response is not ok then show error
          if (!response.ok) {
            if(response.status===403){
              throw new Error(data.message || "Email verification required to access this resource.");
            }else{
              throw new Error(data.message || "Something went wrong");
            }
          }
          //extract user from response
          const user = data.user;
          //if response is ok and find user then return user to authorize()
          if (response.ok && user) {
            //send response this format
            return {
              status: "success",
              userData: data,
            };
          }
        } catch (error) {
          console.log("[error]", error.message);
          throw new Error(error.message || "Something went wrong");
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ];

  const isDefaultSigninPage =
    req.method === "GET" && req.query.nextauth.includes("signin");

  // Will hide the `GoogleProvider` when you visit `/api/auth/signin`
  if (isDefaultSigninPage) providers.pop();

  return await NextAuth(req, res, {
    secret: process.env.NEXTAUTH_SECRET,
    providers,
    callbacks: {
      async jwt({ token, user }) {
        const user_id = token?.user?.userData?.user?.id;
        const apiToken = token?.user?.userData?.token;

        // update session when user in updated
        if (req?.url?.includes("/api/auth/session?update")) {
          const response = await fetch(
            `${apiUrl}/api/v1/profile/${user_id}/user`,
            {
              // const response=await fetch(`http://127.0.0.1:8000/api/v1/profile/${user_id}/user`, {
              method: "GET",
              headers: {
                Accept: "application/json; charset=UTF-8",
                Authorization: `Bearer ${apiToken}`,
              },
            }
          );

          const user = await response?.json();
          console.log("[update-user]", user);
          if (response.ok && user) {
            token.user = user;
            return token;
          }
        }

        if (user) {
          token.user = user;
        }

        return token;
      },
      async session({ session, token }) {
        if (!session) return;

        session.user = token.user;

        return session;
      },
      async redirect({ url, baseUrl }) {
        return baseUrl;
      },
    },
  });
}
