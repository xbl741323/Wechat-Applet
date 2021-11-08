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
        cIndex: 0,
        count: 5,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        changeIndex(e) {
            this.setData({
                cIndex: e.currentTarget.dataset.index
            })
            this.triggerEvent('change-title', this.data.cIndex)
        }
    },
    lifetimes: {
        attached: function () {
            console.log("组件实例进入页面节点！")
            this.timer = setInterval(() => {
                if (this.data.count === 0) {
                    this.triggerEvent("remove-child")
                    return;
                }
                this.setData({
                    count: this.data.count - 1
                })
                console.log(this.data.count)
            }, 1000)
        },
        detached: function () {
            console.log("组件实例移除被页面节点移除时执行！")
            clearInterval(this.timer);
        }
    }
})
