import axios, { endpoints } from './axios'
export const apiGetCurrent = () => {
    return axios({
        method: 'get',
        url: endpoints.user.getCurrent
    })
}