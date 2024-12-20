import axios, { endpoints } from "./axios";
export const apiGetCurrent = () => {
  return axios({
    method: "get",
    url: endpoints.user.getCurrent,
  });
};
export const apiUpdatePassword = (data) => {
  return axios({
    method: "patch",
    url: endpoints.user.updatePassword,
    data,
  });
};
export const apiUpdatePatchUser = (data) => {
  console.log(data)
  return axios({
    method: "patch",
    url: endpoints.user.updatePatchUser,
    data,
  });
};
export const apiGetUsers = (params) => {
  return axios({
    method: "get",
    url: endpoints.user.allUsers,
    params
  });
};
export const apiDeleteUser = (uid) => {
  return axios({
    method: "delete",
    url: endpoints.user.allUsers+uid,

  });
};
export const apiNewUser = (data) => {
  return axios({
    method: "post",
    url: endpoints.user.newUser,
    data
  });
};
export const apiUpUserByAdmin = (data) => {
  return axios({
    method: "patch",
    url: endpoints.user.upUserByAdmin,
    data
  });
};
export const apiUpdatePricingUser = (data) => {
  return axios({
    method: "patch",
    url: endpoints.user.upUserByAdmin,
    data
  });
};

export const apiSenOTPPhone = (data) => {
  return axios({
    method: "post",
    url: endpoints.user.sendOTP,
    data
  });
};
export const apiVerifyOTP = (data)=>{
  return  axios({
    method:'patch',
    url: endpoints.user.verifyOTP,
    data
  })
}
export const apiChartUser = (data)=>{
  return  axios({
    method:'post',
    url: endpoints.user.chartUser,
    data
  })
}



