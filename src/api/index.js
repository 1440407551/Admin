/**
 包含应用中所有请求接口的函数：接口请求函数
 函数的返回值都是 Promise 对象
 */

import ajax from './ajax' // axios 不能发 jsonp 请求
import jsonp from 'jsonp'
import { message } from 'antd'

// 请求登录
const BASE = ''
export const reqLogin = (username, password) => (
    // ajax({
    //     method: 'post',
    //     url: '/login',
    //     data: { // data是对象，默认使用 json格式 的 请求体 携带参数数据
    //         username,
    //         password
    //     }
    // })

    ajax.post(BASE + '/login', { username, password })
)

// 发送 jsonp 请求得到天气信息
export const reqWeather = (city) => {
    return new Promise((resolve, reject) => {
        // 执行器函数：内部去执行异步任务，
        // 成功了调用 resolve(), 失败了不调用 reject()，直接提示错误
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`

        jsonp(url, {}, (err, data) => {
            if (!err && data.error === 0) { // 成功的
                const { dayPictureUrl, weather } = data.results[0].weather_data[0]
                resolve({ dayPictureUrl, weather })
            } else { // 失败
                message.error('获取天气信息失败')
            }
        })
    })
}

// 获取分类列表
// export const reqCategorys = () => ajax.get(BASE + '/manage/category/list')
// export const reqCategorys = () => ajax({
//     // method: 'GET',
//     url: BASE + '/manage/category/list'
// })
export const reqCategorys = () => ajax(BASE + '/manage/category/list')
