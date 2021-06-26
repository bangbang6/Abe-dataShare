import request from '@/utils/request'
/**
 * 上传文件
 * @param {*} data 
 * @returns 
 */
export function uploadFile (data) {
  return request({
    url: '/data/uploadFile',
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}
/**
 * 获取我的文件
 * @param {*} data 
 * @returns 
 */
export function getMyFile () {
  return request({
    url: '/data/getDataListByOriginUserId',
    method: 'GET',
  })
}
/**
 * 获取所有文件
 * @param {*} data 
 * @returns 
 */
export function getAllFile () {
  return request({
    url: '/data/getDataList',
    method: 'GET',
  })
}
