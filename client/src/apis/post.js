import axios, { endpoints } from "./axios";
export const apiCreatePost = (data) => { 
    return axios({
        method:'post',
        url: endpoints.post.createPost,
        data
    })
 }
 export const apiGetPrototypes = (params) =>(axios({
    method:"get",
    url: endpoints.post.Post,
    params
 }))
 export const apiDeletePostId = (pid) =>(axios({
    method:"delete",
    url: endpoints.post.Post +{pid},
   
 }))
 export const apiGetPrototypesDetail = (idPost) =>(
   axios({
   method:"get",
   url: endpoints.post.Post+idPost,
}))
