import React from 'react'

import './index.less'

export default class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="header-top">
                    欢迎，admin
                    <a href="javascript:">退出</a>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">角色管理</div>
                    <div className="header-bottom-right">
                        <span>2019-09-19 12:12:12</span>
                        <img src="http://api.map.baidu.com/images/weather/day/duoyun.png" alt="weather"/>
                        <span>多云</span>
                    </div>
                </div>
            </div>
        )
    }
}