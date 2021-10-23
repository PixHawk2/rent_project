import React from "react";

import {Flex} from 'antd-mobile'
import { List } from "react-virtualized";

// 基础链接地址导入
import { API } from "../../utils/api";
import { BASE_URL } from "../../utils/url";

// 渲染相关组件导入
import SearchHeader from "../../components/SearchHeader";
import Filter from "./components/Filter";
import HouseItem from "../../components/HouseItem";
// 样式文件导入
import styles from './index.module.css'

// 获取存储的当前城市定位
const {label,value} = JSON.parse(localStorage.getItem('hudi_rent'))
export default class Houselist extends React.Component{
    state = {
        count:0,
        list:[]
    }
    filterData = {}
    // 传递给Filter子组件的回调函数，用于子组件传递筛选值
    onFilter = (filterData)=>{
        this.filterData = filterData
        console.log('HouseList filter data is:',this.filterData)
        this.getFilterhouseData()//调用获取房屋列表数据的方法
    }
    // 获取筛选条件的房屋列表
    async getFilterhouseData(){     
        let res = await API.get(BASE_URL + '/houses',{
            params:{
                id:value,
                ...this.filterData,
                start:1,
                end:20
            }
        })
        console.log('房屋数据：',res)
        const {list,count} = res.data.body
        this.setState({
            list,
            count
        })
    }
    componentDidMount(){
        this.getFilterhouseData()
    }
    // 房屋列表渲染方法
    houseListItemRenderer= ({key,index,style}) => {
        // 获取到的房屋数据在state中
        const {list} = this.state
        const houselist = list[index]
        return (
            <HouseItem
                key={key}
                style={style}
                src={BASE_URL + houselist.houseImg}
                title={houselist.title}
                desc={houselist.desc}
                tags={houselist.tags}
                price={houselist.price}
            ></HouseItem>
        )
    }
    render(){
        return(
            <div>
                {/* 搜索导航实现 */}
                <Flex className={styles.header}>
                    <i className='iconfont icon-back ' onClick={()=>{this.props.history.go(-1)}}/>
                    <SearchHeader cityName={label} className={styles.searchHeader}/>
                </Flex>
                {/* 筛选框实现 */}
                <Filter onFilter={this.onFilter}/>
                {/* 房屋列表渲染 */}
                <div className={styles.houseListItem}>
                    <List
                         
                         width={300}
                         height={300}
                         rowCount={this.state.count}
                         rowHeight={120}//固定高度120px
                         rowRenderer={this.houseListItemRenderer}
                     />
                </div>
            </div>
        )
    }
}