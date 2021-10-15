import React from 'react';
import ReactDOM from 'react-dom';


import 'antd-mobile/dist/antd-mobile.css'

import './index.css'
import './assets/fonts/iconfont.css'
import 'react-virtualized/styles.css'
// 最后导入APP组件是为了避免antd-mobile的样式覆盖自定义样式
import App from './App'

ReactDOM.render( 
    
    <App/>,document.getElementById('root')
);