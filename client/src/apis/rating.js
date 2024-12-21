import axios, { endpoints } from "./axios";
export const apiGetRating = (params) => {
    return axios({
      method: "get",
      url: endpoints.rating.rating+params,
    });
  };
  export const apiCreateRating = (data) => {  
    return axios({  
      method: "post", 
      url: endpoints.rating.rating,   
      data:data
    });  
  };  