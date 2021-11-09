// pages/account/account.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        accountList: [
            {
                title: "头像",
                value: ""
            },
            {
                title: "昵称",
                value: ""
            },
            {
                title: "性别",
                value: "男"
            },
            {
                title: "出身日期",
                value: "1998-12-23"
            },
            {
                title: "所在城市",
                value: "合肥"
            },
        ]
    },

    // 修改头像
    changeImage() {
        var _this = this;
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFilePaths
                let list = _this.data.accountList
                list[0].value = tempFilePaths[0]
                console.log(res)
                _this.setData({
                    accountList: list
                })
                wx.setStorageSync('avatarUrl', tempFilePaths[0])
                wx.showToast({
                    title: '修改成功！',
                })
            }
        })
    },

    // 修改用户信息
    editUser(){
        if (wx.getStorageSync('userInfo')) {
            let usreInfo = wx.getStorageSync('userInfo')
            let avatarUrl = wx.getStorageSync('avatarUrl')
            let list = this.data.accountList
            list[0].value = avatarUrl
            list[1].value = usreInfo.nickName
            this.setData({
                accountList: list
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       this.editUser()
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

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})