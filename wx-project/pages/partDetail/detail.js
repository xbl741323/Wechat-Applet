// pages/partDetail/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isCreate:true,
        titleList: [{
            title: "推荐"
        },
        {
            title: "国产动画"
        },
        {
            title: "番剧"
        },
        {
            title: "连载动画"
        },
        {
            title: "完结动画"
        },
        {
            title: "官方延伸"
        },
        {
            title: "番外"
        }
        ],
        imgList: [{
            imgUrl: "https://static-tst.wotao.com/icon/head/c4db1baacee04b10808a1cf319a26ac0.jpg",
            title: "【150骑英灵】不要眨眼！你根本不知道fgo可以有多帅！史上最宏大的FATE系列！命运冠位指定三周年纪念!",
            type: "哔哩哔哩纪录片",
            viewCount: "547万",
            commentCount: "3.4万"
        },
        {
            imgUrl: "https://static-tst.wotao.com/icon/head/c4db1baacee04b10808a1cf319a26ac0.jpg",
            title: "【150骑英灵】不要眨眼！你根本不知道fgo可以有多帅！史上最宏大的FATE系列！命运冠位指定三周年纪念!",
            type: "哔哩哔哩纪录片",
            viewCount: "547万",
            commentCount: "3.4万"
        },
        {
            imgUrl: "https://static-tst.wotao.com/icon/head/c4db1baacee04b10808a1cf319a26ac0.jpg",
            title: "【150骑英灵】不要眨眼！你根本不知道fgo可以有多帅！史上最宏大的FATE系列！命运冠位指定三周年纪念!",
            type: "哔哩哔哩纪录片",
            viewCount: "547万",
            commentCount: "3.4万"
        },
        {
            imgUrl: "https://static-tst.wotao.com/icon/head/c4db1baacee04b10808a1cf319a26ac0.jpg",
            title: "【150骑英灵】不要眨眼！你根本不知道fgo可以有多帅！史上最宏大的FATE系列！命运冠位指定三周年纪念!",
            type: "哔哩哔哩纪录片",
            viewCount: "547万",
            commentCount: "3.4万"
        },
        {
            imgUrl: "https://static-tst.wotao.com/icon/head/c4db1baacee04b10808a1cf319a26ac0.jpg",
            title: "【150骑英灵】不要眨眼！你根本不知道fgo可以有多帅！史上最宏大的FATE系列！命运冠位指定三周年纪念!",
            type: "哔哩哔哩纪录片",
            viewCount: "547万",
            commentCount: "3.4万"
        },
        {
            imgUrl: "https://static-tst.wotao.com/icon/head/c4db1baacee04b10808a1cf319a26ac0.jpg",
            title: "【150骑英灵】不要眨眼！你根本不知道fgo可以有多帅！史上最宏大的FATE系列！命运冠位指定三周年纪念!",
            type: "哔哩哔哩纪录片",
            viewCount: "547万",
            commentCount: "3.4万"
        },
        {
            imgUrl: "https://static-tst.wotao.com/icon/head/c4db1baacee04b10808a1cf319a26ac0.jpg",
            title: "【150骑英灵】不要眨眼！你根本不知道fgo可以有多帅！史上最宏大的FATE系列！命运冠位指定三周年纪念!",
            type: "哔哩哔哩纪录片",
            viewCount: "547万",
            commentCount: "3.4万"
        },
        {
            imgUrl: "https://static-tst.wotao.com/icon/head/c4db1baacee04b10808a1cf319a26ac0.jpg",
            title: "【150骑英灵】不要眨眼！你根本不知道fgo可以有多帅！史上最宏大的FATE系列！命运冠位指定三周年纪念!",
            type: "哔哩哔哩纪录片",
            viewCount: "547万",
            commentCount: "3.4万"
        },
        {
            imgUrl: "https://static-tst.wotao.com/icon/head/c4db1baacee04b10808a1cf319a26ac0.jpg",
            title: "【150骑英灵】不要眨眼！你根本不知道fgo可以有多帅！史上最宏大的FATE系列！命运冠位指定三周年纪念!",
            type: "哔哩哔哩纪录片",
            viewCount: "547万",
            commentCount: "3.4万"
        },
        ]
    },
    removeChild(){
        console.log("tid")
        this.setData({
            isCreate:false
        })
    },

    changeTitle(e) {
        console.log(e.detail)
        console.log(this.selectComponent('#title').data)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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