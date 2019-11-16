import React from 'react'
import {
    Form,
    Input,
    Tree
} from 'antd'
import PropTypes from 'prop-types'


import menuList from '../../config/menuConfig'

const { TreeNode } = Tree;

const Item = Form.Item

class AuthForm extends React.Component {

    static propTypes = {
        role: PropTypes.object
    }

    state = {
        checkedKeys: []
    }

    getMenus = () => this.state.checkedKeys

    /**
     * 根据菜单配置生成TreeNode的标签数组
     * @param menuList 菜单配置数组
     */
    getTreeNodes = (menuList) => {
        return menuList.reduce((pre, item) => {
            pre.push(
                <TreeNode title={item.title} key={item.key}>
                    {item.children ? this.getTreeNodes(item.children) : null}
                </TreeNode>
            )
            return pre
        }, [])
    }


    /**
     * 进行勾选操作时的回调
     * @param checkedKeys 最新的所有勾选的node的key的数据
     */
    handleCheck = (checkedKeys) => {
        this.setState({
            checkedKeys
        })
        console.log(this.state.checkedKeys)
    }


    componentWillMount() {
        // this.props.setForm(this.props.form)
        this.treeNodes = this.getTreeNodes(menuList)
        // 根据传入角色的menus来更新checkedKeys状态
        const menus = this.props.role.menus
        this.setState({
            checkedKeys: menus
        })
    }

    /**
     * 组件接收到新的标签属性时就会执行(初始显示时不会调用)
     * @param nextProps 接收到的包含所有新的属性的对象
     */
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        const menus = nextProps.role.menus
        this.setState({
            checkedKeys: menus
        })
    }

    render() {
        const { role } = this.props
        const { checkedKeys } = this.state


        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 15 }
        }
        return (
            <div>
                <Item label="角色名称" {...formItemLayout}>
                    <Input value={role.name} disabled></Input>
                </Item>

                <Tree
                    checkable
                    defaultExpandAll
                    checkedKeys={checkedKeys}
                    onCheck={this.handleCheck}
                >
                    <TreeNode title="平台权限" key="all">
                        {
                            this.treeNodes
                        }
                    </TreeNode>
                </Tree>
            </div>


        )
    }
}

// export default AuthForm = Form.create()(AuthForm)
export default AuthForm