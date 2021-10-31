import React, { Component } from 'react'

import { SearchBar } from 'antd-mobile'

import { API, getCity } from '../../../utils'

import styles from './index.module.css'

export default class Search extends Component {
  // 当前城市id
    cityId = getCity().value
    timerId = null
    state = {
        // 搜索框的值
        searchTxt: '',
        tipsList: []
    }
    onTipsClick = (item) =>{
        // console.log(item)
        this.props.history.replace('/rent/add',{
            name:item.communityName,
            id:item.community
        })
    }
  // 渲染搜索结果列表
    renderTips = () => {
        const { tipsList } = this.state

        return tipsList.map(item => (
        <li key={item.community} className={styles.tip}
        onClick={()=>{this.onTipsClick(item)}}
        >
            {item.communityName}
        </li>
        ))
  }
//   handleSearchText:处理文本框内容变化
    handleSearchText = value =>{
        this.setState({
            searchTxt:value
        })
        // 文本框的值为空
        if(!value){
            return this.setState({
                tipsList:[]
            })
        }
        clearTimeout(this.timerId)
        // 获取搜索数据并加入输入防抖
        this.timerId = setTimeout(async ()=>{
            const res = await API.get('/area/community',{
                params:{
                    name:value,
                    id:this.cityId
                }
            })
            this.setState({
                tipsList:res.data.body
            })
        },500)
    }

    render() {
        const { history } = this.props
        const { searchTxt } = this.state

        return (
        <div className={styles.root}>
            {/* 搜索框 */}
            <SearchBar
                placeholder="请输入小区或地址"
                onChange={this.handleSearchText}
                value={searchTxt}
                showCancelButton={true}
                onCancel={() => history.go(-1)}
            />

            {/* 搜索提示列表 */}
            <ul className={styles.tips}>{this.renderTips()}</ul>
        </div>
        )
  }
}
