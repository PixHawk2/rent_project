import React from "react";
import { Carousel, Flex } from 'antd-mobile';
import axios from "axios";
//导入导航栏图片
import NAV1 from '../../assets/images/nav-1.png'
import NAV2 from '../../assets/images/nav-2.png'
import NAV3 from '../../assets/images/nav-3.png'
import NAV4 from '../../assets/images/nav-4.png'
import './index.css'
const navdata = [
    {
        id:1,
        img: NAV1 ,
        path:'/home/houselist',
        title:'整租'
    },
    {
        id:2,
        img: NAV2,
        path:'/home/houselist',
        title:'合租'
    },
    {
        id:3,
        img: NAV3,
        path:'/home/citylist',
        title:'地图找房'
    },
    {
        id:4,
        img: NAV4,
        path:'/home/news',
        title:'资讯'
    }
]

export default class Index extends React.Component{
    state = {
        swipdata: [],
        swipdataloaded:false
        // imgHeight: 176,
    }
    async getswipdata(){
        const res = await axios.get('http://localhost:8080/home/swiper');
        // console.log(res.data.body);
        this.setState({
            swipdata: res.data.body,
            swipdataloaded:true
        })   
    }
    componentDidMount() {
    // simulate img loading
        this.getswipdata();
    }
    renderswip(){
        return this.state.swipdata.map(val => (
            <a
                key={val.id}
                href="http://www.baidu.com"
                style={{ display: 'inline-block', width: '100%', height: 212 }}
            >
                <img
                src={`http://localhost:8080${val.imgSrc}`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                // onLoad={() => {
                //     // fire window resize event to change height
                //     window.dispatchEvent(new Event('resize'));
                //     this.setState({ imgHeight: 'auto' });
                // }}
                />
            </a>
            ))
    }
    rendernav(){
        
        return navdata.map(item=>
            <Flex.Item key={item.id} onClick={()=>this.props.history.push(item.path)}>
                {/* Flex组件使用时必须添加key属性，否则不会显示 */}
                    <img src={item.img} alt=''/>
                    <h2>{item.title}</h2>
            </Flex.Item>
        )
    }
    render() {
        return (
            <div className='index'>
            {this.state.swipdataloaded?
            <Carousel
                autoplay={true}
                infinite
                autoplayInterval={2000}
            //   beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)} //面板切换前的回调
            //   afterChange={index => console.log('slide to', index)} //面板切换后的回调
            >
                {this.renderswip()}
            </Carousel>:''}
            <Flex className='nav'>
                {this.rendernav()}
            </Flex>
            </div>
            );
    }
}