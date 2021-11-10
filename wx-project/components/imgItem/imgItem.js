// components/imgItem/imgItem.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        imgInfo: {
            type: Object,
            value: {}
        }
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        previewImg(e) {
            let url = e.currentTarget.dataset.url
            // 预览图片
            wx.previewImage({
                current: url,
                urls: [url],
            })
        }
    }
})
