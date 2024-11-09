import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});
axiosInstance.interceptors.request.use((config) => {
  const store = window.localStorage.getItem("BDSv1/me");
  if (store) {
    const parseStore = JSON.parse(store);
    if (parseStore && parseStore.state?.token) {
      config.headers.Authorization = `Bearer ${parseStore.state.token}`;
    }
  }
  return config;
});
axiosInstance.interceptors.response.use((response) => response);
export default axiosInstance;
export const endpoints = {
  auth: {
    getCredentialGoogleToken:
      "https://www.googleapis.com/oauth2/v1/userinfo?access_token=",
    checkNewUser: "/auth/check-user/",
    signInWithGoogle: "/auth/googleLogin",
    register: "/auth/register",
    login: "/auth/login",
    forgotPw:"auth/forgot/",
    resetPw:"auth/reset-password/"
  },
  user: {
    getCurrent: "user/Current",
  },
  external: {
    getProvinces:
      "https://vietnam-administrative-division-json-server-swart.vercel.app/province",
    getDistrictsById:
      "https://vietnam-administrative-division-json-server-swart.vercel.app/district/?idProvince=",
    getWardsById:
      "https://vietnam-administrative-division-json-server-swart.vercel.app/commune/?idDistrict=",  
  },
};
