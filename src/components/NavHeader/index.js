import {NavBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import react from 'react'
import './index.scss'

 function NavHeader({children,history,onLeftClick}){
    const defaultClickHander = () => history.push('/home')
    return(
    <NavBar
        className='navBar'
        mode="light"
        icon={<i className='iconfont icon-back' />}
        onLeftClick={onLeftClick||defaultClickHander}
    >{children}
    </NavBar>)
}
// 高阶组件返回的也是组件
export default withRouter(NavHeader)