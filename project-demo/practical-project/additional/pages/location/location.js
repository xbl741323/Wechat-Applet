// additional/pages/location/location.js
const QQMapWX = require('../../../utils/common/qqmap-wx-jssdk.min.js'); // 引入SDK核心类
const qqmapsdk = new QQMapWX({
  key: '23YBZ-ATLCP-N3LDV-L6UZH-HNC5Q-EQB4C' // 卧涛腾讯KEY-实例化API核心类
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPermission: false, // 位置权限是否授权
    isPhotoPermission: false, // 相机权限是否授权
    chooseInfo: {}, // 业务员选择的位置信息
    defaultInfo: {}, // 业务员当前位置信息
    distance: 0,
    imgUrl: ""
  },
  // 根据经纬度计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
  getDistances(lat1, lng1, lat2, lng2) {
    let that = this
    qqmapsdk.calculateDistance({
      //mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行），不填默认：'walking',可不填
      mode: 'walking',
      //获取表单提交的经纬度并设置from和to参数（示例为string格式）
      from: lat1 + ',' + lng1, //若起点有数据则采用起点坐标，若为空默认当前地址
      to: lat2 + ',' + lng2, //终点坐标
      success: function (res) {
        console.log(res.result.elements[0], "输出距离")
        that.setData({
          distance: res.result.elements[0].distance
        })
      }
    }, )
  },
  // 获取业务员选择的定位信息
  chooseLocation() {
    if (this.data.isPermission) {
      let that = this
      wx.chooseLocation({
        success: (res) => {
          that.setData({
            chooseInfo: res
          })
          let lat1 = that.data.chooseInfo.latitude
          let lon1 = that.data.chooseInfo.longitude
          let lat2 = that.data.defaultInfo.location.lat
          let lon2 = that.data.defaultInfo.location.lng
          that.getDistances(lat1, lon1, lat2, lon2)
          console.log(that.data.chooseInfo, "业务员选择的定位信息")
        }
      })
    } else {
      this.checkLocation()
    }
  },
  // 位置权限授权
  checkLocation() {
    let that = this
    wx.getSetting({
      success: (res) => {
        console.log(res, 'res')
        if (res.authSetting['scope.userLocation'] === false) { // 非初始化进入该页面,且未授权(之前授权拒绝)
          wx.showModal({
            title: '是否授权当前位置',
            content: '请确认授权，您的位置信息将用于小程序打卡签到功能',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '授权失败',
                  icon: 'error',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    console.log(dataAu, 'dataAu')
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      that.setData({
                        isPermission: true
                      })
                      //再次授权，调用getLocationt的API
                      that.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'success',
                        duration: 1000
                      })
                      that.setData({
                        isPermission: false
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] === true) { //初始化进入
          that.getLocation();
          that.setData({
            isPermission: true
          })
        }
      }
    });
  },
  // 获取当前业务员位置信息
  getLocation() {
    let that = this
    qqmapsdk.reverseGeocoder({
      success: function (res) {
        that.setData({
          defaultInfo: res.result
        })
        console.log(that.data.defaultInfo, '业务员当前定位信息')
      },
      fail: function (res) {},
      complete: function (res) {}
    })
  },
  // 打卡拍照
  takePhoto() {
    let name = this.data.chooseInfo.name
    let defaultName = this.data.defaultInfo.formatted_addresses.recommend
    wx.navigateTo({
      url: `/additional/pages/take-photo/take-photo?name=${name!=null?name:defaultName}`,
    })
  },
  // 获取打卡图片
  setFollowImg() {
    if (wx.getStorageSync('followImg')) {
      this.setData({
        imgUrl: wx.getStorageSync('followImg')
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.checkLocation()
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
    this.setFollowImg()
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
    wx.removeStorageSync('followImg')
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