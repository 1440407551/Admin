import React from 'react'


import {
  Card,
  Modal,
  Button,
  Table,
  message
} from 'antd'

import { reqUsers, reqAddOrUpdateUser, reqDeleteUser } from '../../api'
import { fromateDate } from '../../utils/dateUtils'
import LinkButton from '../../components/link-button'
import UserForm from './user-form'


/**
 * 用户管理
 */
export default class User extends React.Component {


  state = {
    users: [],  // 所有用户列表
    roles: [], // 所有角色列表
    isShow: false, // 是否显示确认框
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
        // render: role_id => this.state.roles.find(role => role._id === role_id).name
        // render: role_id => this.roleNames[role_id].name
      },
      {
        title: '操作',
        render: (user) => (
          <span>
            <LinkButton onClick={() => this.showUpdate(user)}>修改</LinkButton>
            <LinkButton onClick={() => this.deleteUser(user)}>删除</LinkButton>
          </span>
        )
      },
    ]
  }

  getUsers = async () => {
    const result = await reqUsers()
    if (result.status === 0) {
      const { users, roles } = result.data
      // debugger
      // 生成一个对象容器(属性名: 角色的ID值, 属性值: 角色的名称)
      this.roleNames = roles.reduce((pre, role) => {
        pre[role._id] = role
        return pre
      }, {})
      console.log(this.roleNames)
      this.setState({
        users,
        roles
      })
    }
  }

  addOrUpdateUser = () => {

    this.setState({
      isShow: false
    })

    this.form.validateFields(async (err, values) => {
      if (!err) {
        // 如果this里面有user
        if (this.user) {
          values._id = this.user._id
        }
        const result = await reqAddOrUpdateUser(values)
        if (result.status === 0) {
          if (this.user) {
            message.success('修改用户成功!')
          } else {
            message.success('添加用户成功!')
          }
          this.getUsers()
        } else {
          message.error(result.msg)
        }
        this.form.resetFields() // 重置输入数据(变成了初始值)
      }
    })
  }

  showAdd = () => {
    this.user = null
    this.setState({
      isShow: true
    })
  }

  showUpdate = (user) => {
    this.user = user // 保存user
    this.setState({
      isShow: true
    })
  }

  deleteUser = (user) => {
    Modal.confirm({
      title: `确认删除${user.username}吗？`,
      onOk: async () => {
        const result = await reqDeleteUser(user._id)
        if (result.status === 0) {
          message.success('删除用户成功!') 
          this.getUsers()
        } else {
          message.error(result.msg)
        }
      }
    })
  }

  componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getUsers()
  }


  render() {
    const { users, isShow, roles } = this.state
    const user = this.user || {}
    // console.log('render', user)
    // console.log(user)
    const title = (
      <span>
        <Button onClick={this.showAdd} type="primary">
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
        <Modal
          title={user._id ? '修改用户' : '添加用户'}
          visible={isShow}
          onOk={this.addOrUpdateUser}
          onCancel={() => {
            this.form.resetFields() // 重置输入数据(变成了初始值)
            this.setState({ isShow: false })
          }}
        >
          <UserForm
            setForm={form => this.form = form}
            roles={roles}
            user={user}
          />
        </Modal>

      </Card>
    )
  }
}

