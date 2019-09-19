import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd'

import menuList from '../../config/menuConfig'
import './index.less'
import logo from '../../assets/images/logo.png'


const { SubMenu } = Menu
/**
 * 左侧导航组件
 */
class LeftNav extends React.Component {

    /**
     * 根据指定menu数据数组生成<Menu.Item>和<SubMent>的数组
     * reduce + 函数递归
     */
    getMenuNodes2 = (menuList) => {
        // const arr1 = [1, 2, 3, 4];
        // const total = arr1.reduce((preTotal, item) => { // 遍历的回调函数：统计，必须返回当次统计的结果
        //     return preTotal + (item % 2 === 1 ? item : 0)
        // }, 0)

        // 请求的路径
        const path = this.props.location.pathname

        return menuList.reduce((pre, item) => {
            // 可能向pre添加<Menu.Item>
            if (!item.children) {
                pre.push(
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else { // 可能向pre添加<SubMent>
                /**
                 * 判断当前 item 的 key 是否是我需要的 openKey
                 * 查找 item 的所有 children 中 cItem 的 key，看是否有一个跟请求的 path 匹配
                 */
                const cItem = item.children.find(cItem => cItem.key === path)
                if (cItem) {
                    this.openKey = item.key
                }
                


                pre.push(
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNodes2(item.children)}
                    </SubMenu>
                )
            }
            return pre
        }, [])
    }

    /**
     * 根据指定menu数据数组生成<Menu.Item>和<SubMent>的数组
     * map + 函数递归
     */
    getMenuNodes = (menuList) => {
        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }
            return ( // 有下一级的菜单项
                <SubMenu
                    key={item.key}
                    title={
                        <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </span>
                    }
                >
                    {this.getMenuNodes(item.children)}
                </SubMenu>
            )
        })
    }

    render() {

        // 得到当前请求的路由路径
        const menuNodes = this.getMenuNodes2(menuList)
        const selectKey = this.props.location.pathname
        console.log('selectKey', selectKey)
        console.log('openKey', this.openKey)
        return (
            <div className="left-nav">
                <Link className="left-nav-link" to="/home">
                    <img src={logo} alt="logo" />
                    <h1>硅谷后台</h1>
                </Link>

                <Menu defaultSelectedKeys={[selectKey]}
                    defaultOpenKeys={[this.openKey]}
                    mode="inline"
                    theme="dark"
                >
                    {
                        menuNodes
                    }

                    {/* <Menu.Item key="/home">
                        <Link to="/home">
                            <Icon type="home" />
                            <span>首页</span>
                        </Link>
                    </Menu.Item>

                    <SubMenu
                        key="products"
                        title={
                            <span>
                                <Icon type="mail" />
                                <span>商品</span>
                            </span>
                        }
                    >
                        <Menu.Item key="/category">
                            <Link to="/category">
                                <Icon type="folder-open" />
                                <span>品类管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/product">
                            <Link to="/product">
                                <Icon type="filter" />
                                <span>商品管理</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu> */}
                </Menu>
            </div>
        )
    }
}

/**
 * 向外暴露 使用 高阶组件withRouter() 来包装非路由组件
 * 新组件向 LeftNav 传递三个特别属性：history/location/match
 * 结果：LeftNav 可以操作路由相关语法了
 */
export default withRouter(LeftNav)


/**
 * 2个问题
 * 1). 默认选中对应的menuItem
 * 2). 有可能需要默认打开某个SubMenu：访问的是某个二级菜单项对应的path
 */