// pages/partition/partition.js
Page({
    data: {
        classify: [
            {
                icon: "../../image/fanju.png",
                url: "",
                title: "番剧"
            },
            {
                icon: "../../image/guochuang.png",
                url: "",
                title: "国创"
            },
            {
                icon: "../../image/jilupian.png",
                url: "",
                title: "纪录片"
            },
            {
                icon: "../../image/donghua.png",
                url: "",
                title: "动画"
            },
            {
                icon: "../../image/yingyue.png",
                url: "",
                title: "音乐"
            },
            {
                icon: "../../image/wudao.png",
                url: "",
                title: "舞蹈"
            },
            {
                icon: "../../image/youxi.png",
                url: "",
                title: "游戏"
            },
            {
                icon: "../../image/zhishi.png",
                url: "",
                title: "知识"
            },
            {
                icon: "../../image/keji.png",
                url: "",
                title: "科技"
            },
            {
                icon: "../../image/yundong.png",
                url: "",
                title: "运动"
            },
            {
                icon: "../../image/qiche.png",
                url: "",
                title: "汽车"
            },
            {
                icon: "../../image/shenhuo.png",
                url: "",
                title: "生活"
            },
            {
                icon: "../../image/meishi.png",
                url: "",
                title: "美食"
            },
            {
                icon: "../../image/dongwuyuan.png",
                url: "",
                title: "动物园"
            },
            {
                icon: "../../image/guichu.png",
                url: "",
                title: "鬼畜"
            },
            {
                icon: "../../image/shishang.png",
                url: "",
                title: "时尚"
            },
            {
                icon: "../../image/yule.png",
                url: "",
                title: "娱乐"
            },
            {
                icon: "../../image/yingshi.png",
                url: "",
                title: "影视"
            },
            {
                icon: "../../image/dianying.png",
                url: "",
                title: "电影"
            },
            {
                icon: "../../image/dianshiju.png",
                url: "",
                title: "电视剧"
            },
            {
                icon: "../../image/youxisaishi.png",
                url: "",
                title: "游戏赛事"
            },
        ]
    },
    toDetail(e) {
        let params = e.currentTarget.dataset.index
        let data = JSON.stringify(params)
        wx.navigateTo({
            url: `/pages/partDetail/detail?data=${data}`,
        })

        // 关闭当前页面并跳转到对应路由
        // wx.redirectTo({
        //   url: '/pages/partDetail/detail'
        // })

        // 跳转tabbar指定路由
        // wx.switchTab({
        //   url: '/pages/index/index',
        // })
    },
})
