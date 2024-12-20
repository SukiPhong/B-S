import axios, { endpoints } from "./axios";

export const apiToggleWishList = (id) => {
  return axios({
    method: "post",
    url: endpoints.wishlist.toggle + id,
  });
};
export const apiGetWishList = () => axios({
   method: "get",
   url: endpoints.wishlist.get,
})
