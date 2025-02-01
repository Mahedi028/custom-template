import useSWR from "swr";
import HttpService from "@/services/HttpService";
import { useEffect } from "react";
import { useRouter } from "next/router";
import queryString from "query-string";
import { getFromStorage, saveToStorage } from "@/helper/helper";

export const useAuth = () => {
  //use router
  const router = useRouter();
  //fetch auth user
  const {
    data: user,
    error,
    revalidate,
  } = useSWR(
    "/api/v1/user",
    async () =>
      await HttpService.get("/api/v1/user")
        .then((res) => {
          return res.data.data;
        })
        .catch((error) => {
          if (error?.response?.status != 409) throw error;
          router.push("/verify-email");
        })
  );

  const csrf = () => HttpService.get("/sanctum/csrf-cookie");

  const register = async ({ setLoading, setErrors, ...props }) => {
    setErrors([]);

    await HttpService.post("/api/v1/register", props)
      .then((response) => {
        // revalidate()
        if (response?.status === 200) {
          setLoading(false);
          if (response?.data?.user) {
            //extract token from response
            const token = response?.data?.token;
            //set token in local storage
            saveToStorage("register_token", token);
            //redirect to login
            router.push({
              pathname: "/login",
              query: {
                message: response.data.message,
              },
            });
          }
        }
      })
      .catch((error) => {
        if (error.response) {
          setLoading(false);
          props.setErrorMessage(error.response.data.message);
        } else if (error.request) {
          // console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  };

  const verifyEmail = async ({ ...props }) => {
    //get token from local storage
    const token = getFromStorage("register_token");
    //process query parameters
    const params = {
      email: props.email,
      expires: props.expires,
      signature: props.signature,
    };
    //generate url with query parameters
    const queryParams = queryString.stringify(params);
    //api url with query parameters
    const url = `/api/v1/verify-email?${queryParams}`;
    //send api request
    await HttpService.post(
      url,
      {},
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          //set loading false
          props.setLoading(false);
          //delete registered token
          localStorage.removeItem("register_token");
          //redirect to login
          router.push({
            pathname: "/login",
            query: {
              message: response.data.message,
            },
          });
        }
      })
      .catch((error) => {
        if (error.response) {
          props.setLoading(false);
          if (error.response.status === 403) {
            props.setErrorMessage(
              "Email Verification Link Expired.Please resend verify email again"
            );
          } else {
            props.setErrorMessage(error.response.data.message);
          }
        } else if (error.request) {
          // console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  };

  const login = async ({ setErrors, setStatus, ...props }) => {
    setStatus(null);
    setErrors([]);
    await HttpService.post("/api/v1/login", props, {
      Headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        revalidate();
        if (response.status === 200) {
          if (response.data.isLoggedIn) {
            alert("has been logged in");
            //redirect to login
            router.push({
              pathname: "/login",
              query: {
                message: response.data.message,
              },
            });
          }
        }
      })
      .catch((error) => {
        if (error.response.status != 422) throw error;
        setErrors(Object.values(error.response.data.errors).flat());
      });
  };

  const forgotPassword = async ({
    setLoading,
    setErrors,
    setErrorMessage,
    email,
  }) => {
    await csrf().then((res) => {
      //extract request header
      const data = res.config.headers;
      //extract xrf token
      const _token = Object.values(data)[2];
      //set error empty array
      setErrors([]);
      //send api request
      HttpService.post(
        "/api/v1/forget-password",
        { email },
        {
          Headers: {
            _token: _token,
          },
        }
      )
        .then((response) => {
          if (response.status === 200) {
            setLoading(false);
            if (response?.data) {
              router.push({
                pathname: "/login",
                query: {
                  message: response.data.message,
                },
              });
            }
          }
        })
        .catch((error) => {
          setLoading(false);
          if (error.response) {
            setLoading(false);
            setErrorMessage(error.response.data.message);
          } else if (error.request) {
            // console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
        });
    });
  };
  const updateProfile = async ({
    setErrors,
    setStatus,
    setLoading,
    id,
    name,
    email,
    phone_number,
  }) => {
    await csrf().then((res) => {
      setLoading(true);
      //extract header data
      const data = res.config.headers;
      //extract xrf-token
      const _token = Object.values(data)[2];
      //set status null
      setStatus(null);
      //set errors null
      setErrors([]);
      //send api request
      HttpService.put(
        `/api/v1/user/${id}/update`,
        { name, email, phone_number },
        {
          Headers: {
            _token: _token,
          },
        }
      )
        .then((response) => {
          setStatus(response?.data?.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          if (error.response) {
            setLoading(false);
            setErrorMessage(error.response.data.message);
          } else if (error.request) {
            // console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
        });
    });
  };
  const updateSession = async ({ setErrors, setStatus }) => {
    //send xrf token request
    await csrf();

    setStatus(null);
    setErrors([]);

    await fetch("http://localhost:3000/api/auth/session?update", {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((res) => {
        console.log("[update-session]", res.json());
      })
      .catch((error) => {
        console.log("[error]", error);
      });
  };

  const resetPassword = async ({
    setLoading,
    setErrors,
    setStatus,
    setErrorMessage,
    input_email,
    email,
    password,
    password_confirmation,
    ...props
  }) => {
    //process the query parameters
    const params = {
      email: email,
      expires: props.expires,
      signature: props.signature,
    };
    //query params
    const queryParams = queryString.stringify(params);
    //api url
    const url = `/api/v1/reset-password?${queryParams}`;
    //send api request
    await csrf().then((res) => {
      //extract header data
      const data = res.config.headers;
      //extract xrf token
      const _token = Object.values(data)[2];
      //set error null
      setErrors([]);
      //api request
      HttpService.post(
        url,
        {
          input_email,
          email,
          password,
          password_confirmation,
        },
        {
          Headers: {
            _token: _token,
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        }
      )
        .then((response) => {
          if (response.status === 200) {
            setLoading(false);
            if (response?.data?.statusCode) {
              router.push({
                pathname: "/login",
                query: {
                  message: response.data.message,
                },
              });
            } else {
              const same_site =
                "http://localhost:3000" + url.replace("/api/v1", "");
              router.push({
                pathname: same_site,
                query: {
                  message: response.data.message,
                },
              });
            }
          }
        })
        .catch((error) => {
          setLoading(false);
          if (error.response) {
            setLoading(false);
            if(error.response.status ===403){
              setErrorMessage("Your reset password link has been expired. Please try again");
            }else{
              setErrorMessage(error.response.data.message);
            }
          } else if (error.request) {
            // console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          // if (error.response?.status != 422) throw error;
          // setErrors(Object.values(error.response.data.errors).flat());
        });
    });
  };

  const resendEmailVerification = ({ setMessage }) => {
    HttpService.post("/api/v1/send/email/verification")
      .then((response) => {
        if (response.status == 200) {
          console.log("[response]", response);
        }
      })
      .catch((error) => {});
  };

  const logout = async () => {
    await fetch("http://localhost:3000/api/auth/signout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((res) => {
        console.log("[session-data]", res.json());
      })
      .catch((error) => {
        console.log("[error]", error);
      });
    window.location.pathname = "/login";
  };

  useEffect(() => {
    // if (middleware == 'guest' && redirectIfAuthenticated && user) router.push(redirectIfAuthenticated)
    // if (middleware == 'auth' && error) logout()
  }, [user, error]);

  return {
    user,
    register,
    verifyEmail,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    updateProfile,
    updateSession,
    logout,
  };
};
