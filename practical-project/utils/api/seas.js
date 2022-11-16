import {
  request
} from "../common/request.js"

module.exports = {
  getseasList(param, contractType, highSeasType) {

    // 集团
    if (highSeasType == 2) {
      if (contractType == 1) { // 个人
        return request('post', '/wtcrm/seasPerson/pageGroupSeas', param)
      } else { // 单位
        return request('post', '/wtcrm/seasCompany/pageGroupSeas', param)
      }
      // 地区
    } else {
      if (contractType == 1) { // 个人
        return request('post', '/wtcrm/seasPerson/pageSectorSeas', param)
      } else { // 单位
        return request('post', '/wtcrm/seasCompany/pageSectorSeas', param)
      }
    }
  },
  // 公海详情
  getSeasClueDetail(id, contractType, highSeasType) {
    console.log(highSeasType);
    if (highSeasType == 2) { // 集团
      if (contractType == 1) { // 个人
        return request('get', `/wtcrm/seasPerson/getCluePerson?cluePersonId=${id}`)
      } else { // 单位
        return request('get', `/wtcrm/seasCompany/getClueCompany?clueCompanyId=${id}`)
      }
    } else { //  地区公海详情
      if (contractType == 1) { // 个人
        return request('get', `/wtcrm/seasPerson/getCluePerson?cluePersonId=${id}`)
      } else { // 单位
        return request('get', `/wtcrm/seasCompany/getClueCompany?clueCompanyId=${id}`)
      }
    }
  },
  // 订单记录
  getRetorderRecord(id, contractType) {
    if (contractType == 1) { // 个人
      return request('get', `/wtcrm/seasPerson/getCluePerson?cluePersonId=${id}`)
    } else { // 单位
      return request('get', `/wtcrm/seasCompany/getClueCompany?clueCompanyId=${id}`)
    }
  },
  // 集团公海单位
  getGroupUnit(id, contractType) {
    if (contractType == 1) { // 个人
      return request('get', `/wtcrm/seasPerson/getCluePerson?cluePersonId=${id}`)
    } else { // 单位
      return request('get', `/wtcrm/seasCompany/getClueCompany?clueCompanyId=${id}`)
    }
  },
  getParticulars(param) {
    return request('post', '/wtorder/tmOrder/page', param)
  },

  // 公海客户跟进
  getFollowUp(param) {
    return request('post', '/wtcrm/clueFollow/listClueFollowByClueId', param)
  },
  
  // 获取头像
  getUserImg(id) {
    return request('get', `/admin/user/getUserAvatarByUserId?userId=${id}`)
  },
  getClueRecords(obj, clueType) { //成交客户详情-线索记录
    if (clueType == 2) {
      return request('get', '/wtcrm/transactionCompany/listBindCompanyClue', obj)
    } else {
      return request('get', '/wtcrm/transactionPerson/listBindPersonClue', obj)
    }
  }, // 获取线索详情 clueType：1-单位（线索/客户） 0-个人（线索/客户
 

}