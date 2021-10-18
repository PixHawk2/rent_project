import React from "react";
import { Flex } from "antd-mobile";
import styles from './index.module.css'

const titleList = [
    {title:'区域',type:'area'},
    {title:'方式',type:'mode'},
    {title:'租金',type:'price'},
    {title:'筛选',type:'more'}
]

// 因为只是涉及到显示，不需要自身维护状态，所以该组件使用函数组件
// 即无状态组件
// 通过父组件传递的props   高亮状态对象titleSelectStatus
// 遍历titleList数组，渲染标题列表
// 判断高亮对象的当前标题是否高亮，如果是，添加高亮的类
// 给当前标题都添加绑定事件，事件同样使用父组件传递的参数
// 将当前标题type，通过onClick的参数传递给父组件
// 父组件中接收到当前type,修改该标题的选中状态为true
export default function FilterTitle({titleSelectedStatus,onClick}){
    return (
        <Flex align='center' className={styles.root}>
            {titleList.map(item=>{
                const isSelected = titleSelectedStatus[item.type]
                return (
                    <Flex.Item key={item.type} onClick={()=>{onClick(item.type)}}>
                        <span className={[styles.dropdown,isSelected ? styles.selected :''].join(' ')}> 
                            <span>{item.title}</span>
                            <i className='iconfont icon-arrow'/>
                        </span>
                    </Flex.Item>
                )
            })}

        </Flex>
    )
}