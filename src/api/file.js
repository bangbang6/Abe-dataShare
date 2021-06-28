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
    method: 'GET'
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
    method: 'GET'
  })
}
/**
 * 预览文件
 * @param {*} data
 * @returns
 */
export function previewFile (id) {
  return request({
    url: `/data/getDataContent?id=${id}`,
    method: 'GET'
  })
}
/**
 * 修改文件
 * @param {*} data
 * @returns
 */
export function updateFile (data) {
  return request({
    url: `/data/updateData`,
    method: 'POST',
    data
  })
}
/**
 * 解密文件
 * @param {*} data
 * @returns
 */
export function unCodeFile (data) {
  return request({
    url: `/data/decData`,
    method: 'POST',
    data
  })
}
/**
 * 溯源文件
 * @param {*} data
 * @returns
 */
export function backwardFile (id) {
  return request({
    url: `/trace/traceBackwardForAll`,
    method: 'POST',
    data: {
      dataId: id
    }
  })
}
