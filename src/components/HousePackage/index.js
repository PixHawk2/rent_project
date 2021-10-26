import React from "react"
import HouseItem from "../HouseItem"
import styles from './index.module.css'

// 常量使用大写字母来命名,该常量用来表示房屋配置信息中的名称以及图标信息
const HOUSE_PACKAGE =[
    {
        id:1,
        name:'衣柜',
        icon:'icon-wardrobe'
    },
    {
        id: 2,
        name: '洗衣机',
        icon: 'icon-wash'
    },
    {
        id: 3,
        name: '空调',
        icon: 'icon-air'
    },
    {
        id: 4,
        name: '天然气',
        icon: 'icon-gas'
    },
    {
        id: 5,
        name: '冰箱',
        icon: 'icon-ref'
    },
    {
        id: 6,
        name: '暖气',
        icon: 'icon-Heat'
    },
    {
        id: 7,
        name: '电视',
        icon: 'icon-vid'
    },
    {
        id: 8,
        name: '热水器',
        icon: 'icon-heater'
    },
    {
        id: 9,
        name: '宽带',
        icon: 'icon-broadband'
    },
    {
        id: 10,
        name: '沙发',
        icon: 'icon-sofa'
    }
]


export default class HousePackage extends React.Component{
    state = {
        selectedNames:[]
    }
    // 根据id切换状态
    toggleSelect = name => {
        const {selectedNames} = this.state
        let newSelectedName
        // 判断该项是否被选中,，如果选中，就从数组中先筛选出来,filter返回的是一个新的列表
        if (selectedNames.indexOf(name) >-1){
            newSelectedName = selectedNames.filter(item=>item !==name)
        }else{
            // 未选中，添加到数组中
            newSelectedName = [...selectedNames,name]
        }
        // 调用父组件传递过来的回调函数将选中值传给父组件
        this.props.onSelect(newSelectedName)
        this.setState({
            selectedNames:newSelectedName
        })
    }
    // 具体的渲染函数
    renderItems(){
        const {selectedNames} = this.state
        const {select,list} = this.props
        // select为true表示选择房屋配置，false表示仅仅展示房屋列表
        // list表示要展示的列表项
        let data
        if(select){
            data = HOUSE_PACKAGE
        }else{
            // 展示房屋配置列表
            // 从所有的列表项中过滤出要展示的list列表
            data = HOUSE_PACKAGE.filter(item => list.includes(item.name))
        }
        return data.map(item =>{
            const isSelected = selectedNames.indexOf(item.name)>-1
            return (
                <li key={item.id}
                    className={[styles.item,isSelected?styles.active:''].join(' ')}
                    onClick={select &&(()=>{this.toggleSelect(item.name)})}
                >
                    <p>
                      <i className={`iconfont ${item.icon} ${styles.icon}`}/>  
                    </p>
                </li>
            )
        })
    }
    render(){
        return (
            <ul className={styles.root}>{this.renderItems()}</ul>
        )
    }
}