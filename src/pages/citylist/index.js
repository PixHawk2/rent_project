import React from 'react';
import { NavBar ,Icon, Toast} from "antd-mobile"
import './index.scss'
import axios from "axios"
import {getCurrentLocation} from '../../utils'
import {List,AutoSizer} from 'react-virtualized'
import NavHeader from "../../components/NavHeader"
  
// 两个常量分别用来记录标题和内容的高度，用于动态计算每行的高度
const title_height = 40;
const content_height = 50;
const city_list = ['北京','上海','广州','深圳']

const formatCityListData = (list) =>{
    const cityList = {};
   
    list.forEach(element => {
        const first = element.short.substr(0,1);
        if(cityList[first]){
            cityList[first].push(element)
        }else{
            cityList[first] = [element]
        }
    });
    const cityListIndex = Object.keys(cityList).sort()
    return{
        cityList,
        cityListIndex
    }
}
// 格式化索引的实现方法I
const formatTitle = (letter)=>{
    switch(letter){ 
        case '#':
            return '当前城市';
        case 'hot':
            return '热门城市';
        default:
            return letter.toUpperCase();
    }
}
// 格式化索引的实现方法
function formattitlex(key){
    switch(key){
        case '#':
            return 'hjahah';
        case 'hot':
            return 'HOT';
        default:
            return key.toUpperCase();
    }
}
// 渲染城市列表数据方法：1.将Citylist和citylistindex添加为组件的状态数据；2.修改组件的rowCount为cityindex中数组的长度；
// 3.将rowrenderer函数，添加到组件中，以便在函数中获取到状态数据和索引数据
// 4.修改list组件的rowrenerer方法为组件中的rowRenderer方法
// 5.修改rowRenderer方法中渲染的每行解构和样式
// 6.修改list组件的rowHeight为函数，动态计算每行的高度
// 
export default class Citylist extends React.Component{
    constructor(props){
        super(props)
        this.  state = {
            cityList:{},
            cityListIndex:[],
            activeIndex:0
        }
        this.cityListComponent = React.createRef();
    }
    // 获取城市列表数据
  
    async getCityListData(){
        const res = await axios.get('http://localhost:8080/area/city?level=1');
        const {cityList,cityListIndex} = formatCityListData(res.data.body);
        
        
         // 获取热点城市数据
        const hotCity = await axios.get('http://localhost:8080/area/hot');
        cityList['hot'] = hotCity.data.body;
        cityListIndex.unshift('hot');
        // 获取当前定位城市
        const currentCity = await getCurrentLocation();
        cityList['#'] = [currentCity];//此处需要特别注意：新加入的参数必须为数组类型，否则后续遍历时无法正常使用map方法
        cityListIndex.unshift('#');
        console.log('城市列表数据',cityList);
        console.log('城市索引数据',cityListIndex);
        this.setState({
            cityList:cityList,
            cityListIndex:cityListIndex
        }) 
    }

    // 切换城市实现
    // cityselect({label,value}){
    //     if(city_list.indexOf(label)>-1){
    //         localStorage.setItem('hudi_rent',JSON.stringify({label,value}))
    //         this.props.history.go(-1)
    //     }else{
    //         Toast.info('没有房源数据',1,null,false)
    //     }
    // }
    cityselect = ({label,value})=>{
        if(city_list.indexOf(label)>-1){
            localStorage.setItem('hudi_rent',JSON.stringify({label,value}))
            this.props.history.go(-1)
        }else{
            Toast.info('没有房源数据',1,null,false)
        }
    }


    // 渲染城市列表索引数据，为了解决this指向问题修改为箭头函数
    rowRenderer = ({
        key, // Unique key within array of rows
        index, // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible, // This row is visible within the List (eg it is not an overscanned row)
        style, // Style object to be applied to row (to position it)
    })=> {
        
        // console.log(this.state.cityListIndex[index])
        const title = this.state.cityListIndex[index]
        const {cityList} = this.state
        // console.log(cityList[title])
        return (
            <div key={key} style={style} className='city'>
                <div className = 'title'>{formatTitle(title)}</div> 
                {/* <div className = 'city-content'>上海</div> */}
                {
                    cityList[title].map(item=>
                        <div className = 'city-content' key ={item.value}  onClick={()=>{this.cityselect(item)}}>{item.label}</div>
                    )
                }
            </div>
        );
    }
    // 计算每行的高度
    getRowHeight = ({index})=>{
        const {cityList,cityListIndex} = this.state
        // TITLE_HEIGHT + cityList[cityIndex[index]].length * NAME_HEIGHT
        return title_height + cityList[cityListIndex[index]].length * content_height
    }
    // 用于获取list组件中渲染行的信息
    onRowsRendered = ({startIndex})=>{
        // const {activeIndex} = this.state
        if(startIndex !== this.state.activeIndex){
            this.setState({
                activeIndex:startIndex
            })
        }
    }
    async componentDidMount(){
        await this.getCityListData();
        this.cityListComponent.current.measureAllRows()
    }
    // 右侧列表渲染方法
    renderRightCityList = ()=>{
        const {cityListIndex,activeIndex} = this.state
        return cityListIndex.map((item,index)=>(
            <li className='city-index-item' key={item} onClick={()=>{
                // console.log(index)
                this.cityListComponent.current.scrollToRow(index)
            }} >
            <span className={activeIndex===index?'index-active':''}>{item ==='hot'?'热':item.toUpperCase()}</span>
        </li>
        ))
    }
    // renderRightCityList(){
    //     const {cityListIndex,activeIndex} = this.state
    //     return cityListIndex.map((item,index)=>(
    //         <li className='city-index-item' key={item}>
    //         <span className={activeIndex===index?'index-active':''}>{item ==='hot'?'热':item.toUpperCase()}</span>
    //     </li>
    //     ))
    // }
    render(){
        return(
            <div className='citylist'>
                {/* <NavBar
                    mode="light"
                    icon={<i className='iconfont icon-back' />}
                    onLeftClick={() => this.props.history.push('/home')}
                >城市列表
                </NavBar> */}
                <NavHeader>城市列表</NavHeader>
                <AutoSizer>
                    {({height, width}) => (
                         <List
                         ref = {this.cityListComponent}
                         width={width}
                         height={height}
                         rowCount={this.state.cityListIndex.length}
                         rowHeight={this.getRowHeight}
                         rowRenderer={this.rowRenderer}
                         onRowsRendered={this.onRowsRendered}
                         scrollToAlignment='start'
                     />
                    )}
                </AutoSizer>
                <ul className='city-index'>
                    {this.renderRightCityList()}
                </ul>    
          </div>
        //   列表数据
        
        )
    }
}