import Axios from "axios";
import { getSession } from "next-auth/react";

class HttpService {
  static api = () => {
    //create instance of axios
    const api = Axios.create({
      //setup baseURL:localhost:8000
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
      //setup headers
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        'Accept': 'application/json'
      },
      withCredentials: true,
    });
    //setup api response header

    // api.interceptors.response.use(
    //   (response) => response,
    //   (error) => {
    //     if(error.response.status===403){
          
    //     }
        // console.log("[error]", error);
        // if(error.response.status==401){
        //     console.log("You are not logged in");
        // }
    //   }
    // );


    // setup request header
    api.interceptors.request.use(async (config) => {
      //set csrf token for post put and delete requests
      if (
        config.method === "POST" ||
        config.method === "DELETE" ||
        config.method === "PUT" ||
        config.method === "PATCH"
      ) {
        //get csrf token from request header
        let csrfToken = getCookie("XSRF-TOKEN");
        if (!csrfToken) {
          //new request to get csrf token from cookie
          await HttpService.get("/sanctum/csrf-cookie");
          //store that csrf token
          csrfToken = getCookie("XSRF-TOKEN");
        }
        config.headers["X-XSRF-TOKEN"] = csrfToken;
      }
      config.credentials = true;
      // get session
      const session = await getSession();
      // extract api resource token from session
      const token = session?.user?.userData?.token;
      // if token exists then set request header authorization config
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    });

    return api;
  };

  static get = async (url, config = {}) => {
    const api = this.api();
    return await api.get(url);
  };

  static post = async (url, data, config) => {
    const api = this.api();
    return await api.post(url, data, config);
  };

  static put = async (url, data) => {
    const api = this.api();
    return await api.put(url, data);
  };

  static delete = async (url) => {
    const api = this.api();
    return await api.delete(url);
  };

}

export default HttpService;
