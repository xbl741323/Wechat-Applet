const request = function (params) {
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            success: (res) => {
                resolve(res.data)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}

module.exports = {
    getTestData: () => {
        return request({
            url:'https://m.wotao.com/service/hotSearch/5',
            method:'get'
        })
    }
}