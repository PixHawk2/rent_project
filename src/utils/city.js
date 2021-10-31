const TOKEN_NAME =  'hudi_rent'
// 获取当前定位城市
const getCity = () =>JSON.parse(localStorage.getItem(TOKEN_NAME)) || {}
// 修改当前定位城市
const setCity = (value) => localStorage.setItem(TOKEN_NAME,value)

export {getCity,setCity}