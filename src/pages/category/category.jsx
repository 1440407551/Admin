import React, { Component } from 'react'
import {
  Card,
  Button,
  Icon,
  Table
} from 'antd'

import { reqCategorys } from '../../api'
import LinkButton from '../../components/link-button'
import { async } from 'q'

/**
 * 分类管理
 */
export default class Category extends Component {

  state = {
    categorys: [], // 所有分类的数组
  }

  UNSAFE_componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getCategorys()
  }

  /**
   * 初始化table的所有列信息的数组
   */
  initColumns = () => {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width: 300,
        render: () => <LinkButton>修改分类</LinkButton>
      },
    ];
  }

  /**
   * 异步获取分类列表
   */
  getCategorys = async () => {
    await reqCategorys()
  }


  render() {
    // 取出状态数据
    const { categorys } = this.state

    // Card右上角的结构
    const extra = (
      <Button type="primary">
        <Icon type="plus" />
        添加
      </Button>
    )


    return (
      <Card extra={extra}>
        <Table
          bordered
          rowKey="_id"
          columns={this.columns}
          dataSource={categorys}
          pagination={{ defaultPageSize: 2 }}
        />
      </Card>
    )
  }
}
