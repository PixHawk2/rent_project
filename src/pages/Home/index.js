import React from 'react'
import { Route } from 'react-router'
// 为了防止后续影响Houselist中的样式
import './index.css'
import News from '../News'
import Houselist from '../Houselist'
import Index from '../Index'
import Profile from '../Profile'
import {TabBar} from 'antd-mobile'

// import Item from 'antd-mobile/lib/popover/Item'

// 将菜单栏的数据抽离出来


// 导航菜单切换到指定路由后，对应图标没有高亮的原因：
// 之前代码仅考虑吧home首次加载以及点击，对于home组件没有加载而导致的界面切换没有做处理？？？如何处理：
// 1.在componentDidupdate钩子函数中判断本次路由和上次是否相同，不同，则执行setstate
const tabbarinfor = [ 
    {
        title:"首页",
        icon:'icon-ind',
        path:'/home'
    },
    {
        title:"找房",
        icon:'icon-findHouse',
        path:'/home/houselist'
    },
    {
        title:"资讯",
        icon:'icon-mess',
        path:'/home/news'
    },
    {
        title:"我的",
        icon:'icon-my',
        path:'/home/profile'
    }
]



export default class Home extends React.Component{
    state = {
        selectedTab: this.props.location.pathname//默认选中项目
        // hidden: false,
        // fullScreen: false,
    }
    componentDidUpdate(nextProps){
        // console.log('上次路由信息',nextProps)
        // console.log('本次路由信息',this.props)大小写不要写错聊
        if(nextProps.location.pathname !== this.props.location.pathname){
            this.setState({
                selectedTab: this.props.location.pathname//默认选中项目
            })
        }
    }
    renerTabbaritem(){
        return tabbarinfor.map(item=>(
            <TabBar.Item
                    title = {item.title}
                    key= {item.title}
                    icon={
                        <i className={`iconfont ${item.icon}`} />
                    }
                    selectedIcon={ <i className={`iconfont ${item.icon}`} />
                    }
                    selected={this.state.selectedTab === item.path}
                    // badge={1}
                    onPress={() => {
                    this.setState({
                        selectedTab: item.path,
                    })
                    // 实现路由切换
                    this.props.history.push(item.path);
                    }}
                >
                </TabBar.Item>
                ))
    }
    render(){
        return(
            <div className='home'>
                <Route path='/home/news' component={News}/>
                <Route exact path='/home' component={Index}/>
                <Route path='/home/profile' component={Profile}/>
                <Route path='/home/houselist' component={Houselist}/>
            <div>
            <TabBar
            //   unselectedTintColor="#949494" 未选中颜色
            tintColor="#21b97a"
            barTintColor="white"
            //   hidden={this.state.hidden}
            noRenderContent={true}
            >
            {this.renerTabbaritem()}
            </TabBar>
            </div>
        </div>       
        )
    }
}