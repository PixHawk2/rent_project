import React from "react";
import SearchHeader from "../../components/SearchHeader";
import {Flex} from 'antd-mobile'
import Filter from "./components/Filter";
import styles from './index.module.css'
const {label} = JSON.parse(localStorage.getItem('hudi_rent'))
export default class Houselist extends React.Component{
    
    render(){
        return(
            <div>
                <Flex className={styles.header}>
                    <i className='iconfont icon-back ' onClick={()=>{this.props.history.go(-1)}}/>
                    <SearchHeader cityName={label} className={styles.searchHeader}/>
                </Flex>
                <Filter />
            </div>
        )
    }
}