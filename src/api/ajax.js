/**
 封装的能发 ajax 请求 的函数, 向外暴露的本质是 axios
 1、解决了 post 请求携带参数的问题：默认是 json，需要转换成urlencode 格式
 2、让请求成功的结果不再是 response ，而是 response.data 的值
 3、统一处理所有请求的异常错误
 */

import axios from 'axios'
import qs from 'qs'
import { message } from 'antd'

// 添加请求拦截器，让 post 请求的 请求体格式为 urlencoded 格式 a=1&b=2
// 在真正发请求前执行
axios.interceptors.request.use(function (config) {

    // 得到 请求方式 和 请求体数据
    const { method, data } = config
    // 处理 post 请求，将 data 对象转换成 query 参数格式字符串
    if (method.toLowerCase() === 'post' && typeof data === 'object') {
        config.data = qs.stringify(data)
    }
    return config
});

// 添加响应拦截器
// 功能1：让请求成功的结果不再是 response，而是 response.data 的值
// 功能2：
// 请求返回之后 且 在我们指定的 请求回调函数 之前执行
axios.interceptors.response.use(function (response) {

    return response.data // 返回的结果 就会 交给我们指定的 请求响应的回调
}, function (error) { // 统一处理所有请求的异常错误
    message.error('请求出错' + error.message)
    // return Promise.reject(error)
    // 返回一个 pending 状态的 Promise，中断 Promise 链式调用
    return new Promise(() => { })
})

export default axios