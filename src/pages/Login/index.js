import React, { Component } from 'react'
import { Flex, WingBlank, WhiteSpace,Toast } from 'antd-mobile'
import { withFormik,Form,Field,ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import NavHeader from '../../components/NavHeader'

import styles from './index.module.css'
import { API } from '../../utils/api'

// 验证规则：
const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
const REG_PWD = /^[a-zA-Z_\d]{5,12}$/

class Login extends Component {
    // state = {
    //     username:'',
    //     password:''
    // }
    // 通过受控组件的方式获取用户名和密码
    /*
    handleUsername = e =>{
        this.setState({
            username:e.target.value
        })
    }
    handlePassword = e =>{
        this.setState({
            password:e.target.value
        }) 
    }
    // 添加提交事件
    handleSubmit = async e =>{
        // 阻止默认行为
        e.preventDefault()
        const {username,password} = this.state
        // console.log('获取的账号和密码',username,password)
        const res =await API.post('/user/login',{
            username,
            password
        })
        // this.setState({
        //     username:'',
        //     password:''
        // })
        console.log('登录结果',res.data)
        const {data:{body,description,status}} = res
        if(status === 200){
            localStorage.setItem('hudi_token',body.token)
            // this.props.history.push('/home')
            this.props.history.go(-1)
        }else{
            Toast.info(description,2,null,false)
        }

    }*/
    render() {
        // const {username,password} = this.state 
        const {values,handleSubmit,handleChange,errors,touched,handleBlur} = this.props
        // console.log(errors, touched)
        return (
        <div className={styles.root}>
            {/* 顶部导航 */}
            <NavHeader className={styles.navHeader} onLeftClick={()=>this.props.history.push('/home')}>账号登录</NavHeader>
            <WhiteSpace size="xl" />

            {/* 登录表单 */}
            <WingBlank>
            <Form >
                <div className={styles.formItem}>
                    <Field className={styles.input}  name="username"placeholder="请输入账号"/>
                {/* <input
                    className={styles.input}
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="username"
                    placeholder="请输入账号"
                /> */}
                </div>
                <ErrorMessage className={styles.error} component={"div"} name="username"></ErrorMessage>
                {/* {
                    errors.username && touched.username &&(<div className={styles.error}>{errors.username}</div>)
                } */}
                {/* 长度为5到8位，只能出现数字、字母、下划线 */}
                {/* <div className={styles.error}>账号为必填项</div> */}
                <div className={styles.formItem}>
                    <Field className={styles.input}  name="password"
                    type="password"
                    placeholder="请输入密码"/>
                {/* <input
                    className={styles.input}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="password"
                    type="password"
                    placeholder="请输入密码"
                /> */}
                </div>
                {/* 长度为5到12位，只能出现数字、字母、下划线 */}
                {/* <div className={styles.error}>账号为必填项</div> */}
                <ErrorMessage className={styles.error} name='password' component={"div"}/>
                {/* {
                    errors.password && touched.password && (<div className={styles.error}>{errors.password}</div>)
                } */}
                <div className={styles.formSubmit}>
                <button className={styles.submit} type="submit">
                    登 录
                </button>
                </div>
            </Form>
            <Flex className={styles.backHome}>
                <Flex.Item>
                <Link to="/register">还没有账号，去注册~</Link>
                </Flex.Item>
            </Flex>
            </WingBlank>
        </div>
        )
    }
}
Login = withFormik(
   {
        mapPropsToValues: () => ({ username:'',password:'' }),
        validationSchema:Yup.object().shape({
            username:Yup.string().required('账号为必填项').matches(REG_UNAME,'长度为5到8位，只能出现数字、字母、下划线'),
            password:Yup.string().required('密码为必填项').matches(REG_PWD,'长度为5到12位，只能出现数字、字母、下划线')
        }),
        handleSubmit:async (values,{props}) =>{
            const {username,password} = values
        // console.log('获取的账号和密码',username,password)
            const res =await API.post('/user/login',{
            username,
            password
        })
            console.log('登录结果',res.data)
            const {data:{body,description,status}} = res
            if(status === 200){
                localStorage.setItem('hudi_token',body.token)
                // this.props.history.push('/home')
                // props.history.go(-1)
                // console.log('*******',props)
                if(!props.location.state){
                    props.history.go(-1)
                }else{
                    // 此处使用replace而不适用push是为了解决登录成功之后点击地图返回到登录界面
                    props.history.replace(props.location.state.from.pathname)
                }
            }else{
                Toast.info(description,2,null,false)
            }
        }
   }
)(Login)

export default Login
