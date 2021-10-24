import { style } from "dom-helpers"
import React from "react"
import FilterFooter from "../../../../components/FilterFooter"
import { Spring,animated } from "react-spring"
import styles from './index.module.css'


/*
（1）在state中添加状态selectedValues（表示选中项的值）
（2）给标签绑定单击事件，通过参数获取到当前项的value
（3）判断selectedValues中是否包含当前项的value值
（4）如果不包含，就将当前项的value添加到selectedValues数组中
（5）如果包含，就从selectedValues数组中移除（使用数组的splice方法，根据索引号删除）
（6）在渲染标签时，判断selectedValues数组中是否包含当前value，如果包含，就添加高亮；
*/
export default class FilterMore extends React.Component{
    state = {
        selectValues:this.props.defaultValue
    }
    // 标签选中高亮逻辑
    onTagSelect(value){
        const {selectValues} = this.state
        const newSelectValues = [...selectValues]
        if(newSelectValues.indexOf(value)<=-1){
            newSelectValues.push(value)
        }else{
            const index = newSelectValues.findIndex(item => item === value)
            newSelectValues.splice(index,1)
        }
        // 一定要细心，此处调试时一直出错是因为大小写错误
        this.setState({
            selectValues:newSelectValues
        })
    }
    // 清除按钮逻辑
    onClear = () =>{
        this.setState({
            selectValues:[]
        })
    }
    // 确定按钮逻辑
    onConfirm = () =>{
        const {type,onSave} = this.props
        onSave(this.state.selectValues,type)
    }

    renderFilters(data){
        const {selectValues} = this.state
        return data.map(item=>{
            const isSelceted = selectValues.indexOf(item.value) > -1
            return (
                <span 
				key={item.value} 
                className={[styles.tag,isSelceted ? styles.tagActive : ''].join(' ')}
                onClick={()=>{this.onTagSelect(item.value)}}
				>
				{item.label}
				</span>
            )
        })
        
    }
    
    
    render(){
        const {data:{roomType,oriented,floor,characteristic},onCancel,type} = this.props
        const isShow = type === 'more'
        // console.log('-/-/-/-/-/-',type)
        return(
            <div className={styles.root}>
                {/* 依然遮罩层 */}
                <Spring from={{opacity:0}} to={{opacity:isShow?1:0}}>
                    {props =>{
                        if(!isShow){
                            return null
                        }
                        return (
                            <animated.div style={props} className={styles.mask} onClick={() => onCancel(type)}/>
                        )
                    }}
                </Spring>
                <Spring  from={{opacity:0}} to={{opacity:isShow?1:0}}>
                    { props =>{
                        return (
                            <animated.div>
                                <div className={styles.tags}>
                                    <dl className={styles.dl}>
                                        <dt className={styles.dt}>户型</dt>
                                        <dd className={styles.dd}>{this.renderFilters(roomType)}</dd>

                                        <dt className={styles.dt}>朝向</dt>
                                        <dd className={styles.dd}>{this.renderFilters(oriented)}</dd>

                                        <dt className={styles.dt}>楼层</dt>
                                        <dd className={styles.dd}>{this.renderFilters(floor)}</dd>

                                        <dt className={styles.dt}>房屋亮点</dt>
                                        <dd className={styles.dd}>{this.renderFilters(characteristic)}</dd>

                                    </dl>
                                 </div>
                                {/* 底部按钮样式，并传入样式类,练习时底部按钮不显示是因为代码错误，需要调整bottom的值 */}
                                <FilterFooter className={styles.footer} cancelText='清除' onCancel={this.onClear} onOk={this.onConfirm}/>
                            </animated.div>
                        )
                    }}
                </Spring>
                
            </div>
        )
    }
}