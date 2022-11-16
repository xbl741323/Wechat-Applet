// pages/product/product.js
const app = getApp();
import {
  getProType,
  getNewProduct,
  getAttributeList,
  getProjectAttribute
} from "../../utils/api/product"
import {
  checkUrl
} from "../../utils/common/utils"
Page({
  data: {
    areaList: [], // 地区数据列表
    keyWords: "", // 产品标题关键字
    // 选择的产品id（如选择的是二级分类的筛选项，显示对应二级分类id值）
    cProId: "",
    reachStatus: false, //是否触底加载更多数据
    openFilter: false, // 是否显示遮罩options
    cFilterId: 0,
    showTop: false,
    newTotal: 0, // 用于上拉加载显示判断
    page: 1,
    pageSize: 20,
    newProductList: [],
    newIndex: 0,
    province: "国家级",
    provinceId: 100000,
    contentHeight: (wx.getStorageSync('windowHeight') - wx.getStorageSync('statusBarHeight') - wx.getStorageSync('navigationBarHeight') - 5) + 'px', //5:顶部高度的padding-bottom:5px
    serviceList: [], // 左侧产品栏
    classFilter: [], // 对应产品筛选类（包含二级分类+属性）
    optionList: [], // 筛选数属性显示option集合
    list: "",
    searchCode: "0", //0-项目申报（某些地方0-知识产权，真是头疼）
    projectList: [],
    propertyList: [],
    copyrightList: "",
    patentList: "",
    trademarkList: "",
    otherList: "",
    isLoading: true, //防抖开关 防止用户不停的下拉
  },
  // 清除关键词
  clearKerword() {
    this.setData({
      keyWords: "",
    })
    this.searchList()
  },
  // 产品关键字标题搜索
  changeKeywords(e) {
    this.setData({
      keyWords: e.detail.value.trim()
    })
  },
  // 跳转到全局搜索页面
  searchList() {
    this.setData({
      page: 1,
      reachStatus: false
    })
    this.getProList()
  },
  // 关闭遮罩层
  closeTip() {
    this.setData({
      openFilter: false
    })
  },
  // 新产品类型选择
  changeNew(e) {
    let item = e.currentTarget.dataset.item
    let index = e.currentTarget.dataset.index
    this.setData({
      cFilterId: index,
      openFilter: true,
      page: 1,
      optionList: item.child
    })
    // 点击属性获取option数据 isAttr：true-是属性 false-是二级分类
    if (item.isAttr) {
      this.getProAttrData(false, item.id)
    }
  },
  // （分类+属性）option筛选赋值
  changeOption(e) {
    let item = e.currentTarget.dataset.item
    let cFilterId = this.data.cFilterId
    let newIndex = this.data.newIndex
    let serviceList = this.data.serviceList
    let classFilter = this.data.classFilter
    let classFilterItem = classFilter[cFilterId]
    let cId = serviceList[newIndex].id
    if (item == null) {
      classFilter[cFilterId].selectChildId = ''
      classFilter[cFilterId].attributeName = classFilterItem.isAttr == true ? classFilterItem.defaultName : '分类'
      this.setData({
        classFilter: classFilter,
        cProId: cId
      })
      // 获取产品类表数据
      this.getProList()
    } else {
      classFilter[cFilterId].selectChildId = item.id
      classFilter[cFilterId].attributeName = item.categoryName
      this.setData({
        classFilter: classFilter,
        cProId: classFilterItem.isAttr == true ? cId : item.id
      })
      // 获取产品类表数据
      this.getProList()
    }
  },
  // 回到页面顶部
  toTop() {
    app.toTop()
  },
  // 跳转到地区选择页
  skipToArea() {
    wx.navigateTo({
      url: "/product/pages/area-filter/area-filter",
    })
  },
  // 左侧栏产品栏切换
  bindChange(e) {
    // 回到顶部
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
    let index = e.currentTarget.dataset.index;
    let item = e.currentTarget.dataset.item;
    this.setData({
      cProId: item.id,
      newIndex: index,
      cFilterId: 0,
      openFilter: false,
      classFilter: item.child.length > 0 ? [{
        attributeName: "分类",
        isAttr: false,
        selectChildId: "", // 选择的option项Id
        child: item.child
      }] : [],
      newProductList: [],
      page: 1
    })
    this.getProList()
    this.getAttributeData([item.id])
  },
  // 获取选择的地区
  getSelectArea() {
    let provinceId = this.data.provinceId
    if (wx.getStorageSync('provinceId')) {
      if (wx.getStorageSync('provinceId') != provinceId) {
        // 仅地区切换时重置地区筛选条件
        this.resetAreaFilter()
      }
      this.setData({
        provinceId: wx.getStorageSync('provinceId')
      })
    } else {
      this.setData({
        provinceId: 100000
      })
    }
    if (wx.getStorageSync('province')) {
      this.setData({
        province: wx.getStorageSync('province')
      })
    } else {
      this.setData({
        province: "全国"
      })
    }
    wx.removeStorageSync('areaFilter')
    this.getLeftClassify()
  },
  // 获取左边分类栏数据
  getLeftClassify() {
    let classFilter = this.data.classFilter
    let newIndex = this.data.newIndex
    let params = {
      parentId: 0,
    }
    getProType(params).then(res => {
      if (res.code == 0 && res.data.length > 0) {
        classFilter = res.data[newIndex].child.length > 0 ? [{
          defaultName: "分类",
          attributeName: "分类",
          isAttr: false,
          selectChildId: "", // 选择的option项Id
          child: res.data[newIndex].child
        }] : []
        let cId = res.data[newIndex].id
        this.setData({
          serviceList: res.data,
          classFilter: classFilter,
          cProId: cId
        })
        // 获取产品列表数据
        this.getProList()
        // 获取产品筛选属性数据
        this.getAttributeData([cId])
      }
    })
  },
  // 获取筛选属性数据
  getAttributeData(categoryIds) {
    let classFilter = this.data.classFilter
    let params = {
      categoryIds: categoryIds
    }
    getAttributeList(params).then(res => {
      if (res.code == 0) {
        let attribute = res.data
        attribute.forEach(item => {
          item.selectChildId = ""
          item.isAttr = true
          item.defaultName = item.attributeName
        })
        this.setData({
          classFilter: classFilter.concat(attribute)
        })
      }
    })
  },
  // 获取项目申报筛选属性数据
  getProAttrData(status, id) {
    getProjectAttribute().then(res => {
      if (res.code == 1000) {
        let provinceId = this.data.provinceId
        if (status) {
          this.setData({
            areaList: res.data.area
          })
          // 获取重构产品列表数据总入口
          this.getLeftClassify()
        } else {
          // 获取地区数据
          let area = res.data.area.filter(item => {
            return item.value == provinceId
          })
          // 获取其他筛选项option数据
          let selection = res.data.selection.filter(item => {
            return item.categoryId == id
          })
          if (selection.length > 0) {
            selection[0].optionList.forEach(item => {
              item.categoryName = item.name
            })
          }
          if (area.length > 0) {
            area[0].children.forEach(item => {
              item.categoryName = item.label
              item.id = item.value
            })
            this.setData({
              optionList: id == 1 ? (provinceId == "100000" ? area[0].children.slice(0, 1) : area[0].children) : selection[0].optionList
            })
          } else {
            let options = res.data.area[0].children.slice(0, 1)
            options.forEach(item => {
              item.categoryName = item.label
              item.id = item.value
            })
            this.setData({
              optionList: id == 1 ? options : selection[0].options
            })
          }
        }
      }
    })
  },
  // 筛选地区
  filterArea(val) {
    let areaList = this.data.areaList
    let filterList = []
    let r = areaList.filter(item => {
      return item.value == val
    })
    if (r.length > 0) {
      r[0].children.forEach(item => {
        filterList.push(item.value)
      })
    }
    return filterList
  },
  // 获取产品列表数据
  getProList() {
    let id = this.data.cProId
    let classFilter = this.data.classFilter
    var attribute = []
    classFilter.forEach(item => {
      if ((item.id && (item.id == 1)) || (item.id && (item.id == 2) && item.selectChildId != '')) {
        attribute.push({
          attributeId: item.id,
          attributeValueList: item.selectChildId == '' ? [...new Set(["100001"].concat(this.filterArea(this.data.provinceId)))] : [item.selectChildId]
        })
      }
    })
    let params = {
      pageNo: this.data.page,
      pageSize: this.data.pageSize,
      categoryId: id,
      status: "1",
      spuTitle: this.data.keyWords
    }
    if (this.data.newIndex == 0) {
      params.generateAttributeList = attribute.length > 0 ? attribute : [{
        attributeId: 1,
        attributeValueList: [...new Set(["100001"].concat(this.filterArea(this.data.provinceId)))]
      }]
    }
    getNewProduct(params).then(res => {
      if (res.code == 0) {
        let result = res.data.records
        result.forEach(item => {
          item.urlInfo = checkUrl(item.imageUrl)
        })
        var list = this.data.newProductList
        if (this.data.page == 1) {
          list = []
        }
        list = [...list, ...res.data.records]
        if (list.length < res.data.total) {
          this.setData({
            page: this.data.page + 1,
            isLoading: true
          })
        } else {
          this.setData({
            isLoading: false
          })
        }
        this.setData({
          newProductList: list,
          newTotal: res.data.total
        })
        wx.setStorageSync('productInfo', list)
      }
      wx.hideLoading({
        success: (res) => {}
      })
    })
  },
  // 重置地区筛选数据
  resetAreaFilter() {
    let classFilter = this.data.classFilter
    classFilter.forEach(item => {
      if (item.id == 1) {
        item.selectChildId = ""
        item.attributeName = "地区"
      }
    })
    this.setData({
      classFilter: classFilter
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.isLoading) {
      this.setData({
        isLoading: false
      })
      this.getProList()
    }
  },
  //监听页面滑动
  onPageScroll(e) {
    var that = this;
    if (e.scrollTop > 0) {
      that.setData({
        showTop: true
      })
    } else {
      that.setData({
        showTop: false
      })
    }
  },
  // 修改tabbar index
  changeTabbar() {
    let islogin = wx.getStorageSync('userInfo') ? true : false
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1,
        isLogin: islogin
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取地区数据
    this.getProAttrData(true)
    if (options.type) {
      this.setData({
        newIndex: options.type,
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
    this.changeTabbar()
    if (wx.getStorageSync('areaFilter')) {
      this.setData({
        page: 1,
        newProductList: []
      })
      // 获取当前定位地区数据
      this.getSelectArea()
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      openFilter: false
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},
})