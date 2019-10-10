import React from 'react'
import {
    Card,
    Icon,
    List,
} from 'antd'

import { reqCategory, reqProduct } from '../../api'
import { BASE_IMG } from '../../utils/Constants'
import LinkButton from '../../components/link-button'
import memoryUtils from '../../utils/memoryUtils'

const Item = List.Item


export default class ProductDetail extends React.Component {

    state = {
        categoryName: '',
        product: memoryUtils.product || {}
    }

    getCategory = async (categoryId) => {
        const result = await reqCategory(categoryId)
        if (result.status === 0) {
            const categoryName = result.data.name
            this.setState({
                categoryName
            })
        }
    }

    async componentDidMount() {
        let product = this.state.product
        if (product._id) { // 如果商品有数据，获取对应的分类
            this.getCategory(product.categoryId)
        } else {
            const id = this.props.match.params.id // 如果在当前页面刷新，就获取从上个页面传过来的id值(地址栏)
            const result = await reqProduct(id)
            if (result.status === 0) {
                product = result.data
                this.setState({
                    product
                })
                this.getCategory(product.categoryId)
            }
        }
    }

    render() {
        const { categoryName } = this.state
        const product = this.state.product

        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <Icon type="arrow-left" />
                </LinkButton>
                <span>商品详情</span>
            </span>
        )
        return (
            <Card title={title} className="detail">
                <List>
                    <Item>
                        <span className="detail-left">商品名称:</span>
                        <span>{product.name}</span>
                    </Item>
                    <Item>
                        <span className="detail-left">商品描述:</span>
                        <span>{product.desc}</span>
                    </Item>
                    <Item>
                        <span className="detail-left">商品价格:</span>
                        <span>{product.price}元</span>
                    </Item>
                    <Item>
                        <span className="detail-left">所属分类:</span>
                        <span>{categoryName}</span>
                    </Item>
                    <Item>
                        <span className="detail-left">商品图片:</span>
                        <span>
                            {
                               product.imgs && product.imgs.map(img => <img
                                    key={img} className="detail-img" src={BASE_IMG + img} alt="img"
                                />)
                            }

                        </span>
                    </Item>
                    <Item>
                        <span className="detail-left">商品详情:</span>
                        <div dangerouslySetInnerHTML={{ __html: product.detail }} ></div>
                    </Item>
                </List>
            </Card>
        )
    }
}
