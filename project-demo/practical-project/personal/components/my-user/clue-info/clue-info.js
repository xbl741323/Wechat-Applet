// personal/components/my-user/clue-info/clue-info.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    clueInfo: {
      type: Object
    },
    clueType: {
      type: Number
    },
    transInfo: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 打电话
    phoneCall(e) {
      let phone = e.currentTarget.dataset.phone
      wx.makePhoneCall({
        phoneNumber: phone,
      })
    }
  },
})