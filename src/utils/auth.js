const TOKEN_NAME = 'hudi_token'
// 获取token值
const getToken =()=>localStorage.getItem(TOKEN_NAME)
// 设置token
const setToken = (value)=>localStorage.setItem(TOKEN_NAME,value)

// 删除token
const removeToken = () =>localStorage.removeItem(TOKEN_NAME)

// 获取登录状态!!强制转换为boolean类型
const isAuth = ()=>!!getToken()

export {getToken,setToken,removeToken,isAuth}