// additional/pages/take-photo/take-photo.js
import Wxml2Canvas from 'wxml2canvas';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: '',
    shareMemberUrl: '',
    name: '',
  },
  // 进行拍照
  choosePhoto() {
    let that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        console.log(res, 'res')
        console.log(res.tempFiles[0].tempFilePath)
        that.setData({
          imgUrl: res.tempFiles[0].tempFilePath
        })
      },
      fail(err) {
        console.log(err)
        if (that.data.imgUrl == '') {
          that.submit()
        }
      },
      complete() {
        that.drawCanvas()
        wx.hideLoading({
          success: (res) => {},
        })
      }
    })
  },
  // 提交
  submit() {
    if (this.data.imgUrl != '') {
      wx.setStorageSync('followImg', this.data.shareMemberUrl)
    }
    wx.navigateBack({
      delta: 1,
    })
  },
  // 生成推广图
  drawCanvas() {
    let that = this
    const query = wx.createSelectorQuery().in(this);
    query.select('#draw-member-contain').fields({
      size: true,
      scrollOffset: true
    }, data => {
      let width = data.width;
      let height = data.height;
      this.width = width;
      this.height = height;
      that.draw()
    }).exec();
  },
  draw() {
    let that = this
    //创建wxml2canvas对象
    let drawImage = new Wxml2Canvas({
      element: 'member-share', // canvas节点的id,
      obj: that, // 在组件中使用时，需要传入当前组件的this
      width: this.width * 2, // 宽高
      height: this.height * 2,
      background: 'pink', // 默认背景色
      progress(percent) { // 绘制进度
      },
      finish(url) {
        console.log(url, "url")
        that.setData({
          shareMemberUrl: url
        })
      },
      error(res) {
        console.log(res);
      }
    }, this);
    let data = {
      //直接获取wxml数据
      list: [{
        type: 'wxml',
        class: '.member-cover, .img-sty, .member-code-contain, .member-text',
        limit: '.member-cover',
        x: -37,
        y: 0
      }]
    }
    //传入数据，画制canvas图片
    drawImage.draw(data, this);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(new Date().toLocaleString(),'打卡时间')
    if (options.name) {
      this.setData({
        name: options.name
      })
    }
    this.choosePhoto()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})