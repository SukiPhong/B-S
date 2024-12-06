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
    url: endpoints.post.getPosts,
    params
 }))
 export const apiDeletePostId = (pid) =>(axios({
    method:"delete",
    url: endpoints.post.deletePost +{pid},
   
 }))
