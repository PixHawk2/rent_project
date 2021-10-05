import React from 'react'
import { Route } from 'react-router'
import News from '../News'
import {TabBar} from 'antd-mobile'
import './index.css'
export default class Home extends React.Component{
    state = {
        selectedTab: this.props.location.pathname//默认选中项目
        // hidden: false,
        // fullScreen: false,
      }
    render(){
        return(
            <div className='home'>
                <Route path='/home/news' component={News}/>
                <Route path='/home/index' component={News}/>
                <Route path='/home/profile' component={News}/>
                <Route path='/home/houselist' component={News}/>
            <div>
            <TabBar
            //   unselectedTintColor="#949494" 未选中颜色
            tintColor="#21b97a"
            barTintColor="white"
            //   hidden={this.state.hidden}
            noRenderContent={true}
            >
            <TabBar.Item
                title="首页"
                key="Life"
                icon={
                    <i className='iconfont icon-ind' />
                }
                selectedIcon={<i className='iconfont icon-ind' />
                }
                selected={this.state.selectedTab === 'blueTab'}
                // badge={1}
                onPress={() => {
                this.setState({
                    selectedTab: 'blueTab',
                });
                }}
                data-seed="logId"
            >
            
            </TabBar.Item>
            <TabBar.Item
                icon={
                    <i className='iconfont icon-findHouse' />
                }
                selectedIcon={
                    <i className='iconfont icon-findHouse' />
                }
                title="找房"
                key="Koubei"
                // badge={'new'}
                selected={this.state.selectedTab === 'redTab'}
                onPress={() => {
                this.setState({
                    selectedTab: 'redTab',
                });
                }}
                data-seed="logId1"
            >
            
            </TabBar.Item>
            <TabBar.Item
                icon={
                    <i className='iconfont icon-mess' />
                }
                selectedIcon={
                    <i className='iconfont icon-mess' />
                }
                title="资讯"
                key="Friend"
                // dot
                selected={this.state.selectedTab === 'greenTab'}
                onPress={() => {
                this.setState({
                    selectedTab: 'greenTab',
                });
                }}
            >
    
            </TabBar.Item>
            <TabBar.Item
                icon={<i className='iconfont icon-my' />}
                selectedIcon={<i className='iconfont icon-my' />}
                title="我的"
                key="my"
                selected={this.state.selectedTab === 'yellowTab'}
                onPress={() => {
                this.setState({
                    selectedTab: 'yellowTab',
                });
                }}
            >
        
            </TabBar.Item>
            </TabBar>
            </div>
        </div>       
        )
    }
}