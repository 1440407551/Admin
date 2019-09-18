/**
 包含应用中所有请求接口的函数：接口请求函数
 函数的返回值都是 Promise 对象
 */

import ajax from './ajax'

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

// export function reqLogin(username, password) {
//     return ajax({
//         method: 'post',
//         url: '/login',
//         data: { // data是对象，默认使用 json格式 的 请求体 携带参数数据
//             username,
//             password
//         }
//     })
// }

// reqLogin('admin', 'admin').then(response => {
//     console.log('response', response)
//     const result = response
//     console.log('请求成功',result)
// })