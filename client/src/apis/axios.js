import axios from "axios";

const axiosInstance = axios.create({
baseURL: import.meta.env.VITE_SERVER_URL,// http://localhost:5100/api/v1
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
    forgotPw:"/auth/forgot/",
    resetPw:"/auth/reset-password/"
    
  },
  user: {
    getCurrent: "/user/Current",
    updatePassword:"/user/updatePassword",
    updatePatchUser:"/user/updatePatchUser",
    allUsers:'/user/',
    newUser:'/user/NewUser',
    upUserByAdmin:'/user/upUserByAdmin',
    sendOTP:'/user/sendOTP',
    verifyOTP:'/user/verifyOTP',
     chartUser:'/user/chartUser'
  },
  pricing:{
    getPricings:'/pricing/',
    editPricing:'/pricing/'
  },
  payment:{
     getUrlVnPay:'/payment/create_payment_url',
     returnPayment:'/payment/payment_return',
     getHistory:'/payment/getHistory',
     getHistorys:'/payment/',
  },
  post:{
    Post:'/posts/',// create  get detail delete
    approve:'/posts/approve/',
    getFeature:'/posts/randomPost',
    chartPost:'/posts/chart'
  },
  wishlist:{
    get:'/wishlist/',
    toggle:'/wishlist/toggle/',

  },
  rating:{
    rating:'/ratings/',
  },
  external: {
    getProvinces:
      "https://vietnam-administrative-division-json-server-swart.vercel.app/province",
    getDistrictsById:
      "https://vietnam-administrative-division-json-server-swart.vercel.app/district/?idProvince=",
    getWardsById:
      "https://vietnam-administrative-division-json-server-swart.vercel.app/commune/?idDistrict=",  
  },
  cloudinary: {
    Cloudinary:`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`
  },
};
