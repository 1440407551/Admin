import React from 'react'
import {
    Form,
    Input
} from 'antd'

const Item = Form.Item

export default class AddForm extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form

        return (
            <Form>
                <Item>
                    {
                        getFieldDecorator('roleName', {})()
                    }
                </Item>
            </Form>
        )
    }
}