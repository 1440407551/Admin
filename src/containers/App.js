import React from 'react'
import { connect } from 'react-redux'

import Counter from '../components/counter'


/*
应用根组件: 通过包装UI组件(Counter)生成容器组件
容器组件: 通过connect产生的
 */
/**
 * 将特定的state数据映射(转换)成标签属性传递给UI组件(Counter)
 * redux在调用此函数时, 传入了store.getState()的值
 */
const mapStateToprops = (state) => ({ // 返回的对象的所有属性传递给UI组件
    count: state
})
const mapdispatchToProps = () => { }

export default connect(
    mapStateToprops, // 用来指定传递哪些一般属性
    mapdispatchToProps
)(Counter)

