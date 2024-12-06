import axios, { endpoints } from './axios'
export const apiGetCurrent = () => {
    return axios({
        method: 'get',
        url: endpoints.user.getCurrent
    })
}
export const apiUpdatePassword = (data) => { 
    return axios({
        method:'patch',
        url: endpoints.user.updatePassword,
        data
    })
 }
 export const apiUpdatePatchUser = (data) => { 
    return axios({
        method:'patch',
        url: endpoints.user.updatePatchUser,
        data
    })
 }