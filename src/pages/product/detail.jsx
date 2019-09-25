import React from 'react'

import {
    Card,
    Icon,
    List,
} from 'antd'
import LinkButton from '../../components/link-button'

const Item = List.Item


export default class ProductDetail extends React.Component {
    render() {
        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <Icon type="arrow-left" />
                </LinkButton>
                <span>商品详情</span>
            </span>
        )
        return (
            <Card title={title}>
                12344
           </Card>
        )
    }
}
