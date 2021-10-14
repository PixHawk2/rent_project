import React from "react";
import axios from "axios";
import './index.scss'
import styles from './index.module.css'
import NavHeader from '../../components/NavHeader'
import { position, style } from "dom-helpers";
import {Toast} from 'antd-mobile'
import {Link} from 'react-router-dom'


const BMap = window.BMap
const labelStyle = {
    cursor: 'pointer',
    border: '0px solid rgb(255, 0, 0)',
    padding: '0px',
    whiteSpace: 'nowrap',
    fontSize: '12px',
    color: 'rgb(255, 255, 255)',
    textAlign: 'center'
  }
export default class Map extends React.Component{
    // 设置小区数据的状态，因为要
    state = {
        listShow:false,
        houseinfolist:[]
    }
    componentDidMount(){
        this.init_map();
    }
    init_map(){
        // react脚手架中访问全局对象需要用window
        const {value,label} = JSON.parse(localStorage.getItem('hudi_rent'))
        const map = new BMap.Map('container')
        // 为了在后面的函数封装中调用到该函数
        this.map = map
        var myGeo = new BMap.Geocoder();      
        // 将地址解析结果显示在地图上，并调整地图视野    
        myGeo.getPoint(label, async (point)=>{      
            if (point) {      
                map.centerAndZoom(point, 11);      
                // map.addOverlay(new BMap.Marker(point));
                // 添加平移控件
                map.addControl(new BMap.NavigationControl());
                // 添加比例尺控件
                map.addControl(new BMap.ScaleControl());
                // map.addControl(new BMap. MapTypeControl());
                this.renderOverlays(value)
                

// 1.获取房源数据
// 2.便利数据，创建覆盖物，给每个覆盖物添加唯一标识；
// 3.给覆盖物添加单击事件；
// 4.在单击事件中，获取到当前单击项的唯一标识；
// 5.放大地图【级别为13】，并调用clearOverlays()清除覆盖物
                // const res = await axios.get('http://localhost:8080/area/map',{
                //     params:{
                //         id:value
                //     }
                // })
            }      
        }, 
        label)
// 拖动地图不显示数据
    map.addEventListener('movestart',()=>{
        this.setState({
            listShow:false
        })
    })
        
    }
    // 渲染覆盖物函数
    async renderOverlays(areaid) {
        try {
            Toast.loading('Data Loading',0,null,false)
            const res = await axios.get(`http://localhost:8080/area/map?id=${areaid}`)
            Toast.hide()
            console.log('renderOverlays当前的数据为：',res)
            const data = res.data.body
            const {nextzoom,type} = this.getrTypeAndZoom()
            data.forEach(element => {
            this.createOverlays(element,nextzoom,type)
            });
        } catch (error) {
            Toast.hide()
        }
        
    }
    
    // 创建覆盖物函数
    createOverlays(data,zoom,type){
        //解构数据,value是区域的唯一标识
        const {coord:{latitude,longitude},label:areaname,value,count} = data
        const areaPoint = new BMap.Point(longitude,latitude)
        switch(type){
            case 'rect':
                // console.log('1111111')
                this.createRect(areaPoint,areaname,count,value);
                break
            case 'circle':
                // console.log('2222222')
                this.createCircle(areaPoint,areaname,count,value,zoom);
                break
        }
    }

    // 获取覆盖物类型以及下一级地图的缩放等级
    getrTypeAndZoom(){
        const current = this.map.getZoom()
        let nextzoom,type
        if(current >=10 && current <12){
            nextzoom = 13;
            type = 'circle';
        }else if(current >=12 && current <14){
            nextzoom = 15;
            type = 'circle';
        }else if(current >=14 && current <16){
            type = 'rect';
        }
        return{
            nextzoom,
            type
        }
    }

