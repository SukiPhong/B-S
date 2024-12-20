import axios, { endpoints } from "./axios";
export const apiCreatePost = (data) => { 
    return axios({
        method:'post',
        url: endpoints.post.Post,
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
    url: endpoints.post.Post +pid,
   
 }))
 export const apiGetPrototypesDetail = (idPost) =>(
   axios({
   method:"get",
   url: endpoints.post.Post+idPost,
}))
export const apiUpdatePatchPost = (data) =>(
   axios({
      method:'patch',
      url:endpoints.post.Post,
      data
   })
)
export const apiApprovePost = (pid) =>(
   axios({
      method:'patch',
      url:endpoints.post.approve+pid,
   })
)
export const apiGetFeatured = () =>(
   axios({
      method:'get',
      url:endpoints.post.getFeature,
   })
)

export const apiGetChart = (data) =>(
   axios({
      method:'post',
      url:endpoints.post.chartPost,
      data
   })
)

