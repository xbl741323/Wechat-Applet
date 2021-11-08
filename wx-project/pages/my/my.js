// pages/my/my.js
import { formatTime } from '../../utils/util'
import { getTestData  } from '../../utils/api'
Page({
    data: {
        userInfo: {},
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
                    hasUserInfo: true
                })
                wx.setStorageSync('userInfo', res.userInfo)
            }
        })
    },
    getData() {
        getTestData().then((res)=>{
            console.log(res)
        })
        // wx.request({
        //     url: 'https://m.wotao.com/service/hotSearch/5',
        //     method: 'get',
        //     success: (res) => {
        //         console.log(res.data)
        //     }
        // })
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
    }
})
