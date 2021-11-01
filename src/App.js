import React,{lazy,Suspense} from 'react';
import {Button} from 'antd-mobile'
import {BrowserRouter as Router,Route,Link,Redirect} from 'react-router-dom'
// 导入组件
import Home from './pages/Home'
// import Citylist from './pages/Citylist'
import AuthRoute from './components/AuthRoute'
const Citylist = lazy(()=>import('./pages/Citylist'))
// const Home = lazy(()=>import('./pages/Home'))
const HouseDetail = lazy(()=>import('./pages/HouseDetail'))
const Map = lazy(()=>import('./pages/Map'))
const Login = lazy(()=>import('./pages/Login'))
const Register = lazy(()=>import('./pages/Register'))
const Rent = lazy(()=>import('./pages/Rent'))
const RentAdd = lazy(()=>import('./pages/Rent/Add'))
const RentSearch = lazy(()=>import('./pages/Rent/Search'))
// const AuthRoute = lazy(()=>import('./components/AuthRoute'))
/*import Home from './pages/Home'
import HouseDetail from './pages/HouseDetail';
import Map from './pages/Map';
import Login from './pages/Login';
import Register from './pages/Register'
import Rent from './pages/Rent'
import RentAdd from './pages/Rent/Add'
import RentSearch from './pages/Rent/Search'*/

function App() {
    return (
        
        <Router>
            <Suspense fallback={<div className="route-loading">loading</div>}>
            <div className='App'>
                {/* <p>hudi<Button>按钮</Button></p>     */}
                {/* 配置入口 */}
                {/* <Link to='/home'>Home</Link>
                <Link to='/citylist'>Citylist</Link> */}
                {/* 配置路由 */}
                <Route path='/home' component={Home}></Route>
                <Route path='/citylist' component={Citylist}></Route>
                <Route exact path='/' render={()=><Redirect to = '/home'/>}/>
                <AuthRoute path='/map' component={Map}></AuthRoute>
                <Route path="/detail/:id" component={HouseDetail} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />

                {/* 路由鉴权，只有登录后才可以访问的页面 */}
                <AuthRoute exact path="/rent" component={Rent} />
                <AuthRoute path="/rent/add" component={RentAdd} />
                <AuthRoute path="/rent/search" component={RentSearch} />
            </div>
            </Suspense>
        </Router>
       
    );
}

export default App;