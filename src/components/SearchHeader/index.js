// 封装导航栏组件
import { func } from "prop-types";
import React from "react";
import { withRouter } from "react-router-dom";
import { Flex } from "antd-mobile";
import styles from './index.module.css'
import PropTypes  from 'prop-types'
import './search.scss'


function Searchheader({history,cityName}){
    return(
        <Flex className='search-box'>
                <Flex className='search'>
                    <div className='location' onClick={()=>{history.push('/citylist')}}>
                        <span className='name'>{cityName}</span>
                        <i className='iconfont icon-arrow' />
                    </div>
                    <div className="form" onClick={()=>{history.push('/search')}}>
                        <i className="iconfont icon-seach" />
                        <span className="text">请输入小区或地址</span>
                    </div>
                </Flex>
            {/* 右侧地图图标 */}
                 <i className='iconfont icon-map'
                    onClick={()=>{history.push('/map')}}
            />
            </Flex> 
    )
}
Searchheader.propTypes = {
    cityName:PropTypes.string.isRequired
}
export default withRouter(Searchheader)