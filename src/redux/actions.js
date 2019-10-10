/**
 * 包含N个用于创建action对象/函数的工厂函数(action creator)
 */
import {
    SET_HEADE_TITLE
} from './action-types'

/**
 * 设置头部标题的action
 */
export const setHeaderTitle = (headerTitle) => ({
    type: SET_HEADE_TITLE,
    data: headerTitle
})