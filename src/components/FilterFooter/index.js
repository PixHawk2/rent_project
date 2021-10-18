import React from "react";
import { Flex } from 'antd-mobile'
import PropTypes from 'prop-types'
import styles from './index.module.css'
// 只是显示，所以使用函数组件
function FilterFooter({
    cancelText = '取消',
    okText = '确定',
    onCancel,
    onOk,
    className
}){
    return(
        <Flex className={[styles.root,className || ''].join(' ')}>
            <span className={[styles.btn,styles.cancel].join(' ')}
            onClick={onCancel}
            >
                {cancelText}
            </span>
            <span className={[styles.btn,styles.ok].join(' ')}
            onClick={onOk}
            >
                {okText}
            </span>
        </Flex>
    )
}
// 添加参数校验
FilterFooter.propTypes = {
    cancelText:PropTypes.string,
    okText:PropTypes.string,
    onCancel:PropTypes.func,
    onOk:PropTypes.func,
    className:PropTypes.string
}
export default FilterFooter