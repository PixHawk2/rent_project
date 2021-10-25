import {NavBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import react from 'react'
import './index.scss'
import PropTypes  from 'prop-types'
function NavHeader({children,history,onLeftClick,className,rightContent}){
    const defaultClickHander = () => history.push('/home')
    return(
    <NavBar
        className={['navBar',className ||''].join(' ')}
        mode="light"
        icon={<i className='iconfont icon-back' />}
        onLeftClick={onLeftClick||defaultClickHander}
        rightContent={rightContent}
    >{children}
    </NavBar>)
}
NavHeader.propTypes = {
    children:PropTypes.string.isRequired,
    onLeftClick:PropTypes.func,
    className:PropTypes.string,
    rightContent:PropTypes.array
}
// 高阶组件返回的也是组件
export default withRouter(NavHeader)