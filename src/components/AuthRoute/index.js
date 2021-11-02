import React from "react"
import { Route,Redirect } from "react-router-dom"
import { isAuth } from "../../utils"



// {...rest}是要将AuthRoute组件接受到的props原样传递给Route组件
const AuthRoute = ({component:Component,...rest})=>{
    return <Route {...rest} render={(props)=>{
        const isLogin =  isAuth()
        if(isLogin){
            // login success!渲染当前组件
            return <Component {...props} />
        }else{
            // login failed
            return <Redirect 
                to={
                    {
                        pathname:'/login',
                        state:{
                            from: props.location
                        }
                    }
                }
            />
        }
    }}>
    </Route>
}
export default AuthRoute