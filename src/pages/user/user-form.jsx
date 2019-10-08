import React from 'react'
import PropTypes from 'prop-types'
import {
    Form,
    Input,
    Select
} from 'antd'

const Item = Form.Item

const { Option } = Select;

class UserForm extends React.Component {

    static propTypes = {
        setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
        roles: PropTypes.array.isRequired,
        // user: PropTypes.object
      }
    
      componentWillMount () {
        this.props.setForm(this.props.form)
      }

    render() {
        // console.log(this.props)
        const { user, roles } = this.props
        // console.log(user)
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 }
        }
        return (
            <Form {...formItemLayout}>
                <Item label="用户名">
                    {
                        getFieldDecorator('username', {
                            initialValue: user.username,
                            rules: [{ required: true, message: '必须输入用户名' }]
                        })(
                            <Input placeholder="请输入用户名" />
                        )
                    }
                </Item>
                {
                    user._id ? null : (
                        <Item label="密码">
                            {
                                getFieldDecorator('password', {
                                    initialValue: user.password,
                                    rules: [{ required: true, message: '必须输入密码' }]
                                })(
                                    <Input type="password" placeholder="请输入密码" />
                                )
                            }
                        </Item>
                    )
                }
                <Item label="手机号">
                    {
                        getFieldDecorator('phone', {
                            initialValue: user.phone,
                            rules: [{ required: true, message: '必须输入手机号' }]
                        })(
                            <Input placeholder="请输入手机号" />
                        )
                    }
                </Item>
                <Item label="邮箱">
                    {
                        getFieldDecorator('email', {
                            initialValue: user.email,
                            // rules: [{ required: true, message: '必须输入手机号' }]
                        })(
                            <Input placeholder="请输入邮箱" />
                        )
                    }
                </Item>
                <Item label="角色">
                    {
                        getFieldDecorator('role_id', {
                            initialValue: user.role_id,
                            rules: [{ required: true, message: '必须指定角色' }]
                        })(
                            <Select placeholder="请指定角色">
                                {roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)}

                            </Select>
                        )
                    }
                </Item>
            </Form>
        )
    }
}

export default Form.create()(UserForm)