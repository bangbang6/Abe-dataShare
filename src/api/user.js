import { removeToken } from '@/utils/auth'
import request from '@/utils/request'
// 普通用户登录
export function userLogin (obj) {
  return request({
    url: '/user/login',
    method: 'POST',
    data: obj
  })
}
// 管理员登录
export function adminLogin (obj) {
  return request({
    url: '/user/adminLogin ',
    method: 'POST',
    data: obj
  })
}
/**
 * 用户注册
 * @param {*} obj
 * @returns
 */
export function register (obj) {
  return request({
    url: '/user/register ',
    method: 'POST',
    data: obj
  })
}
/**
 * 获取所有channel
 * @param {*} obj
 * @returns
 */
export function getAllChannel () {
  return request({
    url: '/channel/getAllChannels',
    method: 'GET'
  })
}
/**
 * 退出登录
 * @param {*} obj
 * @returns
 */
export function logout () {
  removeToken('abe-token')
  removeToken('abe-username')
}
