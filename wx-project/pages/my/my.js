// pages/my/my.js
import { formatTime } from '../../utils/util'
import { getTestData } from '../../utils/api'
Page({
    data: {
        userInfo: {},
        avatarUrl: "",
        hasUserInfo: false,
    },
    toSkip(e) {
        let url = e.currentTarget.dataset.url
        if (url !== ""&&this.data.hasUserInfo) {
            wx.navigateTo({
                url: e.currentTarget.dataset.url,
            })
        }
    },
    layOut() {
        wx.showToast({
            title: "退出成功！",
            duration: 2000
        })
        wx.removeStorageSync('userInfo');
        this.setData({
            userInfo: {},
            hasUserInfo: false
        })
    },
    getUserData(e) {
        wx.getUserProfile({
            desc: '展示用户信息',
            success: (res) => {
                console.log(res)
                wx.showToast({
                    title: "登录成功！",
                    duration: 2000
                })
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true,
                    avatarUrl: res.userInfo.avatarUrl
                })
                wx.setStorageSync('userInfo', res.userInfo)
                wx.setStorageSync('avatarUrl', res.userInfo.avatarUrl)
            }
        })
    },
    getData() {
        console.log('初始化中')
        console.log(formatTime())
        console.log(wx.getStorageSync('userInfo'))
        if (wx.getStorageSync('userInfo')) {
            this.setData({
                userInfo: wx.getStorageSync('userInfo'),
                hasUserInfo: true
            })
        }
        if (wx.getStorageSync('avatarUrl')) {
            this.setData({
                avatarUrl: wx.getStorageSync('avatarUrl')
            })
        }
        getTestData().then((res) => {
            console.log(res)
        })
    },
    /**
    * 生命周期函数--监听页面加载
    */
    onLoad() {
        this.getData()
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
        this.getData()
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
