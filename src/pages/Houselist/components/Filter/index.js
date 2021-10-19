import React from "react";
import FilterTitle from "../FilterTitle";
import FilterPicker from "../FilterPicker";
import FilterMore from "../FilterMore";
import { API } from "../../../../utils/api";
import styles from './index.module.css'

const titleSelectedStatus = {
    area:false,
    mode:false,
    price:false,
    more:false
}
export default class Filter extends React.Component{
    state = {
        titleSelectedStatus,
        openType:'',
        filtersData:{}
    }
    componentDidMount(){
        this.getFilterData()
    }
    // 获取筛选条件对应的房源数据的函数
    async getFilterData(){
        const {value} = JSON.parse(localStorage.getItem('hudi_rent'))
        const res = await API.get(`/houses/condition?id=${value}`)
        this.setState({
            filtersData:res.data.body
        })
        
    }
    // 封装FilterPicker组件渲染
    /**/
    renderFilterPicker(){
        const {openType,filtersData:{area,subway,rentType,price}} = this.state
        if(openType !== 'area'&& openType !== 'mode' && openType !=='price'){
            return null
        }
        let data = []
        let cols = 3
        switch(openType){
            case('area'):
                data = [area,subway]
                cols = 3
                break;
            case('mode'):
                data = rentType
                cols = 1
                break;
            case('price'):
                data = price
                cols = 1
                break;
            default:
                break;
        }
        return  <FilterPicker onCancel={this.onCancel} onSave={this.onSave} data={data} cols={cols}/>
    }
    onTitleClick = type =>{
        this.setState(prevState =>{
            return {
                titleSelectedStatus:{
                    ...prevState.titleSelectedStatus,
                    [type]:true
                },
                openType:type
            }
        })
    }
    onCancel = () => {
        this.setState({
            openType:''
        })
    }

    onSave = () =>{
        this.setState({
            openType:''
        })
    }
    render(){
        const {titleSelectedStatus,openType} = this.state
        return(
            <div className={styles.root}>
                {/* 前三个菜单的遮罩层，如果点击前三个标签，显示FilterPicker组件以及遮罩层,练习时因为少了一个top:0导致遮罩层无法显示！！！ */}
                {
                    openType === 'area' || openType === 'mode' || openType === 'price' ? (
                    <div className={styles.mask} onClick={this.onCancel} />
                    ) : null
                }
                <div className={styles.content}>
                <FilterTitle titleSelectedStatus={titleSelectedStatus}
                onClick={this.onTitleClick}
                />
                {
                   this.renderFilterPicker()
                }
                    
                    {/* <FilterMore /> */}
                </div>
            </div>
        )
    }
}