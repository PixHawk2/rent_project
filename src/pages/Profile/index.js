import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { Grid, Button,Modal } from 'antd-mobile'

import { BASE_URL } from '../../utils/url'
import {getToken,isAuth,API,removeToken} from '../../utils'

import styles from './index.module.css'
import { is } from '@react-spring/shared'

// 菜单数据
const menus = [
  { id: 1, name: '我的收藏', iconfont: 'icon-coll', to: '/favorate' },
  { id: 2, name: '我的出租', iconfont: 'icon-ind', to: '/rent' },
  { id: 3, name: '看房记录', iconfont: 'icon-record' },
  {
    id: 4,
    name: '成为房主',
    iconfont: 'icon-identity'
  },
  { id: 5, name: '个人资料', iconfont: 'icon-myinfo' },
  { id: 6, name: '联系我们', iconfont: 'icon-cust' }
]
// 默认头像
const DEFAULT_AVATAR = BASE_URL + '/img/profile/avatar.png'
export default class Profile extends Component {
    // avatarEditor = React.createRef()
    state = {
        isLogin:isAuth(),
        userInfo: {
        nickname: '' ,
        avatar: ''
        }
    }
//   获取用户信息
    async getUserInfo(){
        const {isLogin} = this.state
        if(!isLogin){
            return
        }
        const res = await API.get('/user',{
            headers:{
                authorization:getToken()
            }
        })
        // 一定要注意对象嵌套，在数据结构的过程中
        console.log('获取用户信息返回',res)
        if(res.data.status ===200){
            const {nickname,avatar} = res.data.body
            this.setState({
                userInfo: {
                    avatar:BASE_URL+avatar,
                    nickname
                } 
            })
        }
    }
    // 组件加载的生命周期
    componentDidMount() {
        this.getUserInfo()
    }
    // 退出的处理逻辑
    logout=()=>{
        const alert = Modal.alert
        alert('退出', '确定要退出吗?', [
            { text: '取消' },
            { text: '退出', onPress:async () => {
                // 调用接口服务端移除
                const res = await API.post('/user/logout',null,{
                    headers:{
                        authorization:getToken()
                    }
                })
                console.log('移除结果',res)
                // 本地token移除
                removeToken()
                this.setState({
                    isLogin:false,
                    userInfo: {
                        nickname: '' ,
                        avatar: ''
                    }
                })
            } }
        ])
    }
    render() {
        const {
        userInfo: { nickname, avatar },isLogin
        } = this.state
        const { history } = this.props

        return (
        <div className={styles.root}>
            {/* 个人信息 */}
            <div className={styles.title}>
            <img
                className={styles.bg}
                src={BASE_URL + '/img/profile/bg.png'}
                alt="背景图"
            />
            <div className={styles.info}>
                <div className={styles.myIcon}>
                <img className={styles.avatar} src={avatar||DEFAULT_AVATAR} alt="icon" />
                </div>
                <div className={styles.user}>
                <div className={styles.name}>{nickname || '游客'}</div>
                {/* 登录后展示： */}
                { isLogin?(<>
                    <div className={styles.auth}>
                    <span onClick={this.logout}>退出</span>
                    </div>
                    <div className={styles.edit}>
                    编辑个人资料
                    <span className={styles.arrow}>
                        <i className="iconfont icon-arrow" />
                    </span>
                    </div>
                </> ):(
                    <div className={styles.edit}>
                    <Button
                        type="primary"
                        size="small"
                        inline
                        onClick={() => history.push('/login')}
                    >
                        去登录
                    </Button>
                    </div>
                )}
                {/* 未登录展示： */}
                
                </div>
            </div>
            </div>

            {/* 九宫格菜单 */}
            <Grid
            data={menus}
            columnNum={3}
            hasLine={false}
            renderItem={item =>
                item.to ? (
                <Link to={item.to}>
                    <div className={styles.menuItem}>
                    <i className={`iconfont ${item.iconfont}`} />
                    <span>{item.name}</span>
                    </div>
                </Link>
                ) : (
                <div className={styles.menuItem}>
                    <i className={`iconfont ${item.iconfont}`} />
                    <span>{item.name}</span>
                </div>
                )
            }
            />

            {/* 加入我们 */}
            <div className={styles.ad}>
            <img src={BASE_URL + '/img/profile/join.png'} alt="" />
            </div>
        </div>
        )
    }
}
