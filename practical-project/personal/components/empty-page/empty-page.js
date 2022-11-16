// personal/components/empty-page/empty-page.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pageForm: { // 引用页面 0-线索列表 1-订单列表 2-录入合同选择订单列表
      type: Number,
      value: 0
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
    toClueDetail() {
      wx.navigateTo({
        url: '/personal/pages/my-clue/modify/modify',
      })
    },
  }
})