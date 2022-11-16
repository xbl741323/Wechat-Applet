// 订单类型
function getOrderType() {
  return [{
      text: '全部类型',
      value: null
    },
    {
      text: '项目申报',
      value: 1
    },
    {
      text: '知识产权',
      value: 2
    },
    {
      text: '工商注册',
      value: 7
    },
    {
      text: '财税服务',
      value: 8
    },
    {
      text: '融资上市',
      value: 9
    },
    {
      text: '法律服务',
      value: 10
    },
    {
      text: '软件开发',
      value: 11
    },
  ]
}

// 订单状态
function getOrderStatus() {
  return [{
      text: '全部状态',
      value: null
    },
    {
      text: '待付款',
      value: 0,
    },
    {
      text: '待签约',
      value: 1,
    },
    {
      text: '待开始',
      value: 2,
    },
    {
      text: '进行中',
      value: 3,
    },
    {
      text: '已完成',
      value: 4,
    },
    {
      text: '已关闭',
      value: 5,
    },
    {
      text: '已取消',
      value: 6,
    },
  ]
}
// 待生效订单状态
function getWaitOrderStatus() {
  return [{
      text: '全部状态',
      value: null
    },
    {
      text: '草稿',
      value: -2,
    },
    {
      text: '未生效',
      value: -1,
    },
    {
      text: '已失效',
      value: -3,
    },
    {
      text: '待审核',
      value: -4,
    },
    {
      text: '未通过',
      value: -5,
    },
  ]
}

// 会员订单状态
function getMemberOrderStatus() {
  return [{
      text: '全部状态',
      value: null
    },
    {
      text: '待付款',
      value: 0,
    },
    {
      text: '待生效',
      value: 2,
    },
    {
      text: '已生效',
      value: 1,
    },
    {
      text: '已到期',
      value: 3,
    },
  ]
}

// 课程订单状态
function getCourseOrderStatus() {
  return [{
      text: '全部状态',
      value: null
    },
    {
      text: '待付款',
      value: 0,
    },
    {
      text: '已付款',
      value: 2,
    },
    {
      text: '已取消',
      value: 4,
    },
    {
      text: '已删除',
      value: 1,
    },
  ]
}

// 订单尾款状态
function getTailStatus() {
  return [{
      text: '全部尾款',
      value: null
    },
    {
      text: '待定',
      value: 0,
    },
    {
      text: '待付款',
      value: 1,
    },
    {
      text: '已结清',
      value: 2,
    },
    {
      text: '无',
      value: 3,
    }
  ]
}
// 待生效订单尾款状态
function getWaitTailStatus() {
  return [{
      text: '全部尾款',
      value: null
    },
    {
      text: '待定',
      value: 0,
    },
    {
      text: '待付款',
      value: 1,
    },
    {
      text: '无',
      value: 2,
    }
  ]
}

// 获取规格属性数据
function getAttributeList(attributeList) {
  if (attributeList.length > 1) {
    return [
      attributeList[0][Object.keys(attributeList[0])],
      attributeList[1][Object.keys(attributeList[1])]
    ]
  } else {
    return [attributeList[0][Object.keys(attributeList[0])]]
  }
}

// 规格属性筛选值lebel
function getAttributeLabel(AttributeList, skuIndex) {
  var arrOne = []
  var arrTwo = []
  arrOne = AttributeList[0]
  var skuIndexList = skuIndex.split('_')
  if (skuIndexList.length > 1) {
    arrTwo = AttributeList[1]
    return [arrOne[parseInt(skuIndexList[0])], arrTwo[parseInt(skuIndexList[1])]].join('+')
  } else {
    return arrOne[parseInt(skuIndexList[0])]
  }
}

// 任务状态筛选

function filterTaskStatus(value) {
  return value == 0 ? '待开始' : value == 1 ? '进行中' : value == 2 ? '已完成' : value == -1 ? '已暂停' : value == -2 ? '已关闭' : ''
}

// 订单/产品类型
function category(value) {
  return value == 1 ? '项目申报' : value == 2 ? '知识产权' : value == 3 ? '专利' : value == 4 ? '版权' : value == 5 ? '商标' : value == 6 ? '其他' : value == 7 ? '工商注册' : value == 8 ? '财税服务' : value == 9 ? '融资上市' : value == 10 ? '法律服务' : value == 11 ? '软件开发' : ''
}

function getPatternOfPayment() {
  return [{
      text: '费用类型',
      value: null
    },
    {
      text: '代理费',
      value: 1
    },
    {
      text: '第三方费用',
      value: 2
    },
    {
      text: '服务费',
      value: 3
    },

  ]
}

function getTypeOfExpense() {
  return [{
      text: '支付方式',
      value: null
    },
    {
      text: '支付宝',
      value: 0
    },
    {
      text: '对公转账',
      value: 1
    },
    {
      text: '微信',
      value: 2
    },

  ]
}

module.exports = {
  getOrderType,
  getOrderStatus,
  getWaitOrderStatus,
  getTailStatus,
  getAttributeList,
  getAttributeLabel,
  getMemberOrderStatus,
  getCourseOrderStatus,
  getWaitTailStatus,
  filterTaskStatus,
  category,
  getPatternOfPayment,
  getTypeOfExpense,

}