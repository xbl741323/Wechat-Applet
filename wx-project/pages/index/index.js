// index.js
// 获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //被点击的首页导航的菜单的索引
    currentIndexNav: 0,
    //首页导航数据
    navList: [{
      "text": "首页",
      "id": 0
    },
    {
      "text": "动画",
      "id": 0
    },
    {
      "text": "番剧",
      "id": 0
    },
    {
      "text": "国创",
      "id": 0
    },
    {
      "text": "音乐",
      "id": 0
    },
    {
      "text": "舞蹈",
      "id": 0
    },
    {
      "text": "科技",
      "id": 0
    },
    {
      "text": "游戏",
      "id": 0
    },
    {
      "text": "娱乐",
      "id": 0
    },
    {
      "text": "鬼畜",
      "id": 0
    },
    {
      "text": "电影",
      "id": 0
    },
    {
      "text": "电视剧",
      "id": 0
    },
    {
      "text": "纪录片",
      "id": 0
    },
    {
      "text": "影视",
      "id": 0
    },
    {
      "text": "时尚",
      "id": 0
    },
    {
      "text": "生活",
      "id": 0
    },
    {
      "text": "广告",
      "id": 0
    }, {
      "text": "直播",
      "id": 0
    },
    {
      "text": "相册",
      "id": 0
    }],
    //轮播图数据
    swiperList: [
      {
        "url": "https://i0.hdslb.com/bfs/archive/042c1f77a19e81c024609bff69e8ebbd37a25803.jpg@880w_440h.jpg",
        "link": ""
      },
      {
        "url": "https://i0.hdslb.com/bfs/sycp/creative_img/201910/534998f20a27a1dcfb66d9e733996676.jpg@880w_440h.jpg",
        "link": ""
      },
      {
        "url": "https://i0.hdslb.com/bfs/sycp/creative_img/201910/6567c1c482a1ce136b9bfa42ca63e761.jpg@880w_440h.jpg",
        "link": ""
      },
      {
        "url": "https://i0.hdslb.com/bfs/archive/0f0d3a7b610ed6d8d25701a540c46729615f403d.jpg@880w_440h.jpg",
        "link": ""
      },
      {
        "url": "https://i0.hdslb.com/bfs/archive/f095fc009d04b46f6b6dc26273e905499144e827.jpg@880w_440h.jpg",
        "link": ""
      }
    ],
    //视频展示数据
    videosList: [{
      "id": 0,
      "link": "",
      "imgSrc": "https://static-tst.wotao.com/icon/head/c4db1baacee04b10808a1cf319a26ac0.jpg",
      "desc": "【150骑英灵】不要眨眼！你根本不知道fgo可以有多帅！史上最宏大的FATE系列！命运冠位指定三周年纪念!",
      "playCount": "52.7万",
      "commentCount": "989",
      "videoSrc": ""
    },
    {
      "id": 1,
      "link": "",
      "imgSrc": "https://static-tst.wotao.com/icon/head/c4db1baacee04b10808a1cf319a26ac0.jpg",
      "desc": "每日亿遍！来自老婆们的甜蜜暴击，请自带血包",
      "playCount": "62.0万",
      "commentCount": "2959",
      "videoSrc": ""
    },
    {
      "id": 2,
      "link": "",
      "imgSrc": "https://static-tst.wotao.com/icon/head/c4db1baacee04b10808a1cf319a26ac0.jpg",
      "desc": "【AMV】辉夜大小姐想让痛痛飞走！| PainPainGoAway 辉夜完结纪念",
      "playCount": "52.7万",
      "commentCount": "989",
      "videoSrc": ""
    },
    {
      "id": 3,
      "link": "",
      "imgSrc": "https://static-tst.wotao.com/icon/head/c4db1baacee04b10808a1cf319a26ac0.jpg",
      "desc": "前方高能！！大型亲吻现场（合集）",
      "playCount": "52.7万",
      "commentCount": "989",
      "videoSrc": ""
    },
    {
      "id": 4,
      "link": "",
      "imgSrc": "https://static-tst.wotao.com/icon/head/c4db1baacee04b10808a1cf319a26ac0.jpg",
      "desc": "前方高萌，可爱真的可以为所欲为",
      "playCount": "52.7万",
      "commentCount": "989",
      "videoSrc": ""
    },
    {
      "id": 5,
      "link": "",
      "imgSrc": "https://static-tst.wotao.com/icon/head/c4db1baacee04b10808a1cf319a26ac0.jpg",
      "desc": "【勾指起誓】陪伴是最长情的告白，而守护是沉默的陪伴。",
      "playCount": "52.7万",
      "commentCount": "989",
      "videoSrc": ""
    },
    {
      "id": 6,
      "link": "",
      "imgSrc": "https://static-tst.wotao.com/icon/head/c4db1baacee04b10808a1cf319a26ac0.jpg",
      "desc": "【我英|轰爆】我要怎么说我不爱你（一丢丢背后注意+彩蛋高甜）",
      "playCount": "52.7万",
      "commentCount": "989",
      "videoSrc": ""
    },
    {
      "id": 7,
      "link": "",
      "imgSrc": "https://static-tst.wotao.com/icon/head/c4db1baacee04b10808a1cf319a26ac0.jpg",
      "desc": "【萌到升天】你看你看又开始了❤和澪一起随心所欲Mercy吧~",
      "playCount": "52.7万",
      "commentCount": "989",
      "videoSrc": ""
    }]
  },

  //点击导航首页按钮
  activeNav(e) {
    // console.log(e)
    this.setData({
      currentIndexNav: e.currentTarget.dataset.index
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("生命周期函数--监听页面加载")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("生命周期函数--监听页面初次渲染完成")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("生命周期函数--监听页面显示")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("生命周期函数--监听页面隐藏")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("生命周期函数--监听页面卸载")
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("页面下拉了！")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("页面上拉了！")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})