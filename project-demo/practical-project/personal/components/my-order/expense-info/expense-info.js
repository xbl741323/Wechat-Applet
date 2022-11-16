// personal/components/my-order/expense-info/expense-info.js
import {
  getPayUrl
} from "../../../../utils/api/order"
import * as CodeMsg from "../../../../utils/common/codeMsg";
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    payList: {
      type: Array
    },
    orderInfo: {
      type: Object,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imageUrl: app.globalData.imageURL,
    showPay: false,
    payUrl: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showPayRecords() {
      this.setData({
        showPay: true
      })
      this.getPayData()
    },
    onClickHide() {
      this.setData({
        showPay: false
      })
    },
    // 获取支付凭证
    getPayData() {
      let params = {
        taskNo: this.data.payList[0].tradeNo
      }
      getPayUrl(params).then(res => {
        if (res.code == CodeMsg.CODE_0) {
          this.setData({
            payUrl: res.data.voucherUrl
          })
        }
      })
    },
  }
})