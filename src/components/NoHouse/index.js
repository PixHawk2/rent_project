import React from "react"
import PropTypes, { resetWarningCache } from 'prop-types'
import { BASE_URL } from "../../utils/url"
import styles from './index.module.css'

const NoHouse = ({children})=>{
    return (
        <div className={styles.root}>
        <img className={styles.img}
            src={BASE_URL + '/img/not-found.png' }
            alt="No Data"
        />
        <p className={styles.msg}>{children}</p>
        </div>
    )
}
   
// 增加组件数据校验
NoHouse.propTypes ={
    children:PropTypes.node.isRequired
    // 此处原先为string，后面修改为node，即可以为任意可以渲染的内容
}

export default NoHouse