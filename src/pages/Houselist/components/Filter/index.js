import React from "react";
import FilterTitle from "../FilterTitle";
import FilterPicker from "../FilterPicker";
import FilterMore from "../FilterMore";
import styles from './index.module.css'

const titleSelectedStatus = {
    area:false,
    mode:false,
    price:false,
    more:false
}
export default class Filter extends React.Component{
    state = {
        titleSelectedStatus
    }
    onTitleClick = type =>{
        this.setState(prevState =>{
            return {
                titleSelectedStatus:{
                    ...prevState.titleSelectedStatus,
                    [type]:true
                }
            }
        })
    }
    render(){
        const {titleSelectedStatus} = this.state
        return(
            <div className={styles.root}>
                {/* 前三个菜单的遮罩层 */}
                <div className={styles.mask} />
                <div className={styles.content}>
                    <FilterTitle titleSelectedStatus={titleSelectedStatus}
                    onClick={this.onTitleClick}
                    />
                    <FilterPicker />
                    {/* <FilterMore /> */}
                </div>
            </div>
        )
    }
}