    // 创建圆形覆盖物
    createCircle(point,name,count,id,zoom){
        var opts = {
            position: point, // 指定文本标注所在的地理位置
            offset: new BMap.Size(-35, -35) // 设置文本偏移量
        };
                // 创建文本标注对象
            var label = new BMap.Label('', opts);
            label.setContent(`<div class=${styles.bubble}>
            <p class=${styles.name}>${name}</p>
            <p>${count}套</p>
            </div>`)
            // 设置样式
            label.setStyle(labelStyle)
            label.id = id
              // 添加单击事件
            label.addEventListener('click',()=>{
                // 被点击需要重新获取数据
                console.log('区域被点击',label.id)
                this.renderOverlays(id);
                this.map.centerAndZoom(point, zoom);
                setTimeout(()=>{this.map.clearOverlays()},0)  
            })
            // 自定义文本标注样式,千万不可以放到上面的点击事件函数中啊
            this.map.addOverlay(label);
    }
    // 创建方形覆盖物
    createRect(point,name,count,id){
        var opts = {
            position: point, // 指定文本标注所在的地理位置
            offset: new BMap.Size(-50, -28) // 设置文本偏移量
        };
                // 创建文本标注对象
            var label = new BMap.Label('', opts);
            label.setContent(`<div class="${styles.rect}">
            <span class="${styles.housename}">${name}</span>
            <span class="${styles.housenum}">${count}套</span>
            <i class="${styles.arrow}"></i>
            </div>`)
            // 设置样式
            label.setStyle(labelStyle)
            label.id = id
              // 添加单击事件
            label.addEventListener('click',(e)=>{
                // 被点击需要重新获取数据
                this.getHouseInfo(id)
                const target = e.changedTouches[0]
                console.log(target)
                // 当前小区移动到可视区域的中央计算方法
                const y = (window.innerHeight - 330)/2 - target.clientY
                const x = window.innerWidth/2 - target.clientX
                this.map.panBy(x,y)
               
            })
            // 自定义文本标注样式,千万不可以放到上面的点击事件函数中啊
            this.map.addOverlay(label);
    }
    // 获取小区房源信息
    async getHouseInfo(areaid){
        try {
            Toast.loading('数据加载中',0,null,true)
            const res = await axios.get(`http://localhost:8080/houses?cityId=${areaid}`)
            const housedata = res.data.body.list
            this.setState({
                houseinfolist:housedata,
                listShow:true
            })
            console.log('获取到的数据：',housedata)
            Toast.hide()
        } catch (error) {
            Toast.hide()
        }
    }
    renderhouseinfo(){
        return (
            <div className={styles.houseItems}>
                        {/* 遍历获取到的房源数据进行渲染 */}
                        {this.state.houseinfolist.map(item => (
                            <div className={styles.house} key={item.houseCode}>
                                {/* 左侧图片渲染start */}
                                <div className={styles.imgWrap}>
                                    <img className={styles.img} src={`http://localhost:8080${item.houseImg}`} alt=''/>
                                </div>
                                {/* 左侧图片渲染 end*/}
                                {/* 右侧具体数据渲染 start*/}
                                <div className={styles.content}>
                                    <h3 className={styles.title}>{item.title}</h3>
                                    <div className={styles.desc}>{item.desc}</div>
                                    {/* tag渲染 */}
                                    <div>
                                        {item.tags.map((element,index)=>{
                                            // 标签样式修改
                                            const tagclass = 'tag'+(index+1)
                                            return (<span className={[styles.tag,styles.[tagclass]].join(' ')} key={element}>{element}</span>)
                                        }
                                        )}
                                    </div>
                                     {/* price渲染 */}
                                    <div className={styles.price}>
                                        <span className={styles.priceNum}>{item.price}</span>元/月
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
        )
    }
    // {[styles.houseList,this.setState.listShow?styles.show:''].join(' ')}可以根据this.state.listShow决定数据是否展示
    render(){
        return(
            <div className='map'>
                <NavHeader className='NavHeader' >地图找房</NavHeader>
                <div id='container'></div>
                <div className={[styles.houseList,this.state.listShow ? styles.show :''].join(' ')}>
                   {/* 标题实现 */}
                   <div className={styles.titleWrap}>
                        <h1 className={styles.listTitle}>房屋列表</h1>
                        <Link className={styles.titleMore} to='/home/list'>更多房源</Link>
                   </div>
                   {/* 标题结束 */}
                {/* 房源数据渲染 */}
                    {this.renderhouseinfo()}
                {/* 房源数据结束 */}
                </div>
            </div>
            

        )
    }
}