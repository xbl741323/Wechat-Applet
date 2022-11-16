// personal/pages/my-order/generate-order/show-code/show-code.js
const app = getApp();
import Wxml2Canvas from 'wxml2canvas';
import drawQrcode from 'weapp-qrcode'
import {
  getWxInviteCode,
} from "../../../../../utils/api/wtClass"
import * as CodeMsg from "../../../../../utils/common/codeMsg";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxCode: "",
    showCanvas: false,
    pageForm: 0, // 来源页面 0-发起订单页、编辑订单页 1-订单列表页
    genereteId: "",
    showCode: true,
    webUrl: app.globalData.webUrl,
    shareImgUrl: "",
    shareFixUrl: ""
  },
  // 获取微信邀请码
  getWxInvite(options) {
    getWxInviteCode().then(res => {
      if (res.code == CodeMsg.CODE_0) {
        this.setData({
          wxCode: res.data
        })
        this.setGenerateId(options)
      }
    })
  },
  // 生成二维码
  createNewCode() {
    let that = this
    let genereteId = this.data.genereteId
    let orderCodeInfo = {
      orderId: genereteId,
      code: this.data.wxCode
    }
    let r = JSON.stringify(orderCodeInfo)
    console.log(r, "rrrrrrrrr")
    drawQrcode({
      width: 190,
      height: 190,
      canvasId: 'myQrcode',
      text: `https://www.wotao.com/launch?orderCodeInfo=${r}`,
      image: {
        imageResource: "/personal/image/my-order/wt_logo.png",
        dx: 80,
        dy: 80,
        dWidth: 40,
        dHeight: 40
      },
      callback: function (e) {
        console.log(e, "e")
        setTimeout(() => {
          wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 400,
            height: 400,
            destWidth: 2000,
            destHeight: 2000,
            canvasId: 'myQrcode',
            success(res) {
              that.setData({
                shareImgUrl: res.tempFilePath
              })
              that.drawCanvas()
            },
            fail(res) {
              console.error(res)
            }
          })
        }, 500)
      }
    })
  },
  //动态获取画制作元素的宽高
  drawCanvas() {
    const query = wx.createSelectorQuery().in(this);
    query.select('#code-contain').fields({
      size: true,
      scrollOffset: true
    }, data => {
      let width = data.width;
      let height = data.height;
      this.width = width;
      this.height = height;
      this.draw()
    }).exec();
  },
  draw() {
    let that = this
    //创建wxml2canvas对象
    let drawImage = new Wxml2Canvas({
      element: 'share', // canvas节点的id,
      obj: that, // 在组件中使用时，需要传入当前组件的this
      width: this.width * 1.08, // 宽高
      height: this.height,
      background: '#ffffff', // 默认背景色
      progress(percent) { // 绘制进度
      },
      finish(url) {
        that.setData({
          shareFixUrl: url,
          showCanvas: true
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
        class: '.code-contain, .share-img-sty, .share-text',
        limit: '.code-contain',
        x: 0,
        y: 0
      }]
    }
    //传入数据，画制canvas图片
    drawImage.draw(data, this);
  },
  // 复制链接
  copyText() {
    let webUrl = this.data.webUrl
    let genereteId = this.data.genereteId
    let text = `你的订单已生成，请访问地址继续完成订单 ${webUrl}order/order-initInfo?id=${genereteId}`
    wx.setClipboardData({
      data: text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              icon: "none",
              title: '文案地址已复制，分享码加载中，请稍等！',
              duration: 3000
            })
          }
        })
      }
    })
  },
  // 微信分享
  wxShare() {
    wx.showShareImageMenu({
      path: this.data.shareFixUrl
    })
  },
  // 保存图片到相册
  saveImg() {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareFixUrl,
      success: function (res) {
        wx.showToast({
          title: '保存图片成功',
        })
      },
      fail: function (err) {
        wx.showToast({
          title: '保存图片失败',
        })
      }
    })
  },
  // 关闭弹窗，回到待生效订单页面
  closeSheet() {
    this.setData({
      showCode: false
    })
    let pageForm = this.data.pageForm
    pageForm == 0 ? this.toOrderList() : wx.navigateBack()
  },
  // 返回订单列表页
  toOrderList() {
    let orerListUrl = `/personal/pages/my-order/list/list?type=${3}`
    wx.navigateTo({
      url: `${orerListUrl}`,
    })
  },
  // 设置订单id
  setGenerateId(options) {
    if (options.id) {
      this.setData({
        genereteId: options.id
      })
      this.createNewCode()
      this.copyText()
    }
    if (options.pageForm) {
      this.setData({
        pageForm: options.pageForm
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.pageForm) {
      this.setData({
        pageForm: options.pageForm
      })
    }
    this.getWxInvite(options)
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
    this.getWxInvite()
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
    let showCode = this.data.showCode
    if (showCode) {
      this.data.pageForm == 0 ? this.toOrderList() : ''
    }
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

})