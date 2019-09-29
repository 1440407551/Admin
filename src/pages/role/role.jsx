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


import AddForm from './add-form'
import { reqRoles } from '../../api'
import { fromateDate } from '../../utils/dateUtils'
import LinkButton from '../../components/link-button'



/**
 * 角色管理
 */
export default class Role extends React.Component {

  constructor(prop) {
    super(prop)
  }

  state = {
    roles: [],
    isShowAdd: false
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
        render: () => <LinkButton>设置权限</LinkButton>
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

  componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getRoles()
  }


  render() {
    const { roles, isShowAdd } = this.state

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
        // pagination={{ total, defaultPageSize: PAGE_SIZE, onChange: this.getProducts, current: this.pageNum }}
        />
        <Modal
          title="添加角色"
          visible={isShowAdd}
          // onOk={}
          onCancel={() => this.setState({ isShowAdd: false })}
        >

          <AddForm />
        </Modal>
      </Card>
    )
  }
}
