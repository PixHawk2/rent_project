import { style } from "dom-helpers";
import React from "react";
import FilterFooter from "../../../../components/FilterFooter";
import styles from './index.module.css'

export default class FilterMore extends React.Component{
    renderFilters(data){
        return data.map(item=>{
            return (
                <span key={item.value} className={[styles.tag].join(' ')}>{item.label}</span>
            )
        })
        
    }
    render(){
        const {data:{roomType,oriented,floor,characteristic}} = this.props
        return(
            <div className={styles.root}>
                {/* 依然遮罩层 */}
                <div className={styles.mask} />
                <div className={styles.tags}>
                    <dl className={styles.dl}>
                        <dt className={styles.dt}>户型</dt>
                        <dd className={styles.dd}>{this.renderFilters(roomType)}</dd>

                        <dt className={styles.dt}>朝向</dt>
                        <dd className={styles.dd}>{this.renderFilters(oriented)}</dd>

                        <dt className={styles.dt}>楼层</dt>
                        <dd className={styles.dd}>{this.renderFilters(floor)}</dd>

                        <dt className={styles.dt}>房屋点亮</dt>
                        <dd className={styles.dd}>{this.renderFilters(characteristic)}</dd>

                    </dl>
                    
                </div>
                {/* 底部按钮样式，并传入样式类 */}
                <FilterFooter className={styles.footer} />
            </div>
        )
    }
}