// personal/components/seas-region/billing-information/billing-information.js
const app = getApp();
import {
  getUserImg,
  getFollowUp // 获取头像
} from '../../../../utils/api/seas'
import {
  filterFollowType
} from '../../../../utils/clue/clue'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

    clueInfo: {
      type: Object
    },
    userInfo: {
      type: Object
    },
    clueType: {
      type: Number
    },
    clueId: {
      type: Number
    },
    highSeasType: {
      type: Number
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    baseUrl: app.globalData.webUrl,
    // userInfo: wx.getStorageSync('userInfo'),
    state: false,
    FollowUpListArr: [],
    total: 0,
    reachStatus: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getList() {
      console.log('ddddd');
      let param = {
        activityType: 0,
        clueId: this.data.clueId,
        activityType: 0,
        clueType: this.data.clueType,
        key: "",
        pageNo: this.data.pageNo,
        pageSize: this.data.pageSize,
        userType: 0
      }
      getFollowUp(param).then(res => {
        this.setData({
          FollowUpListArr: res.data.records,
          total: res.data.total
        })
      })
    },
    // 触底加载
    getReachList() {
      let FollowUpListArr = this.data.FollowUpListArr
      let total = this.data.total
      let pageNo = this.data.pageNo
      if (FollowUpListArr.length < total) {
        this.setData({
          reachStatus: true,
          pageNo: pageNo + 1
        })
        this.getList()
      }
    },
    getLookAccessory(p) {
      let clueInfo = JSON.stringify(
        p.currentTarget.dataset.val
      )
      wx.navigateTo({
        url: `/personal/components/seas-region/follow-records/follow-records?FollowUpListObj=${clueInfo}`
      })
    }
  }
})