//导入vue组件
import Vue from 'vue'

// 导入根组件app
import App from './App'

// 取消生产提示
Vue.config.productionTip = false

//全局接口调用
import {http} from 'utils/http.js'
Vue.prototype.$http = http

//图片地址
import {baseUrl} from './utils/config.js'
Vue.prototype.$img = baseUrl

//指定根组件类型
App.mpType = 'app'	

// 实例化vue组件
const app = new Vue({
    ...App
})
// 进行挂载
app.$mount()
