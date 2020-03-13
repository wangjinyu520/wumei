// const API_BASE_URL = "http://10.20.11.252:8080/wumei-server"
// const API_BASE_URL = "http://101.133.164.180:8080/wumei-server"
const API_BASE_URL = "https://www.techwells.com/wumei-server";
const request = (url, method, data) => {
  let _url = API_BASE_URL + url
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: method,
      data: data,
      dataType: 'json',
      header: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      success(res) {
        resolve(res.data)
      },
      fail(error) {
        reject(error)
      },
      complete(a) {
        //加载完成
      }

    })
  })
}

module.exports = {
  request,
  //实名认证
  addAuthentication: (data) => {
    return request("/authentication/addAuthentication", 'post', data)
  },
  // 大师认证
  addTechnology: (data) => {
    return request("/technology/addTechnology", 'post', data)
  },
  // 获取技术人员类型
  getTechnologyTypeList: (data) => {
    return request("/technologyType/getTechnologyTypeList", 'get', data)
  },
  // 获取大师的详细信息
  getDetailInfo: (data) => {
    return request("/technology/getTechnologyInfo", 'get', data)
  },
  // 编辑大师的详细信息
  modifyTechnology: (data) => {
    return request("/technology/modifyTechnology", 'post', data)
  },
  // 获取编辑大师的详细信息
  getTechnologyCaseInfo: (data) => {
    return request("/technologyCase/getTechnologyCaseInfo", 'get', data)
  },
  // 编辑大师案例的详细信息
  modifyTechnologyCase: (data) => {
    return request("/technologyCase/modifyTechnologyCase", 'post', data)
  },
  // 删除技术人员工作案例
  deleteTechnologyCase: (data) => {
    return request("/technologyCase/deleteTechnologyCase", 'get', data)
  },
  // 添加技术人员工作案例
  addTechnologyCase: (data) => {
    return request("/technologyCase/addTechnologyCase", 'post', data)
  },

}