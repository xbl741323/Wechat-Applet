// pages/my/my.js
Page({
    data:{
        userInfo: {},
        hasUserInfo: false,
    },
    getUserData(e){
      wx.getUserProfile({
        desc: '展示用户信息',
        success:(res)=>{
            console.log(res)
            this.setData({
                userInfo:res.userInfo,
                hasUserInfo:true
            })
        }
      })
    },
    onLoad(){
        console.log('初始化中')
    }
})
