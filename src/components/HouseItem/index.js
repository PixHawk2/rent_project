import React from "react";
import PropTypes from 'prop-types'
import styles from './index.module.css'

// 封装房屋列表数据
function HouseItem({src,title,desc,tags,price,onClick,style}){
    return (
        <div className={styles.house} onClick={onClick} style={style}>
        {/* 左侧图片渲染start */}
        <div className={styles.imgWrap}>
            <img className={styles.img} src={src} alt=''/>
        </div>
        {/* 左侧图片渲染 end*/}
        {/* 右侧具体数据渲染 start*/}
        <div className={styles.content}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.desc}>{desc}</div>
            {/* tag渲染 */}
            <div>
                {tags.map((element,index)=>{
                    // 标签样式修改
                    const tagclass = 'tag'+(index+1)
                    return (<span className={[styles.tag,styles[tagclass]].join(' ')} key={element}>{element}</span>)
                }
                )}
            </div>
             {/* price渲染 */}
            <div className={styles.price}>
                <span className={styles.priceNum}>{price}</span>元/月
            </div>
        </div>
    </div>
    )
}
HouseItem.propTypes ={
    src:PropTypes.string,
    title:PropTypes.string,
    desc:PropTypes.string,
    tags:PropTypes.array.isRequired,
    price:PropTypes.number,
    onClick:PropTypes.func,
}
export default HouseItem