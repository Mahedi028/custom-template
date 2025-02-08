import React, {useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import HttpService from "@/services/HttpService";
import AppLayout from "@/components/UI/layout/app/AppLayout";
import CircleLoader from "@/components/UI/loader/circle/CircleLoader";
import { toast } from "react-toastify";

const GoogleSignInPage = () => {
  //use router hook
  const router = useRouter();
  //use session hook
  const { data: session } = useSession();
  //extract google sign in data from url
  const code = router?.query["code"];
  const scope = router?.query["scope"];
  const authUser = router?.query["authuser"];
  const prompt = router?.query["prompt"];
  const param = router?.query;

  //define loading
  const [loading, setLoading] = useState(false);
  //define message
  const [errorMessage, setErrorMessage] = useState("");

  //handle google sign in
  const handleGoogleCallback = async () => {
    //define url
    const url = `/api/v1/login/google/callback?code=${code}&scope=${scope}&authuser=${authUser}&prompt=${prompt}`;
    //send next auth
    const result = await signIn("credentials", {
      redirect: false,
      _callbackUrl: `${window.location.origin}`,
      googleCallbackUrl: url,
    }).then((res) => {
      if (res.status === 200) {
        setLoading(false);
        toast.success("Login Successfully", {
          position: "top-center",
          autoClose: 5000,
        });
      } else {
        setLoading(false);
        if (res.error) {
          setErrorMessage(res.error);
        } else {
          toast.error("Invalid Credentials Try again", {
            position: "top-center",
            autoClose: 5000,
          });
        }
      }
    });
  };

  useEffect(() => {
    if (router?.query) {
      handleGoogleCallback();
    }
  }, [router?.query]);

  if (session && session?.user) {
    router.push("/");
  }
  return (
    <AppLayout>
      <CircleLoader />
    </AppLayout>
  );
};

export default GoogleSignInPage;
