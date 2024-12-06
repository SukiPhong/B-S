import axios, { endpoints } from './axios'
export const apiCheckNewUser = (email) => axios({
    method: 'get',
    url: endpoints.auth.checkNewUser + email
})
export const apiSignInWithGoogle = (data) => axios({
    method: 'post',
    url: endpoints.auth.signInWithGoogle,
    data,
})
export const apiRegister = (data) => axios({
    method: 'post',
    url: endpoints.auth.register,
    data,
})
export const apiLogin = (data) => axios({
    method: 'post',
    url: endpoints.auth.login,
    data,
})
export const apiForgotPw = (email) =>axios({
    method:'post',
    url: endpoints.auth.forgotPw + email
    
})
export const apiResetPw = (data) =>axios({
    method:'post',
    url:endpoints.auth.resetPw,
    data,
})
