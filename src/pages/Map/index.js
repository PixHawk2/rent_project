import React from "react";
import axios from "axios";
import './index.scss'
import styles from './index.module.css'
import NavHeader from '../../components/NavHeader'
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
    componentDidMount(){
        this.init_map();
    }
    init_map(){
        // react脚手架中访问全局对象需要用window
        const {value,label} = JSON.parse(localStorage.getItem('hudi_rent'))
        const map = new window.BMap.Map('container')
        var myGeo = new BMap.Geocoder();      
        // 将地址解析结果显示在地图上，并调整地图视野    
        myGeo.getPoint(label, async function(point){      
            if (point) {      
                map.centerAndZoom(point, 11);      
                // map.addOverlay(new BMap.Marker(point));
                // 添加平移控件
                map.addControl(new BMap.NavigationControl());
                // 添加比例尺控件
                map.addControl(new BMap.ScaleControl());
                // map.addControl(new BMap. MapTypeControl());

// 1.获取房源数据
// 2.便利数据，创建覆盖物，给每个覆盖物添加唯一标识；
// 3.给覆盖物添加单击事件；
// 4.在单击事件中，获取到当前单击项的唯一标识；
// 5.放大地图【级别为13】，并调用clearOverlays()清除覆盖物
                const res = await axios.get('http://localhost:8080/area/map',{
                    params:{
                        id:value
                    }
                })
                console.log(res)
                res.data.body.forEach(element => {
                    const {coord:{latitude,longitude},label:areaname,value,count} = element
                    const areaPoint = new BMap.Point(longitude,latitude)
                    var opts = {
                        position: areaPoint, // 指定文本标注所在的地理位置
                        offset: new BMap.Size(-35, -35) // 设置文本偏移量
                    };
                    // 创建文本标注对象
                    var label = new BMap.Label('', opts);
                    label.setContent(`<div class=${styles.bubble}>
                    <p class=${styles.name}>${areaname}</p>
                    <p>${count}套</p>
                    </div>`)
                    // 设置样式
                    label.setStyle(labelStyle)
                    label.id = value
                  // 添加单击事件
                    label.addEventListener('click',()=>{
                        console.log('区域被点击',label.id)
                        map.centerAndZoom(areaPoint, 13);
                        setTimeout(()=>{map.clearOverlays()},0)
                    })
                    // 自定义文本标注样式
                    map.addOverlay(label);
                });
                
            }      
        }, 
        label);
        // const centerpoint = new window.BMap.Point(121.404,30.915)
        // map.centerAndZoom(centerpoint,15)
    }
    render(){
        return(
            <div className='map'>
                <NavHeader className='NavHeader' >地图找房</NavHeader>
                <div id='container'></div>
            </div>
        )
    }
}