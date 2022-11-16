// personal/pages/my-clue/list/list.js
import {
  getMyClueList,
  allotBelong
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
    allotInfo: { // 分配对象
      type: "", // 分配类型 0-分配线索归属 1-分配业务员
      id: "" // 分配的线索id
    },
    loading: true,
    isPerson: true,
    reachStatus: false, // 是否触底加载更多数据
    newTotal: 0,
    clueType: 2, // 线索类型 1-个人 2-单位
    clueList: [],
    keyWords: "",
    currentPage: 1,
    pageSize: 10
  },
  // 清除关键词
  clearKerword() {
    this.setData({
      keyWords: "",
      currentPage: 1,
      reachStatus: false
    })
    this.getList()
  },
  // 显示员工选择框
  showEmpSheet(e) {
    console.log(e, "输出时代大厦")
    this.setData({
      allotInfo: e.detail
    })
    this.selectComponent('#query-emp').show()
  },
  // 选择员工
  selectEmp(e) {
    console.log(e)
    let empInfo = e.detail
    this.allot(empInfo)
  },
  // 分配 type：0-分配线索归属 1-分配业务员
  allot(empInfo) {
    console.log(empInfo, "empInfo")
    let type = this.data.allotInfo.type
    let id = this.data.allotInfo.id
    let clueType = this.data.clueType
    let param = {
      clueEmpId: empInfo.userId, // 指定员工id
      clueEmpName: empInfo.name, // 指定员工名称
      clueEmpNo: empInfo.number, // 指定员工Number
      clueEmpDeptId: empInfo.deptId, // 指定员工部门id
      clueEmpDeptName: empInfo.deptName, // 指定员工部门名称
      clueEmpDeptNo: empInfo.deptNumber, // 指定员工部门Number
      clueIdList: [id], // 待分配线索ID列表
    };
    allotBelong(param, type, clueType).then((res) => {
      if (res.code == CodeMsg.CODE_0) {
        wx.showToast({
          icon: "success",
          title: '分配成功！',
        })
        this.searchList()
      } else {
        wx.showToast({
          icon: "none",
          title: res.msg,
        })
      }
    });
  },
  // 改变搜索内容
  changeKeywords(e) {
    this.setData({
      keyWords: e.detail.value.trim(),
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
    this.setData({
      currentPage: 1,
      reachStatus: false
    })
    this.getList()
  },
  // 子组件通知父组件刷新页面
  refresh() {
    this.searchList()
  },
  // 获取我的线索列表
  getList() {
    let params = {
      key: this.data.keyWords,
      pageNo: this.data.currentPage,
      pageSize: this.data.pageSize,
      sortField: 'createTime',
      sortType: 'desc'
    }
    getMyClueList(params, this.data.clueType).then(res => {
      if (res.code == CodeMsg.CODE_0) {
        let reachStatus = this.data.reachStatus
        let clueList = this.data.clueList
        let result = res.data.records
        result.forEach(item => {
          item.area = filterArea(item.orgAddress)
        })
        this.setData({
          clueList: reachStatus == true ? clueList.concat(result) : result,
          reachStatus: false,
          newTotal: res.data.total,
          loading: true
        })
        wx.stopPullDownRefresh()
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
  onLoad(options) {
    if (wx.getStorageSync('userInfo')) {
      this.getList()
    }
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
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.refresh()
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