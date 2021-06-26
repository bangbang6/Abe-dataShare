import request from '@/utils/request'

/**
 * 获取用户申请的属性列表
 * @returns
 */
export function getUserApplyAttributes () {
  return request({
    url: '/user/getUserApplyAttributes',
    method: 'GET'
  })
}
/**
 * 获取用户自己的属性列表
 * @returns
 */
export function getUserAttributes () {
  return request({
    url: '/user/getUserAttributes',
    method: 'GET'
  })
}
/**
 * 获取所有的用户
 * @returns
 */
export function getAllUsers () {
  return request({
    url: '/user/getAllUsersExMe',
    method: 'GET'
  })
}
/**
 * 获取某个用户的属性列表
 * @returns
 */
export function getOtherUserAttributes (userId) {
  return request({
    url: `user/findUserAttributes?userId=${userId}`,
    method: 'GET'
  })
}
/**
 * 向某个用户申请属性
 * @returns
 */
export function applyForAttributes (data) {
  return request({
    url: `/apply/applyForAttributes`,
    method: 'POST',
    data
  })
}
/**
 * 获取用户审批列表
 * @returns
 */
export function getApplyList () {
  return request({
    url: `/apply/getApplyList`,
    method: 'GET'

  })
}
/**
 * 用户审批单个属性
 * @returns
 */
export function doSingleApply (data) {
  return request({
    url: `/apply/doApply`,
    method: 'POST',
    data

  })
}
/**
 * 用户审批批量属性
 * @returns
 */
export function doMultipleApply (data) {
  return request({
    url: `/apply/doMultipleApply `,
    method: 'POST',
    /* headers: {
      'Content-Type': ' application/json'
    }, */
    data

  })
}
/**
 * 获取所有属性 用于策略
 * @returns
 */
export function getAllRoles () {
  return request({
    url: `/apply/getAttributesList`,
    method: 'GET',
    /* headers: {
      'Content-Type': ' application/json'
    }, */

  })
}
