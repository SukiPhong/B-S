import axios from 'axios';
import { endpoints } from './axios';

export const apiGetCredentialsFromAccessToken = (accessToken) => axios({
    method: "get",
    url: endpoints.auth.getCredentialGoogleToken + accessToken,

})
export const apiGetProvinces = () => axios({
    method: 'get',
    url: endpoints.external.getProvinces,
})
export const apiGetDistrictsById= (did) => axios({
    method: 'get',
    url: endpoints.external.getDistrictsById + did,
})
export const apiGetWardsById = (wid) => axios({
    method: 'get',
    url: endpoints.external.getWardsById +wid,
})