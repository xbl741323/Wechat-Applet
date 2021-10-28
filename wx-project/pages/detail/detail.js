// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    danmuList:[
      {
        text:'甘雨yyds',
        color:'#fff',
        time:1
      },
      {
        text:'甘雨yyds',
        color:'#fff',
        time:2
      },
      {
        text:'甘雨yyds',
        color:'#fff',
        time:3
      },
      {
        text:'甘雨yyds',
        color:'#fff',
        time:4
      },
      {
        text:'甘雨yyds',
        color:'#fff',
        time:5
      },
      {
        text:'甘雨yyds',
        color:'#fff',
        time:6
      },

    ],
    userInfo: {},
    //视频详情
    videoInfo: {
      "id": 0,
      "videoSrc": "http://shirtinycn.cn-gd.ufileos.com/%E4%BA%94%E5%8D%81%E9%9F%B3.mp4?UCloudPublicKey=TOKEN_af61cb55-9a4b-4fec-b9b5-48c87417e8f4&Signature=AFJhi4uVt%2BVyGbmohVdkobUBefA%3D&Expires=1886661951",
      "videoTitle": "【150骑英灵】不要眨眼！你根本不知道fgo可以有多帅！史上最宏大的FATE系列！命运冠位指定三周年纪念!",
      "author": "字幕君",
      "playCount": "24.9万",
      "commentCount": "1989",
      "date": "12-25"
    },
    othersVideo: [{
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
    }
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    //获取对应视频id
    let videoId = options.id
    console.log(wx.getStorageSync('userInfo'))
    if (wx.getStorageSync('userInfo')) {
      this.setData({
        userInfo: wx.getStorageSync('userInfo')
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})