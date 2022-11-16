// product/pages/area-filter/area-filter.js
import {
  getProjectAttribute
} from "../../../utils/api/product"
import * as CodeMsg from "../../../utils/common/codeMsg";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    staticCity: "国家级",
    cityList: [],
  },
  // 返回产品页
  refreshTo(e) {
    let item = e.currentTarget.dataset.item
    if (item.value != null) {
      wx.setStorageSync('province', item.label);
      wx.setStorageSync('provinceId', item.value);
      wx.setStorageSync('areaFilter', true);
      wx.navigateBack({
        delta: 1
      })
    }
  },
  // 获取地区数据
  getAreaList() {
    getProjectAttribute().then(res => {
      if (res.code == CodeMsg.CODE_1000) {
        this.setData({
          cityList: res.data.area
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getAreaList()
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
    if (wx.getStorageSync('province')) {
      this.setData({
        staticCity: wx.getStorageSync('province'),
      });
    }
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