import React from 'react'
import { Route } from 'react-router'
import News from '../News'
import Houselist from '../Houselist'
import Index from '../Index'
import Profile from '../Profile'
import {TabBar} from 'antd-mobile'
import './index.css'
// import Item from 'antd-mobile/lib/popover/Item'

// 将菜单栏的数据抽离出来
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