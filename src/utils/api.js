import axios from "axios";
import { BASE_URL } from "./url"
import { getToken,removeToken } from "./auth";
const API = axios.create({
    baseURL:BASE_URL
})
// 添加拦截器
API.interceptors.request.use(config=>{
    // console.log(config,'+++++',config.url)
    const {url} = config
    if(url.startsWith('/user')&&!url.startsWith('/user​/login')&&!url.startsWith('/user/registered')){
        config.headers.Authorization = getToken()
    }

    return config
})
API.interceptors.response.use(response =>{
    // console.log('????',config)
    const {status} = response.data
    if(status === 400){
        // token失效的情况
        removeToken()
    }
    return response
})

export {API}