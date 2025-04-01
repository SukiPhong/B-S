import axios, { endpoints } from "./axios";
export const apiGetPricing = () =>(
    axios({
    method:"get",
    url: endpoints.pricing.getPricings,
 }))
 export const apiEditPricing = (data) =>(
    axios({
    method:"patch",
    url: endpoints.pricing.editPricing,
    data
 }))