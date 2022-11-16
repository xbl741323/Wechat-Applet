// components/index/work-bench/work-bench.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userInfo: {
      type: Object
    },
    isLogin: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    bgUrl: "/image/index/img-CRM@2x.png",
    swiprList: [{
        workList: [{
            imgUrl: "/image/index/icon_creation@2x.png",
            title: "创建线索",
            path: "/personal/pages/my-clue/modify/modify"
          },
          {
            imgUrl: "/image/index/icon_see_about@2x.png",
            title: "查询客户",
            path: "/personal/pages/customer/search-list/search-list"
          },
          {
            imgUrl: "/image/index/icon_my_thread@2x.png",
            title: "我的线索",
            path: "/personal/pages/my-clue/list/list"
          },
          {
            imgUrl: "/image/index/icon_order_form@2x.png",
            title: "我的订单",
            path: "/personal/pages/my-order/list/list"
          },
          {
            imgUrl: "/image/index/icon_my_contract@2x.png",
            title: "我的合同",
            path: "/personal/pages/my-contract/list/index"
          },
          {
            imgUrl: "/image/index/icon_my_task@2x.png",
            title: "我的任务",
            path: ""
          }
        ],
      },
      {
        workList: [{
            imgUrl: "/image/index/icon_process@2x.png",
            title: "我的流程",
            path: "/personal/pages/my-process/list/list"
          },
          {
            imgUrl: "/image/index/icon_my_user@2x.png",
            title: "我的用户",
            path: "/personal/pages/my-user/list/list"
          },
          {
            imgUrl: "/image/index/icon_my_hk@2x.png",
            title: "我的回款",
            path: "/personal/pages/my-collection/home/home"
          },
          {
            imgUrl: "/image/index/icon_group@2x.png",
            title: "集团公海",
            path: `/personal/pages/my-seas/seas-region/seas-region?highSeasType=${2}`
          },
          {
            imgUrl: "/image/index/icon_region@2x.png",
            title: "地区公海",
            path: `/personal/pages/my-seas/seas-region/seas-region?highSeasType=${1}`
          },
        ],
      }
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 页面跳转
    skipToPage(e) {
      let item = e.currentTarget.dataset.item
      if (item.path != "") {
        wx.navigateTo({
          url: item.path,
        })
      }
    },
  }
})