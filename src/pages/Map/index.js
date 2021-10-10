import React from "react";
import './index.scss'
export default class Map extends React.Component{
    componentDidMount(){
        // react脚手架中访问全局对象需要用window
        const map = new window.BMap.Map('container')
        const centerpoint = new window.BMap.Point(121.404,31.915)
        map.centerAndZoom(centerpoint,15)
        map.enableScrollWheelZoom(true);
    }
    render(){
        return(
            <div className='map'>
                <div id='container'></div>
            </div>
        )
    }
}