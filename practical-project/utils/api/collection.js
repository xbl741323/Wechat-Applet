import {
  request
} from "../common/request.js"

module.exports = {
  getMyReturnedMoney(param, clueType) {
    // 线上回款
    if (clueType == 2) {
      console.log('线上');
      // personal
      return request('post', '/wtorder/online/receive/pageMyReceive', param)
    } else {
      console.log('线下');
      //  线下回款
      return request('get', '/wtcrm/personal/receive/page', param)
    }
  },
  //  查看图片
  getExamineImg(taskNo) {
    return request('get', `/wtcrm/rebuild/getTrTaskOrderByTaskNo/${taskNo}`)
  }
}