const request = function (_method, _url, data) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: _url,
            method: _method,
            data: data,
            success(res) {
                resolve(res.data)
            },
            fail(res) {
                reject(res)
            }
        })
    })
}

module.exports = {
    getTestData: () => {
        return request('get', 'https://m.wotao.com/service/hotSearch/5')
    }
}