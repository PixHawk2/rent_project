import React from "react"

import {Flex,Toast} from 'antd-mobile'
import { List,AutoSizer,WindowScroller,InfiniteLoader } from "react-virtualized"

// 基础链接地址导入
import { API } from "../../utils/api"
import { BASE_URL } from "../../utils/url"
import {getCurrentLocation} from '../../utils/index'

// 渲染相关组件导入
import SearchHeader from "../../components/SearchHeader"
import Filter from "./components/Filter"
import HouseItem from "../../components/HouseItem"
import Stricky from "../../components/Stricky"
import NoHouse from "../../components/NoHouse"
// 样式文件导入
import styles from './index.module.css'

// 获取存储的当前城市定位
// const {label,value} = JSON.parse(localStorage.getItem('hudi_rent'))
export default class Houselist extends React.Component{
    state = {
        count:0,
        list:[],
        isLoading:true
    }
    label = ''
    value = ''
    filterData = {}
    // 传递给Filter子组件的回调函数，用于子组件传递筛选值
    onFilter = (filterData)=>{
        window.scrollTo(0,0)
        this.filterData = filterData
        console.log('HouseList filter data is:',this.filterData)
        this.getFilterhouseData()//调用获取房屋列表数据的方法
    }
    
    async componentDidMount(){
        const {label,value} = await getCurrentLocation()
        this.label = label
        this.value = value
        this.getFilterhouseData()
    }
    // 获取筛选条件的房屋列表
    async getFilterhouseData(){
        // isLoading状态用于判断是否处于数据加载中...
        this.setState({
            isLoading:true
        })
        Toast.loading('Data loading...',0,null,false)   
        let res = await API.get('/houses',{
            params:{
                cityId:this.value,
                ...this.filterData,
                start:1,
                end:20
            }
        })
        Toast.hide()
        const {list,count} = res.data.body
        if(count !==0){
            Toast.info(`共找到${count}套房源`,2,null,false)
        }
        this.setState({
            list,
            count,
            isLoading:false
        })
    }

    // 房屋列表渲染方法
    houseListItemRenderer= ({key,index,style}) => {
        // 获取到的房屋数据在state中
        const {list} = this.state
        const houselist = list[index]
        // console.log(houselist)
        if(!houselist){
            // return Toast.loading('数据加载中',0,null,true)
            return (
                <div key={key} style={style}>
                    <p className={styles.loading}/>
                </div>
            )
        }
        return (
            <HouseItem
                key={key}
                style={style}
                src={BASE_URL + houselist.houseImg}
                title={houselist.title}
                desc={houselist.desc}
                tags={houselist.tags}
                price={houselist.price}
                onClick={()=>{this.props.history.push(`/detail/${houselist.houseCode}`)}}
            ></HouseItem>
        )
    }
    isRowLoaded = ({index})=>{
        return !!this.state.list[index];
    }
    // loadMoreRows方法的返回是个promise对象
    loadMoreRows = ({ startIndex, stopIndex }) =>{
        console.log('+*+*+*+*',startIndex,stopIndex)
        return new Promise(resolve =>{
            API.get(BASE_URL + '/houses',{
                params:{
                    id:this.value,
                    ...this.filterData,
                    start:startIndex,
                    end:stopIndex
                }
            }).then(res =>{
                console.log(res)
                // Toast.hide()
                this.setState({
                    list:[...this.state.list,...res.data.body.list]
                })
                resolve()
            })
            
        })
    }
    //将房屋列表的数据单独抽离出来，避免主流程混乱
    renderHouseList(){
        const {count,isLoading} = this.state
        if (count === 0 && isLoading === false){
           return <NoHouse>没有找到房源，请更换搜索条件吧~</NoHouse>
        }
        return(
            <InfiniteLoader 
                isRowLoaded={this.isRowLoaded}
                loadMoreRows={this.loadMoreRows}
                rowCount={count}
            >
                {({onRowsRendered, registerChild})=>(
                    <WindowScroller>
                    {({height,isScrolling,scrollTop})=>
                        (
                            <AutoSizer>
                                {({width})=>
                                    (
                                        <List
                                            onRowsRendered={onRowsRendered}
                                            ref={registerChild}
                                            autoHeight
                                            width={width}
                                            height={height}
                                            rowCount={count}
                                            rowHeight={120}//固定高度120px
                                            rowRenderer={this.houseListItemRenderer}
                                            isScrolling={isScrolling}
                                            scrollTop={scrollTop}
                                        />
                                    )
                                }
                            </AutoSizer>
                        )
                    }
                    </WindowScroller>
                )}
            </InfiniteLoader>
        )
    } 

    //需要多练习高阶组件的使用
    render(){
        const {count} = this.state
        return(
            <div>
                {/* 搜索导航实现 */}
                <Flex className={styles.header}>
                    <i className='iconfont icon-back ' onClick={()=>{this.props.history.go(-1)}}/>
                    <SearchHeader cityName={this.label} className={styles.searchHeader}/>
                </Flex>
                {/* 筛选框实现 */}
                <Stricky height={40}>
                    <Filter onFilter={this.onFilter}/>
                </Stricky>
                
                {/* 房屋列表渲染 */}
                <div className={styles.houseListItem}>{this.renderHouseList()}
                </div>
            </div>
        )
    }
}