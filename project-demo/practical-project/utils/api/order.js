import {
  request
} from "../common/request.js"

module.exports = {
  // 获取我的订单列表 type：0-产品订单 1-课程订单 2-会员订单 3-待生效订单
  getMyOrder: (data, type) => {
    let url = type == 0 ? '/wtorder/tmOrder/pageMyOrder' : type == 1 ? '/wttalk/courseOrder/pageMyCourseOrder ' : type == 2 ? '/wttalk/vipOrder/pageMyVipOrder' : type == 3 ? '/wtorder/tmOrder/pageMyIneffectiveOrder' : ''
    return request('post', `${url}`, data)
  },
  // 获取我的订单详情 type：0-产品订单
  getMyOrderDetail: (data, type, dataType) => {
    let url = type == 0 ? `/wtorder/tmOrder/${data.orderId}?sensitiveFlag=false` : `/wtorder/tmOrder/getIneffectiveById/${data.orderId}?sensitiveFlag=false`
    return request('get', `${url}`)
  },
  // 发起订单
  generateOrder: (data) => {
    return request('post', `/wtorder/tmOrder/createOrder`, data)
  },
  // 修改订单
  updateOrder: (data) => {
    return request('post', `/wtorder/tmOrder/updateOrder`, data)
  },
  // 修改订单状态
  updateOrderStatus: (data) => {
    return request('post', `/wtorder/tmOrder/validDraftOrder`, data)
  },
  // 关闭订单
  closeOrder: (data) => {
    return request('put', `/wtorder/tmOrder/invalidOrder/${data.orderId}`)
  },
  // 删除订单
  delOrder: (data) => {
    return request('delete', `/wtorder/tmOrder/removeOrder/${data.orderId}`)
  },
  // 订单改价
  modifyOrder: (data) => {
    return request('post', `/wtorder/tmOrder/saveChangePrice`, data)
  },
  // 进订单改价页面前判断订单状态
  getModifyOrderStatus: (data) => {
    return request('get', `/wtorder/orderPayment/listPaymentByOrderId`, data)
  },
  // 获取订单改价详情
  getModifyOrderDetail: (data) => {
    return request('get', `/wtorder/tmOrder/changePrice/${data.orderId}`)
  },
  // 订单详情-修改备注
  updateRemark: (data) => {
    return request('post', `/wtorder/tmOrder/updateRemark`, data)
  },
  //订单详情-任务进度
  getProgress: (data) => {
    return request('get', `/wtorder/ttTaskProcess/getProgressById`, data)
  },
  // 获取支付凭证
  getPayUrl: (data) => {
    return request('get', `/wtcrm/rebuild/getTrTaskOrderByTaskNo/${data.taskNo}`)
  },
  // 获取会员/课程订单详情 type 1-课程详情 2-会员详情
  getClassMemberDetail: (data, type) => {
    let url = type == 1 ? `/wttalk/courseOrder/${data.id}` : `/wttalk/vipOrder/${data.id}`
    return request('get', `${url}`)
  },
  // 线索详情-订单记录 0-产品订单，1-待生效订单
  getClueOrderRecords: (data, type) => {
    let url = type == 0 ? `/wtorder/tmOrder/page` : `/wtorder/tmOrder/pageMyIneffectiveOrder`
    return request('post', `${url}`, data)
  },
  // 发起订单审核校验
  validateAudit: (data) => {
    return request('post', `/wtorder/tmOrder/needAudit`, data)
  },
  // 发起订单审核校验（列表和详情调用）
  validateListAudit: (data) => {
    return request('get', `/wtorder/tmOrder/createUrl/${data.orderId}`)
  },
  // 获取改价审批人列表
  getAuditMan: () => {
    return request('get', `/wtcrm/permission/listChangePriceAudit`)
  },
}