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
        const {openType,filtersData:{roomType,oriented,floor,characteristic},selectedValue} = this.state
        if( openType !== 'more'){
            return null
        }
        let data = {
            roomType,oriented,floor,characteristic
        }
        let defaultValue = selectedValue['more']
        console.log('+*+*+*',defaultValue)
        return <FilterMore data={data} type={openType} onSave={this.onSave} defaultValue={defaultValue} onCancel={this.onCancel}/>
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
            else if(item ==='more'&&selectVal.length !==0){
                // null
                newTitleSeleectedStatus[item] = true
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
    onCancel = (type) => {
        console.log('*******',type)
        const {titleSelectedStatus,selectedValue} = this.state
        const newTitleSeleectedStatus = {...titleSelectedStatus}
        const selectVal = selectedValue[type]
        if(type ==='area' && (selectVal.length !==2 || selectVal[0] !=='area')){
            newTitleSeleectedStatus[type] = true
        }
        else if(type==='mode' && selectVal[0] !=='null'){
            newTitleSeleectedStatus[type] = true
        }
        else if(type ==='price' && selectVal[0] !=='null'){
            newTitleSeleectedStatus[type] = true
        }
        else if(type ==='more'&&selectVal.length !==0){
            // null
            newTitleSeleectedStatus[type] = true
        }
        else{
            newTitleSeleectedStatus[type] = false
        }
        this.setState({
            openType:'',
            titleSelectedStatus:newTitleSeleectedStatus
        })
    }

    onSave = (value,type) =>{
        console.log(value,type)
        const {titleSelectedStatus} = this.state
        const newTitleSeleectedStatus = {...titleSelectedStatus}
        const selectVal = value
        if(type ==='area' && (selectVal.length !==2 || selectVal[0] !=='area')){
            newTitleSeleectedStatus[type] = true
        }
        else if(type==='mode' && selectVal[0] !=='null'){
            newTitleSeleectedStatus[type] = true
        }
        else if(type ==='price' && selectVal[0] !=='null'){
            newTitleSeleectedStatus[type] = true
        }
        else if(type ==='more'&&selectVal.length !==0){
            // null
            newTitleSeleectedStatus[type] = true
        }
        else{
            newTitleSeleectedStatus[type] = false
        }
        const newSelectValues = {...this.state.selectedValue,[type]:value}
        // console.log('最新的筛选数据',newSelectValues)
        const {area,mode,price,more} = newSelectValues
        const filters = {}
        let areaKey = area[0]
        let areaValue = 'null'
        if(area.length ===3){
            areaValue = area[2] !=='null'?area[2]:area[1]
        }
        filters[areaKey] = areaValue
        filters.mode = mode[0]
        filters.price = price[0]
        filters.more = more.join(',')
        console.log('filters数据',filters)
        const {onFilter} = this.props
        onFilter(filters)
        this.setState({
            openType:'',
            titleSelectedStatus:newTitleSeleectedStatus,
            selectedValue:newSelectValues
        })
    }
    render(){
        const {titleSelectedStatus,openType} = this.state
        return(
            <div className={styles.root}>
                {/* 前三个菜单的遮罩层，如果点击前三个标签，显示FilterPicker组件以及遮罩层,练习时因为少了一个top:0导致遮罩层无法显示！！！ */}
                {
                    openType === 'area' || openType === 'mode' || openType === 'price' ? (
                    <div className={styles.mask} onClick={()=>this.onCancel(openType)} />
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