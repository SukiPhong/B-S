import axios, { endpoints } from "./axios";

export const apiVnPayUrl = (data) => {
  return axios({
    method: "post",
    url: endpoints.payment.getUrlVnPay,
    data,
  });
};
export const apiVnPayReturn = (data) => {
  return axios({
    method: "post",
    url: endpoints.payment.returnPayment,
    data,
  });
};
export const apiGetHistory = () =>
  axios({
    method: "get",
    url: endpoints.payment.getHistory,
  });
  export const apiGetHistorys = (params) =>
    axios({
      method: "get",
      url: endpoints.payment.getHistorys,
      params
    });
  
