import React from "react"
import { Carousel,Flex } from "antd-mobile" 

import NavHeader from "../../components/NavHeader"
import HouseItem from "../../components/HouseItem"
import HousePackage from "../../components/HousePackage"

import { BASE_URL } from "../../utils/url"

import styles from './index.module.css'
import { getByDisplayValue } from "@testing-library/dom"
import { style } from "dom-helpers"
import { API } from "../../utils/api"
import { Item } from "antd-mobile/lib/tab-bar"

// 猜你喜欢部分的数据
const recommendHouses = [
    {
        id:1,
        src:BASE_URL + '/img/message/1.png',
        desc:'72.32㎡/南 北/低楼层',
        title: '胡迪园 2室1厅',
        price:4500,
        tags:['随时看房']
    },
    {
        id: 2,
        src: BASE_URL + '/img/message/2.png',
        desc: '83㎡/南/高楼层',
        title: '天居园 2室1厅',
        price: 7200,
        tags: ['近地铁']
    },
    {
        id: 3,
        src: BASE_URL + '/img/message/3.png',
        desc: '52㎡/西南/低楼层',
        title: '角门甲4号院 1室1厅',
        price: 4300,
        tags: ['集中供暖']
    }
]

// 涉及到地图渲染相关
const BMap = window.BMap
const labelStyle = {
    position: 'absolute',
    zIndex: -7982820,
    backgroundColor: 'rgb(238, 93, 91)',
    color: 'rgb(255, 255, 255)',
    height: 25,
    padding: '5px 10px',
    lineHeight: '14px',
    borderRadius: 3,
    boxShadow: 'rgb(204, 204, 204) 2px 2px 2px',
    whiteSpace: 'nowrap',
    fontSize: 12,
    userSelect: 'none'
}
export default class HouseDetail extends React.Component{
    state = {
        // 解决轮播图故障
        isLoading:false,
        houseInfo:{
            houseImg: [],
            // 标题
            title: '',
            // 标签
            tags: [],
            // 租金
            price: 0,
            // 房型
            roomType: '两室一厅',
            // 房屋面积
            size: 89,
            // 装修类型
            renovation: '精装',
            // 朝向
            oriented: [], 
            // 楼层
            floor: '',
            // 小区名称
            community: '',
            // 地理位置
            coord: {
              latitude: '39.928033',
              longitude: '116.529466'
            },
            // 房屋配套
            supporting: [],
            // 房屋标识
            houseCode: '',
            // 房屋描述
            description: ''
        }
    }
    componentDidMount(){
        // 通过this.props.match.params获取到路由参数
        // console.log('获取的路由参数：',this.props.match.params)
        this.getHouseDetail()
        
    }
    // 渲染轮播图
    renderSwipers(){
        const {houseInfo:{houseImg}} = this.state
        // console.log('++++++',houseImg)
        return houseImg.map(item=>(
            <a 
                key={item}
                href = "http://itcast.cn"  
            >
                <img 
                    src={BASE_URL+item} 
                    alt = ''
                />
            </a>
        ))
    }
    
