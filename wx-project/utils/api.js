const request = function (params) {
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: 'https://m.wotao.com/service/' + params.url,
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
            url: 'hotSearch/5',
            method: 'get'
        })
    }
}