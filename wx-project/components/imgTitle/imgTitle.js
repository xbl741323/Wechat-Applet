// components/imgTitle/imgTitle.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        titleList: {
            type: Array,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        cIndex: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        changeIndex(e) {
            this.setData({
                cIndex: e.currentTarget.dataset.index
            })
            this.triggerEvent('change-title',this.data.cIndex)
        }
    }
})
