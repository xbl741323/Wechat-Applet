// pages/my/my.js
import { formatTime } from '../../utils/util'
import { getTestData } from '../../utils/api'
Page({
    data: {
        userInfo: {},
        avatarUrl:"",
        hasUserInfo: false,
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
                    avatarUrl:res.userInfo.avatarUrl
                })
                wx.setStorageSync('userInfo', res.userInfo)
                wx.setStorageSync('avatarUrl', res.userInfo.avatarUrl)
            }
        })
    },
    changeImage() {
        var _this = this;
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFilePaths
                console.log(res)
                _this.setData({
                    avatarUrl:tempFilePaths[0]
                })
                wx.setStorageSync('avatarUrl', tempFilePaths[0])
                wx.showToast({
                  title: '修改成功！',
                })
            }
        })
    },
    getData() {
        getTestData().then((res) => {
            console.log(res)
        })
    },
    onLoad() {
        this.getData()
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
    }
})
