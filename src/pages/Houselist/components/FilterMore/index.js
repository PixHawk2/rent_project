import { style } from "dom-helpers";
import React from "react";
import FilterFooter from "../../../../components/FilterFooter";
import styles from './index.module.css'

export default class FilterMore extends React.Component{
    renderFilters(){
        return (
            <span className={[styles.tag,styles.tagActive].join(' ')}>东北</span>
        )
    }
    render(){
        return(
            <div className={styles.root}>
                {/* 依然遮罩层 */}
                <div className={styles.mask} />
                <div className={styles.tags}>
                    <dl className={styles.dl}>
                        <dt className={styles.dt}>户型</dt>
                        <dd className={styles.dd}>{this.renderFilters()}</dd>

                        <dt className={styles.dt}>朝向</dt>
                        <dd className={styles.dd}>{this.renderFilters()}</dd>

                        <dt className={styles.dt}>楼层</dt>
                        <dd className={styles.dd}>{this.renderFilters()}</dd>children

                        <dt className={styles.dt}>房屋点亮</dt>
                        <dd className={styles.dd}>{this.renderFilters()}</dd>

                    </dl>
                </div>

                {/* 底部按钮样式，并传入样式类 */}
                <FilterFooter className={styles.footer} />
            </div>
        )
    }
}