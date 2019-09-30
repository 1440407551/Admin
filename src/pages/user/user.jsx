import React from 'react'


import {
  Card,
  Modal,
  Button,
  Table
} from 'antd'


import { fromateDate } from '../../utils/dateUtils'
import LinkButton from '../../components/link-button'


/**
 * 用户管理
 */
export default class User extends React.Component {


  state = {
    users: [
      {
        "_id": "5cb05b4db6ed8c44f42c9af2",
        "username": "test",
        "password": "202cb962ac59075b964b07152d234b70",
        "phone": "123412342134",
        "email": "sd",
        "role_id": "5ca9eab0b49ef916541160d4",
        "create_time": 1555061581734,
        "__v": 0
      }
    ]
  }

  initColumns = () => {
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },

      {
        title: '电话',
        dataIndex: 'phone'
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: fromateDate
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
      },
      {
        title: '操作',
        render: () => (
          <span>
            <LinkButton>修改</LinkButton>
            <LinkButton>删除</LinkButton>
          </span>
        )
      },
    ]
  }

  componentWillMount() {
    this.initColumns()
  }


  render() {
    const { users } = this.state

    const title = (
      <span>
        <Button type="primary">
          创建用户
        </Button>
      </span>
    )
    return (
      <Card title={title}>
        <Table
          bordered
          rowKey="_id"
          columns={this.columns}
          dataSource={users}
        />


      </Card>
    )
  }
}

