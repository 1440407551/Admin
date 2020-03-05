import React from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'

import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'

// 引入子路由
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'

const { Footer, Sider, Content } = Layout;

export default class Admin extends React.Component {
    render() {

        // 读取保存的 user，如果不存在，直接跳转到登录界面
        // const user = JSON.parse(localStorage.getItem('user_key') || '{}')
        const user = memoryUtils.user
        if (!user._id) {
            // this.props.history.replace('/login') // 事件回调函数中进行路由跳转
            return <Redirect to="/login" /> // 自动跳转到指定的路由路径
        }
        return (
            <Layout style={{ height: '100%' }}>
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header />
                    <Content style={{ background: 'white', margin: '20px' }}>
                        <Switch>
                            <Route path="/home" component={Home} />
                            <Route path='/category' component={Category} />
                            <Route path='/product' component={Product} />
                            <Route path='/role' component={Role} />
                            <Route path='/user' component={User} />
                            <Route path='/charts/bar' component={Bar} />
                            <Route path='/charts/line' component={Line} />
                            <Route path='/charts/pie' component={Pie} />
                            <Redirect to="/home" />
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: 'center', color: 'rgba(0, 0, 0, 0.5)' }}>
                        <div>推荐使用谷歌浏览器，可以获得更佳页面操作体验</div>
                        <div>© 2018 - {new Date().getFullYear()} 小城版权所有 <a href="http://www.beian.miit.gov.cn/" target="_blank">粤ICP备19149052号</a></div>
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}
