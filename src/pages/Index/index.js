import React from "react";
import { Carousel, Flex } from 'antd-mobile';
import axios from "axios";

navdata = [
    {
        id:1,
        src='',
        path='',
        title='整租'
    },
    {
        id:2,
        src='',
        path='',
        title='合租'
    },
    {
        id:3,
        src='',
        path='',
        title='地图找房'
    },
    {
        id:4,
        src='',
        path='',
        title='资讯'
    }
]



export default class Index extends React.Component{
    state = {
        swipdata: []
        // imgHeight: 176,
    }
    async getswipdata(){
        const res = await axios.get('http://localhost:8080/home/swiper');
        console.log(res.data.body);
        this.setState({
            swipdata: res.data.body
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

    }
    render() {
        return (
            <div className='index'>
            <Carousel
                autoplay={true}
                infinite
                autoplayInterval={2000}
            //   beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)} //面板切换前的回调
            //   afterChange={index => console.log('slide to', index)} //面板切换后的回调
            >
            {this.renderswip()}
            </Carousel>
            <Flex className='nav'>
                <Flex.Item>
                    <img src=''/>
                    <h2>整租</h2>
                </Flex.Item>
            </Flex>
            </div>
            );
    }
}