    // 渲染地图
    renderMap(community,coord){
        // 地图显示的初始化，详情可以参考百度地图API
        const {latitude,longitude} = coord
        const map = new BMap.Map('map')
        const point = new BMap.Point(longitude,latitude)
        map.centerAndZoom(point,17)

        // 显示标签
        const label = new BMap.Label('',{
            position:point,
            offset:new BMap.Size(0,-36)//相对于点的位移
        })
        
        label.setStyle(labelStyle)
        // 设置标签自定义内容
        label.setContent(`   
            <span>${community}</span>
            <div class="${styles.mapArrow}"></div>
         `)
        map.addOverlay(label)
    }
    // 获取具体的房屋数据
    async getHouseDetail(){
        
        const {id } = this.props.match.params
        this.setState({
            isLoading:true
        })
        // console.log(id)
        const res = await API.get(`/houses/${id}`)
        const {community,coord} = res.data.body
        // console.log(res)
        this.setState({
            houseInfo:res.data.body,
            isLoading:false
        })
        this.renderMap(community,coord)
    }
    // 标签渲染
    renderTags(){
        const {tags} = this.state.houseInfo
        return tags.map((item,index)=>{
            let tagClass =''
            if(index >2){
                tagClass = 'tag3'
            }else{
                tagClass = 'tag'+(index+1)
            }

            return (
                <span className={[styles.tag,styles[tagClass]].join(' ')} key={item}>
                    {item}
                </span>
            )
        })
    }
    // 实际的页面渲染
    render(){
        const {isLoading,houseInfo:{community,title,tags,price,roomType,size,floor,oriented,description,supporting}} = this.state
        return (
            <div className={styles.root}>
                {/* 导航栏 */}
                <NavHeader
                    className={styles.navHeader}
                    rightContent={[<i key="share" className="iconfont icon-share"/>]}
                >{community}
                </NavHeader>
                {/* 轮播图 */}
                <div className={styles.slides}>
                    {
                        !isLoading ? (
                            <Carousel autoplay infinite autoplayInterval={3000}>{this.renderSwipers()}</Carousel>
                        ) :(
                            ''
                        )
                    }
                </div>

                {/* 房屋基础信息 */}
                <div className={styles.info}>
                    <h3 className={styles.infoTitle}>{title}</h3>
                    <Flex className={styles.tags}>
                        <Flex.Item>
                            {
                                this.renderTags()
                            }
                        </Flex.Item>
                    </Flex>
                    <Flex className={styles.infoPrice}>
                        <Flex.Item className={styles.infoPriceItem}>
                            <div>
                                {price}元
                                <span className={styles.month}>/月</span>
                            </div>
                            <div>租金</div>
                        </Flex.Item>
                        <Flex.Item className={styles.infoPriceItem}>
                            <div>{roomType}</div>
                            <div>房型</div>
                        </Flex.Item>
                        <Flex.Item className={styles.infoPriceItem}>
                            <div>{size}平米</div>
                            <div>面积</div>
                        </Flex.Item>
                    </Flex>

                    <Flex className={styles.infoBasic} align='start'>
                        <Flex.Item>
                            <div >
                                <span className={styles.title}>装修：</span>精装
                            </div>
                            <div className={styles.title}>
                                <span className={styles.title}>楼层：</span>{floor}
                            </div>
                        </Flex.Item>
                        <Flex.Item>
                            <div >
                                <span className={styles.title}>朝向：</span>{oriented.join('、')}
                            </div>
                            <div className={styles.title}>
                                <span className={styles.title}>类型：</span>普通住宅
                            </div>
                        </Flex.Item>
                    </Flex>
                </div>

                {/* 地图相关的渲染 */}
                <div className={styles.map}>
                    <div className={styles.mapTitle}>
                        小区：
                        <span>{community}</span>
                    </div>
                    {/* 地图容器 */}
                    <div className={styles.mapContainer} id="map">地图</div>
                </div>
                {/* 房屋配套 */}
                <div className={styles.about}>
                    <div className={styles.houseTitle}>房屋配套</div>
                    {
                        supporting.length === 0
                        ?<div className={styles.titleEmpty}>暂无数据</div>
                        :<HousePackage list={supporting} />
                    }
                </div>

                {/* 房屋概况 */}
                <div className={styles.set}>
                    <div className={styles.houseTitle}>房源概况</div>
                    <div>
                        <div className={styles.contact}>
                            <div className={styles.user}>
                                <img src={BASE_URL + '/img/avatar.png'} alt='头像' />
                                <div className={styles.useInfo}>
                                    <div>胡迪小朋友</div>
                                    <div className={styles.userAuth}>
                                        <i className="iconfont icon-auth"/>已认证房主
                                    </div>
                                </div>
                            </div>
                            <span className={styles.userMsg}>发消息</span>
                        </div>
                        <div className={styles.descText}>
                            {description ||'暂无房源描述'}
                        </div>
                    </div>
                </div>
                {/* 推荐 */}
                <div className={styles.recommend}>
                    <div className={styles.houseTitle}>
                        猜你喜欢
                    </div>
                    <div className={styles.items}>
                        {
                            recommendHouses.map(item=>(
                                <HouseItem {...item} key={item.id}/>
                            ))
                        }
                    </div>
                </div>
                {/* 底部收藏 */}
                <Flex className={styles.fixedBottom}>
                    <Flex.Item>
                        <img src={BASE_URL+'/img/unstar.png'}
                            className={styles.favoriteImg}
                            alt='收藏'
                        />
                        <span className={styles.favorite}>收藏</span>
                    </Flex.Item>
                    <Flex.Item>
                        在线咨询
                    </Flex.Item>
                    <Flex.Item>
                        <a href="tel:400-618-4000" className={styles.telephone}>电话预约</a>
                    </Flex.Item>
                </Flex>
            </div>
        )
    }
}
