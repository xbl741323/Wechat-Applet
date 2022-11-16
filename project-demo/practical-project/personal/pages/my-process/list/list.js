// personal/pages/my-process/list/list.js
import {
  pageMyOrderTask,
  contractAuditListOfMy
} from "../../../../utils/api/process"
import {
  orderTypeData,
  typeData
} from "../../../../utils/common/transfer"
import { contractStatus, getOrderType } from "../../../../utils/common/contract";
import {
  getEmpOption
} from "../../../../utils/api/category"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    processType: 0,
    keyWords: "",
    orderType: "",
    filters: {
      type: 0, 
      orderType: null,
    },
    transferList: [],//我的流程-对公转账审批
    contractList: [],//我的流程-合同审批
    typeData: typeData(),
    orderTypeData: orderTypeData(),
    contractOrderTrpe: getOrderType(),
    show: true,
    empList: [],
    keyWord: "",
    value: [0],
    empInfo: {name: "待处理人",userId: ""},
    pageNo: 1,
    pageSize: 20,
    total: 0,
    reachStatus: false,
    totalTransfer: 0,
  },
  changeKeywords(e) {
    this.setData({
      keyWords: e.detail.value.trim()
    })
  },
  searchList() {
    this.setData({
      pageNo: 1,
    })
    this.getList()
  },
  allot() {
    this.setData({
      show: false,
      keyWord: ""
    })
  },
  // 关闭选择框
  close() {
    this.setData({
      show: true,
      keyWord: ""
    })
  },
  // 选择员工后关闭选择框
  confirm() {
    this.setData({
      show: true,
      pageNo: 1,
      reachStatus: false,
    })
    let empList = this.data.empList
    let index = this.data.value[0]
    if (empList.length > 0) {
      this.setData({
        empInfo: empList[index]
      })
    }
    this.getList()
  },
  changePType(e) {
    let filters = this.data.filters
    filters.type = e.detail
    this.setData({
      filters: filters,
      pageNo: 1,
      reachStatus: false,
    })
    this.getList()
  },
  changeOrderType(e) {
    let filters = this.data.filters
    filters.orderType = e.detail
    this.setData({
      filters: filters,
      pageNo: 1,
    })
    this.getList()
  },
  //获取流程列表
  getList() {
    switch (this.data.processType) {
      case 0: 
        this.getContractList()
        break;
      case 1: 
        this.getMyOrderTask()
        break;
    }
  },
  //获取合同列表
  getContractList() {
    let params = {
      categoryId: this.data.filters.orderType,
      keywords: this.data.keyWords,
      pageNo: this.data.pageNo,
      pageSize: this.data.pageSize,
      handlerId: this.data.empInfo.userId,
      taskStatus: this.data.filters.type,
    }
    contractAuditListOfMy(params).then(res=>{
      if (res.code == 0) {
        let reachStatus = this.data.reachStatus
        res.data.records.forEach(el => {
          el.contractStatus = contractStatus(el.taskStatus)
        });
        this.setData({
          contractList: reachStatus == true ? this.data.contractList.concat(res.data.records) : res.data.records,
          total: res.data.total,
          reachStatus: false,
        })
        wx.stopPullDownRefresh()
      }
    })
  },

  //获取对公转账列表
  getMyOrderTask(e) {
    if (e) {
      let params = {
        taskCurrentEmpId: this.data.empInfo.userId,
      }
      pageMyOrderTask(params).then(res => {
        if (res.code == 0) {
            this.setData({
              totalTransfer: res.data.total,
            })
          wx.stopPullDownRefresh()
        }
      })
    } else {
      let params = {
        categoryId: this.data.filters.orderType,
        keyWord: this.data.keyWords,
        pageNo: this.data.pageNo,
        pageSize: this.data.pageSize,
        taskCurrentEmpId: this.data.empInfo.userId,
        taskStatus: this.data.filters.type,
      }
      pageMyOrderTask(params).then(res => {
        if (res.code == 0) {
          let reachStatus = this.data.reachStatus
          if (this.data.processType == 1) {
            this.setData({
              transferList: reachStatus == true ? this.data.transferList.concat(res.data.records) : res.data.records,
              total: res.data.total,
              reachStatus: false,
            })
          }
          wx.stopPullDownRefresh()
        }
      })
    }
    
  },
  // 触底加载更多数据
  getReachList() {
    let newTotal = this.data.total
    let pageNo = this.data.pageNo
    if (this.data.transferList.length < newTotal) {
      this.setData({
        reachStatus: true,
        pageNo: pageNo + 1
      })
      this.getList()
    }
  },
  // 滚动切换员工
  changePicker(e) {
    this.setData({
      value: e.detail.value
    })
  },
  changeType() {
    let processType = this.data.processType
    if (processType == 0 && this.data.totalTransfer > 0) {
      let filters = this.data.filters
      filters.orderType = null
      this.setData({
        processType: 1,
        filters: filters,
      })
      this.getList();
    } else if (processType == 1) {
      let filters = this.data.filters
      filters.orderType = null
      this.setData({
        processType: 0,
        filters: filters,
      })
      this.getList();
    }
  },
  changeSearch(e) {
    this.setData({
      keyWord: e.detail.value.trim()
    })
    this.getEmpList()
  },
  // 根据姓名获取员工
  getEmpList() {
    let params = {
      name: this.data.keyWord
    }
    getEmpOption(params).then(res => {
      if (res.code == 0) {
        this.setData({
          empList: res.data
        })
      }
    })
  },

  clearKerword() {
    this.setData({
      keyWords: "",
      transferList: []
    })
    this.getList()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getEmpList()
    this.getMyOrderTask(1)
    this.getContractList()
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
    this.getReachList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})