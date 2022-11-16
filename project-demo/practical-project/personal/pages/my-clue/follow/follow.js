// personal/pages/my-clue/follow/follow.js
const app = getApp();
import {
  returnCategory
} from "../../../../utils/clue/clue"
import {
  followOperate
} from "../../../../utils/api/clue"
import * as CodeMsg from "../../../../utils/common/codeMsg";
import {
  throttle
} from "../../../../utils/common/utils"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    followId: "", // 编辑时的跟进id
    operateType: 0, // 0-创建 1-编辑
    fileList: [], // 上传附件列表
    uploadFileList: [], // 已上传文件列表
    showCalendar: false,
    followTypeList: [], // 跟进方式列表
    followInfo: {
      followType: null,
      followTypeId: null,
      followContent: "",
      followTime: "",
      productOther: ""
    },
    accessInfo: wx.getStorageSync('accessInfo'),
    clueType: 2, // 线索类型
    clueInfo: {}, // 线索对象
    selectProduct: [], // 选择跟进产品列表
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      }
      if (type === 'month') {
        return `${value}月`;
      }
      if (type === 'day') {
        return `${value}日`;
      }
      return value;
    },
  },
  // 修改跟进内容/其他产品 type: 0-其他产品 1-跟进内容
  changeInput(e) {
    let type = e.currentTarget.dataset.type
    let val = e.detail.value.trim()
    let followInfo = this.data.followInfo
    type == 1 ? followInfo.followContent = val : followInfo.productOther = val
    this.setData({
      followInfo: followInfo
    })
  },
  // 提交跟进-防重复提交
  throttleSubmit: throttle(function () {
    this.submitOperate()
  }, 2000),
  // 获取指定产品格式
  getProInfo() {
    let selectProduct = this.data.selectProduct
    let result = []
    selectProduct.forEach(item => {
      result.push({
        spuId: item.id, // 产品ID
        followSpuCode: item.spuCode, // 跟进产品编号
        followSpuName: item.spuTitle, // 跟进产品名称
      })
    })
    return result;
  },
  uploadImage(item, name) {
    let imgbase64 = 'data:image/png;base64,' + wx.getFileSystemManager().readFileSync(item.url, "base64")
    let uploadFileList = this.data.uploadFileList
    let that = this
    wx.uploadFile({
      filePath: item.url,
      name: 'file', //后台接收图片的字段
      url: app.globalData.baseURL + "/wtcrm/file/upload",
      method: "post",
      formData: imgbase64,
      header: {
        "Content-Type": "multipart/form-data",
        'Authorization': 'Bearer ' + that.data.accessInfo.access_token,
      },
      success(res) {
        let result = JSON.parse(res.data)
        if (result.code == CodeMsg.CODE_0) {
          uploadFileList.push({
            name: name,
            url: result.data,
          })
          that.setData({
            uploadFileList: uploadFileList
          })
        }
      }
    })
  },
  // 上传文件
  fixParams() {
    let fileList = this.data.fileList
    let clueInfo = this.data.clueInfo
    let clueType = this.data.clueType
    let followInfo = this.data.followInfo
    let selectProduct = this.data.selectProduct
    let params = {
      clueId: clueInfo.clueId, // 线索ID
      clueType: String(clueType), // 线索类型 1-个人 2-单位
      followTypeId: followInfo.followTypeId, // 跟进方式id
      followContent: followInfo.followContent, // 跟进内容
      nextFollowTime: followInfo.followTime == '' ? null : followInfo.followTime, // 下次跟进时间
      otherSpu: followInfo.productOther, // 其他产品
      clueFollowSpuList: selectProduct.length > 0 ? this.getProInfo() : null, // 跟进产品列表 max-3
      clueFollowFileList: null // 跟进附件列表 max-5
    }
    if (fileList.length > 0) {
      params.clueFollowFileList = this.data.uploadFileList
    }
    return params
  },
  submitOperate() {
    let followInfo = this.data.followInfo
    if (followInfo.followTypeId == null || followInfo.followContent == "") {
      wx.showToast({
        icon: "none",
        title: followInfo.followTypeId == null ? '请选择跟进方式！' : '请填写跟进内容！',
      })
    } else {
      let params = this.fixParams()
      let operateType = this.data.operateType
      if (operateType == 1) {
        params.id = this.data.followId
      }
      followOperate(params, operateType).then(res => {
        if (res.code == CodeMsg.CODE_0) {
          wx.showToast({
            icon: "success",
            title: operateType == 0 ? '跟进成功！' : '编辑成功！',
          })
          setTimeout(() => {
            wx.navigateBack()
          }, 500)
        }
      })
    }
  },
  // 删除图片
  deleteFile(e) {
    let index = e.detail.index
    let fileList = this.data.fileList
    let uploadFileList = this.data.uploadFileList
    fileList.splice(index, 1)
    uploadFileList.splice(index, 1)
    this.setData({
      fileList: fileList,
      uploadFileList: uploadFileList
    })
  },
  afterRead(e) {
    let fileList = this.data.fileList
    let temFileList = e.detail.file
    temFileList.forEach(item => {
      fileList.push({
        url: item.url,
        name: item.url.slice(11),
      })
      this.uploadImage(item, item.url.slice(11))
    })
    this.setData({
      fileList: fileList
    })
  },
  // 时间格式操作
  formatDate(date) {
    date = new Date(date);
    let year = date.getFullYear()
    let month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    let day = String(date.getDate()).length == 1 ? '0' + date.getDate() : date.getDate()
    return `${year}-${month}-${day}`;
  },
  // 确定选择时间
  onConfirm(e) {
    let date = e.detail
    let followInfo = this.data.followInfo
    followInfo.followTime = this.formatDate(date)
    this.setData({
      followInfo: followInfo
    })
    this.onClose()
  },
  // 关闭时间弹窗
  onClose() {
    this.setData({
      showCalendar: false
    })
  },
  // 展示时间弹窗
  bindShow() {
    this.setData({
      showCalendar: true
    })
  },
  // 修改跟进方式
  changeFollowType(e) {
    let index = Number(e.detail.value)
    let followInfo = this.data.followInfo
    let followTypeList = this.data.followTypeList
    followInfo.followType = followTypeList[index].name
    followInfo.followTypeId = followTypeList[index].id
    this.setData({
      followInfo: followInfo
    })
  },
  // 去产品显示页面
  toSelect() {
    wx.navigateTo({
      url: `/personal/pages/my-order/select-product/select-product?pageFrom=${1}`,
    })
  },
  // 选择产品后回显产品
  setSelectedPro() {
    if ((wx.getStorageSync('selectedPro') && this.data.selectProduct.length == 0) || wx.getStorageSync('addNewPro')) {
      wx.removeStorageSync('addNewPro')
      let selectedPro = wx.getStorageSync('selectedPro')
      this.setData({
        selectProduct: selectedPro,
      })
    }
  },
  // 设置线索信息
  setClueInfo(options) {
    if (options.clueInfo) {
      let r = JSON.parse(options.clueInfo)
      this.setData({
        clueType: options.clueType,
        clueInfo: r
      })
    }
    if (options.followInfo) {
      let r = JSON.parse(options.followInfo)
      this.setFollowInfo(r)
    }
  },
  // 跟进线索编辑回显
  setFollowInfo(r) {
    wx.setNavigationBarTitle({
      title: '跟进编辑',
    })
    let followInfo = this.data.followInfo
    let selectProduct = this.data.selectProduct
    r.clueFollowSpuList.forEach(item => {
      selectProduct.push({
        id: item.spuId,
        spuCode: item.followSpuCode,
        spuTitle: item.followSpuName
      })
    })
    let clueFollowFileList = []
    r.clueFollowFileList.forEach(item => {
      clueFollowFileList.push({
        followId: item.followId,
        name: item.name,
        url: app.globalData.imageURL + item.url
      })
    })
    followInfo.followTypeId = r.followTypeId
    followInfo.followType = r.followTypeName
    followInfo.followContent = r.followContent
    followInfo.followTime = r.nextFollowTime
    followInfo.productOther = r.otherSpu
    this.setData({
      followInfo: followInfo,
      selectProduct: selectProduct,
      operateType: 1,
      followId: r.id,
      fileList: clueFollowFileList,
      uploadFileList: r.clueFollowFileList,
    })
  },
  // 设置跟进方式
  setFollowType() {
    let optionList = returnCategory()[9].optionList
    this.setData({
      followTypeList: optionList
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setFollowType()
    this.setClueInfo(options)
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
    this.setSelectedPro()
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
    // 页面卸载时移除选择产品
    wx.removeStorageSync('selectedPro')
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