import {
  request
} from "../common/request.js"

module.exports = {
  //获取对公转账审批列表
  pageMyOrderTask: (data) => {
    return request('post','/wtcrm/rebuild/task/pageMyOrderTask',data)
  },
  //流程对公转账审批详情
  getDetailByTaskId: (data) => {
    return request('get',`/wtcrm/getDetailByTaskIdofMy/${data}`)
  },
  //对公转账审批操作记录
  getAuditLogList: (data) => {
    return request('post','/admin/auditLog/list',data)
  },

  //流程对公转账发送验证码
  getTransferCode: (data) => {
    return request('get','/wtcrm/transfer/sendCode',data)
  },

  //流程对公转账审核不通过
  postTransferFail: (data) => {
    return request('post','/wtcrm/transfer/auditOfflineFailure',data)
  },
  //流程对公转账审核通过
   auditOfflineSuccess: (data) => {
    return request('post','/wtcrm/transfer/auditOfflineSuccess',data)
  },
  //流程对公转账选择回款下拉
  constantcatagory: () => {
    return request('get','/wtcrm/constantcatagory/list?no=hkqx')
  },

  /* 我的流程-合同审核 */
  contractAuditListOfMy: (data) => {
    return request('post','/wtess/paperContractAudit/pagePaperContractAuditOfMy',data)
  },
  

  /* 我的流程-合同审核详情 */
  getContractDetail: (data) => {
    return request('get','/wtess/paperContractAudit/getPaperContractAuditOfMy',data)
  },
  
  /* 我的流程-合同审核操作 */
  auditPaperContract: (data) => {
    return request('post','/wtess/paperContractAudit/auditPaperContractAuditOfMy',data)
  },

  /* 我的流程-合同审核操作记录 */
  auditLog: (data) => {
    return request('post','/admin/auditLog/list',data)
  },
  
}