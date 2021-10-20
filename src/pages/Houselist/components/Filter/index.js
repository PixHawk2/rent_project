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
const selectedValue ={
    area:['area','null'],
    mode:['null'],
    price:['null'],
    more:[]
}
export default class Filter extends React.Component{
    state = {
        titleSelectedStatus,
        openType:'',
        filtersData:{},
        selectedValue
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
        const {openType,filtersData:{area,subway,rentType,price},selectedValue} = this.state
        if(openType !== 'area'&& openType !== 'mode' && openType !=='price'){
            return null
        }
        let data = []
        let cols = 3
        // let type = openType
        let defaultValue = selectedValue[openType]
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
        return  <FilterPicker
        key={openType} 
        onCancel={this.onCancel} 
        onSave={this.onSave} 
        data={data} 
        cols={cols} 
        type={openType}
        defaultValue={defaultValue}
        />
    }
    // 封装FilterMore渲染
    renderFilterMore(){
        const {openType,filtersData:{roomType,oriented,floor,characteristic}} = this.state
        if( openType !== 'more'){
            return null
        }
        let data = {
            roomType,oriented,floor,characteristic
        }
        return <FilterMore data={data} />
    }
    // 点击标题栏设置当前高亮
    onTitleClick = type =>{
        const {titleSelectedStatus,selectedValue} = this.state
        const newTitleSeleectedStatus = {...titleSelectedStatus}
        
        Object.keys(titleSelectedStatus).forEach(item=>{
            if(item === type){
                newTitleSeleectedStatus[item] = true
                return
            }
            const selectVal = selectedValue[item]
            if(item ==='area' && (selectVal.length !==2 || selectVal[0] !=='area')){
                newTitleSeleectedStatus[item] = true
            }
            else if(item ==='mode' && selectVal[0] !=='null'){
                newTitleSeleectedStatus[item] = true
            }
            else if( item ==='price' && selectVal[0] !=='null'){
                newTitleSeleectedStatus[item] = true
            }
            else if(item ==='more'){
                // null
            }
            else{
                newTitleSeleectedStatus[item] = false
            }
            
        })
        this.setState({
            openType:type,
            titleSelectedStatus:newTitleSeleectedStatus
        })
        // 下面为旧代码
        // this.setState(prevState =>{
        //     return {
        //         titleSelectedStatus:{
        //             ...prevState.titleSelectedStatus,
        //             [type]:true
        //         },
        //         openType:type
        //     }
        // })
    }
    onCancel = () => {
        this.setState({
            openType:''
        })
    }

    onSave = (value,type) =>{

        this.setState({
            openType:'',
            selectedValue:{...this.state.selectedValue,[type]:value}
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
                    
                {this.renderFilterMore()}
                </div>
            </div>
        )
    }
}