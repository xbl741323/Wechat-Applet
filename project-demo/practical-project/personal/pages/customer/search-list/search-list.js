// personal/pages/customer/search-list/search-list.js
import {
  getClueList
} from "../../../../utils/api/clue"
import * as CodeMsg from "../../../../utils/common/codeMsg";
import {
  filterArea
} from "../../../../utils/clue/clue"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showStatus: false,
    loading: false,
    isPerson: false,
    reachStatus: false, // 是否触底加载更多数据
    newTotal: 0,
    clueType: 2, // 线索类型 1-个人 2-单位
    clueList: [],
    keyWords: "",
    currentPage: 1,
    pageSize: 20
  },
  // 清除关键词
  clearKerword() {
    this.setData({
      keyWords: "",
      clueList: []
    })
  },
  // 改变搜索内容
  changeKeywords(e) {
    let clueList = this.data.clueList
    this.setData({
      keyWords: e.detail.value.trim(),
      clueList: e.detail.value.trim() == '' ? [] : clueList,
      showStatus: false
    })
  },
  // 改变线索类型
  changeType() {
    let clueType = this.data.clueType
    this.setData({
      clueType: clueType == 1 ? 2 : 1
    })
    this.getList()
  },
  searchList() {
    let keyWords = this.data.keyWords
    this.setData({
      currentPage: 1,
      reachStatus: false
    })
    if (keyWords != '') {
      this.getList()
    }

  },
  // 获取线索列表
  getList() {
    let params = {
      key: this.data.keyWords,
      pageNo: this.data.currentPage,
      pageSize: this.data.pageSize,
    }
    getClueList(params, this.data.clueType).then(res => {
      if (res.code == CodeMsg.CODE_0) {
        let reachStatus = this.data.reachStatus
        let clueList = this.data.clueList
        let result = res.data.records
        result.forEach(item => {
          item.area = filterArea(item.orgAddress)
        })
        this.setData({
          clueList: reachStatus == true ? clueList.concat(result) : result,
          newTotal: res.data.total,
          reachStatus: false,
          loading: true,
          showStatus: true
        })
      }
    })
  },
  // 触底加载更多数据
  getReachList() {
    let clueList = this.data.clueList
    let newTotal = this.data.newTotal
    let currentPage = this.data.currentPage
    if (clueList.length < newTotal) {
      this.setData({
        reachStatus: true,
        currentPage: currentPage + 1
      })
      this.getList()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

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
    this.getReachList()
  },

  /**
   * 用户点击右上角分享
   */

})