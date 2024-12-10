import axios from "axios";
import { endpoints } from "./axios";

export const apiGetCredentialsFromAccessToken = (accessToken) =>
  axios({
    method: "get",
    url: endpoints.auth.getCredentialGoogleToken + accessToken,
  });
export const apiGetProvinces = () =>
  axios({
    method: "get",
    url: endpoints.external.getProvinces,
  });
export const apiGetDistrictsById = (did) =>
  axios({
    method: "get",
    url: endpoints.external.getDistrictsById + did,
  });
export const apiGetWardsById = (wid) =>
  axios({
    method: "get",
    url: endpoints.external.getWardsById + wid,
  });
export const apiUploadImages = (data) =>
  axios({
    method: "post",
    // url:`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`,
    url: endpoints.cloudinary.Cloudinary,
    data,
  });
export const apiGetLongitudeAndLatitudeFromAddress = (address) =>
  axios({
    method: "get",
    url: `https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=${
      import.meta.env.VITE_API_GEOAPIFY
    }`,
  });
