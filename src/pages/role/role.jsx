import React from 'react'
import {
  Card,
  Select,
  Input,
  Button,
  Icon,
  Table,
  message,
  Modal
} from 'antd'


import AuthForm from './auth-form'
import AddForm from './add-form'
import memoryUtils from '../../utils/memoryUtils'
import { reqRoles, reqAddRole, reqUpdateRole } from '../../api'
import { fromateDate } from '../../utils/dateUtils'
import LinkButton from '../../components/link-button'



/**
 * 角色管理
 */
export default class Role extends React.Component {

  constructor(prop) {
    super(prop)

    this.authRef = React.createRef()
    console.log(this.authRef.current)
  }

  state = {
    roles: [],
    isShowAdd: false,
    isShowAuth: false
  }

  initColumns = () => {
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: fromateDate
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render: fromateDate
      },
      {
        title: '授权人',
        dataIndex: 'auth_name'
      },
      {
        title: '操作',
        render: (role) => <LinkButton onClick={() => this.showAuth(role)} >设置权限</LinkButton>
      }
    ]
  }

  getRoles = async () => {
    const result = await reqRoles()
    if (result.status === 0) {
      const roles = result.data
      this.setState({
        roles
      })
    }
  }

  addRole = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        const { roleName } = values

        this.setState({
          isShowAdd: false
        })

        const result = await reqAddRole(roleName)
        if (result.status === 0) {
          message.success('添加角色成功!')
          this.getRoles()
        } else {
          message.error(result.msg)
        }
      }
    })
  }

  showAuth = (role) => {
    // 将当前需要设置的角色保存到组件对象上
    this.role = role
    this.setState({
      isShowAuth: true
    })
  }

  updateRole = async () => {
    // 隐藏确认框
    this.setState({
      isShowAuth: false
    })
    const { role } = this
    // 更新role对象相关信息
    // console.log(this.authRef)
    role.menus = this.authRef.current.getMenus()
    console.log('menu', role.menus)
    role.auth_time = Date.now()
    role.auth_name = memoryUtils.user.username
    // 请求更新
    const result = await reqUpdateRole(role)
    if(result.status === 0) {
      message.success('角色授权成功!')
      this.getRoles()
    } else {
      message.error(result.msg)
    }
  }

  componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getRoles()
  }


  render() {
    const { roles, isShowAdd, isShowAuth } = this.state
    const role = this.role || {}
    const title = (
      <span>
        <Button type="primary" onClick={() => this.setState({ isShowAdd: true })}>
          创建角色
        </Button>
      </span>
    )


    return (
      <Card title={title}>
        <Table
          bordered
          rowKey="_id"
          columns={this.columns}
          dataSource={roles}
          pagination={{ defaultPageSize: 3 }}
        />
        <Modal
          title="添加角色"
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={() => this.setState({ isShowAdd: false })}
        >
          <AddForm setForm={form => this.form = form} />
        </Modal>

        <Modal
          title="设置角色权限"
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={() => this.setState({ isShowAuth: false })}
        >
          <AuthForm role={role} ref={this.authRef} />
        </Modal>
      </Card>
    )
  }
}
