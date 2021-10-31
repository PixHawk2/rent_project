import axios from "axios";
// 封装定位获取函数
export const getCurrentLocation = () =>{
    // 先判断本地存储中是否有data
    const localinfo = JSON.parse(localStorage.getItem('hudi_rent'));
    if(!localinfo){
        // 获取当前定位
        return new Promise((resolve,reject)=>{
                const myCity = new window.BMap.LocalCity();
                myCity.get(async res=>{
                    try{
                        const result = await axios.get(`http://localhost:8080/area/info?name=${res.name}`);
                        localStorage.setItem('hudi_rent',JSON.stringify(result.data.body));
                        resolve(result.data.body);
                    }
                    catch(error){
                        // 获取失败
                        reject(error);
                    }
            })
        })
    }
    return Promise.resolve(localinfo);
}
export {API} from './api'
export {BASE_URL} from './url'
export {getCity,setCity} from './city'
export * from './auth'