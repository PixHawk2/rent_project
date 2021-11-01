import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import { API, BASE_URL } from '../../utils'
import { Toast } from 'antd-mobile'
import NavHeader from '../../components/NavHeader'
import HouseItem from '../../components/HouseItem'
import NoHouse from '../../components/NoHouse'

import styles from './index.module.css'

export default class Rent extends Component {
  state = {
    // 出租房屋列表
    list: [],
    loadingFlag:false
  }

  // 获取已发布房源的列表数据
  async getHouseList() {
      try{
            Toast.loading('Data is Loading...',0,null,true)
            const res = await API.get('/user/houses')
            const { status, body } = res.data
            if (status === 200) {
            this.setState({
                list: body,
                loadingFlag:true
            })
            } else {
            const { history, location } = this.props
            history.replace('/login', {
                from: location
            })
            }
            Toast.hide()
      }
      catch{
          Toast.hide()
      }
    
    Toast.hide()
  }

  componentDidMount() {
    this.getHouseList()
  }

  renderHouseItem() {
    const { list } = this.state
    const { history } = this.props

    return list.map(item => {
      return (
        <HouseItem
          key={item.houseCode}
          onClick={() => history.push(`/detail/${item.houseCode}`)}
          src={BASE_URL + item.houseImg}
          title={item.title}
          desc={item.desc}
          tags={item.tags}
          price={item.price}
        />
      )
    })
  }

    renderRentList() {
        const { list,loadingFlag } = this.state
        const hasHouses = list.length > 0

        if (!hasHouses&&loadingFlag) {
        return (
            <NoHouse>
            您还没有房源，
            <Link to="/rent/add" className={styles.link}>
                去发布房源
            </Link>
            吧~
            </NoHouse>
        )
        }

        return <div className={styles.houses}>{this.renderHouseItem()}</div>
  }

  render() {
    const { history } = this.props

    return (
      <div className={styles.root}>
        <NavHeader onLeftClick={() => history.push('/home/profile')}>房屋管理</NavHeader>

        {this.renderRentList()}
      </div>
    )
  }
}
