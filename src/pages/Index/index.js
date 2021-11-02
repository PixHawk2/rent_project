import React from "react";
import { Carousel, Flex,Grid,WingBlank } from 'antd-mobile';
import axios from "axios";
//导入导航栏图片
import NAV1 from '../../assets/images/nav-1.png'
import NAV2 from '../../assets/images/nav-2.png'
import NAV3 from '../../assets/images/nav-3.png'
import NAV4 from '../../assets/images/nav-4.png'
import './index.css'
import {getCurrentLocation} from '../../utils'
import { BASE_URL } from "../../utils/url"
import SearchHeader from "../../components/SearchHeader";
// 导航菜单切换到指定路由后，对应图标没有高亮的原因：
// 之前代码仅考虑吧home首次加载以及点击，对于home组件没有加载而导致的界面切换没有做处理
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
        path:'/map',
        title:'地图找房'
    },
    {
        id:4,
        img: NAV4,
        path:'/rent/add',
        title:'去出租'
    }
]
// 使用H5的定位接口
// navigator.geolocation.getCurrentPosition(position=>{
//     console.log('location information:',position)
// })



export default class Index extends React.Component{
    state = {
        swipdata: [],
        swipdataloaded:false,
        groupdata:[],
        news:[],
        localcity:''
        // imgHeight: 176,
    }
    // 获取轮播图数据
    async getswipdata(){
        const res = await axios.get('http://localhost:8080/home/swiper');
        // console.log(res.data.body);
        this.setState({
            swipdata: res.data.body,
            swipdataloaded:true
        })   
    }
    //获取租房小组数据 
    async getGroupdata(){
        const {value} = JSON.parse(localStorage.getItem('hudi_rent'))
        // console.log('wwwww',value,'111',value.split('|'),'@@@@',(value.split('|')).join('%'))
        const res = await axios.get('http://localhost:8080/home/groups',{
            params:{
                // area:'AREA%7C88cff55c-aaa4-e2e0'
                area:(value.split('|')).join('%')
            }
        })
        // console.log('获取的租房信息',res.data.body)
        this.setState({
            groupdata:res.data.body
        })
    }
    //获取资讯信息
    async getNewsdata(){
        const res = await axios.get('http://localhost:8080/home/news',{
            params:{
                area:'AREA%7C88cff55c-aaa4-e2e0'
            }
        });
        // console.log(res.data.body)
        this.setState({
            news:res.data.body
        })

    }
    // 原先参考百度地图文档获取当前定位信息的方式
    // getCurrentCity(){
    //     const myCity = new window.BMap.LocalCity();
    //     myCity.get(async res=>{
    //         // console.log('local city infor',res)
    //         const result = await axios.get(`http://localhost:8080/area/info?name=${res.name}`)
    //         // console.log('+++++',result)
    //         this.setState({
    //             localcity:result.data.body.label
    //         })
    //     })
    // }
    async componentDidMount() {
        this.getswipdata();
        this.getGroupdata();
        this.getNewsdata();
        // this.getCurrentCity();将获取当前定位的函数封装   在utils目录下
        const localCity = await getCurrentLocation();
        this.setState({
            localcity:localCity.label
        })
    }
    renderswip(){
        return this.state.swipdata.map(val => (
            <a
                key={val.id}
                href="http://www.baidu.com"
                style={{ display: 'inline-block', width: '100%', height: 212 }}
            >
                <img
                src={BASE_URL+val.imgSrc}
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
    
    // 渲染资讯
    rendernews(){
        return this.state.news.map(item =>(
            <div className='news-item' key={item.id}>
                <div className='news-img'>
                    <img 
                    className='img' 
                    src={`http://localhost:8080${item.imgSrc}`}
                    alt='' />
                </div>
                <Flex className='content' direction='column' justify='between'>
                    <h3 className='title'>{item.title}</h3>
                    <Flex className='info' justify='between'>
                        <span>{item.from}</span>
                        <span>{item.date}</span>
                    </Flex>
                </Flex>
            </div>
        ))
    }
    // 页面渲染部分
    render() {
        return (
            <div className='index'>
                <div className='swipper'>
                    {/* 给轮播图提供一个固定高度的盒子 */}
                {
                    this.state.swipdataloaded?
                    <Carousel
                        autoplay={true}
                        infinite
                        autoplayInterval={2000}
                    >
                        {this.renderswip()}
                    </Carousel>:''}   
        {/* 顶部搜索框实现 */}
            {/* <Flex className='search-box'>
                <Flex className='search'>
                    <div className='location' onClick={()=>{this.props.history.push('/citylist')}}>
                        <span className='name'>{this.state.localcity}</span>
                        <i className='iconfont icon-arrow' />
                    </div>
                    <div className="form" onClick={()=>{this.props.history.push('/search')}}>
                        <i className="iconfont icon-seach" />
                        <span className="text">请输入小区或地址</span>
                    </div>
                </Flex>
            {/* 右侧地图图标 */}
                 {/* <i className='iconfont icon-map'
                    onClick={()=>{this.props.history.push('/map')}}
            />
            </Flex>   */}
            {/* 通过组件封装代替,但是实际的步骤仍然是先实现功能再考虑封装 */}
            <SearchHeader cityName={this.state.localcity}></SearchHeader>
            </div>
                {/* 导航菜单 */}
                <Flex className='nav'>
                    {this.rendernav()}
                </Flex>
            {/* 实现租房小组的样式 */} 
                <div className='group'>
                    <h3 className='group-title'>租房小组
                        <span className='group-more'>更多
                        </span>
                    </h3>
                    <Grid data={this.state.groupdata}  square={false} columnNum={2} hasLine={false}
                    renderItem={(item)=>(
                    <Flex className='group-item' justify='around' key={item.id}>
                        <div className='left'>
                            <p className='title'>{item.title}</p>
                            <span className='info'>{item.desc}</span>
                        </div>
                        <img src={BASE_URL+item.imgSrc}
                        alt=''/>
                    </Flex>
                )}
                />    
                </div>
            {/* 资讯界面实现 */}
                <div className='news'>
                    <h3 className='news-title'>最新资讯</h3>
                    <WingBlank size='md'>{this.rendernews()}</WingBlank>
                </div>
            </div>
            );
    }
}