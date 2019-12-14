const API_BASE_URL = "http://10.20.11.126:8080/wumei-server"

const request = (url, method, data) => {
  let _url = API_BASE_URL + url
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: method,
      data: data,
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

/*const urlList = {
  //刷新
  refreshTokeUrl: API_BASE_URL + '/refreshToke',
  //注册
  loginUrl: API_BASE_URL + '/wxappLogin',
}

module.exports = urlList;
*/

module.exports = {
  request,
  getregisterDetail: (data) => {
    return request('/register/getregisterDetail', 'get', data)
  },
  getMastersData: (data) => {
    return request("/technology/getTechnologyList", 'get', data)
  },
  getProduct: (data) => {
    return request("/technology/getTechnologyList", 'get', data)
  },
  getCommodity: (data) => {
    return request("/commodity/getCommodityList", 'get', data)
  },
  getActivity: (data) => {
    return request("/activity/getPopularActivityList", 'get', data)
  },
  getActivityList: (data) => {
    return request("/activity/getActivityList", 'get', data)
  },
  getAccount: (data) => {
    return request("/merchant/getMerchantAccount", 'get', data)
  },
  addReport: (data) => {
    return request("/report/addReport", 'get', data)
  },
  getCouponList: (data) => {
    return request("/receive/getReceiveList", 'get', data)
  },
  getAddressList: (data) => {
    return request("/address/getAddressList", 'get', data)
  },
  getCollect: (data) => {
    return request("/collect/getMyCollectList", 'get', data)
  },
  getTechnologyInfo: (data) => {
    return request("/technology/etTechnologyInfo", 'get', data)
  },
  // 登录的接口
  getlogin: (data) => {
    return request("/user/mpLogin", 'get', data)
  },
  // 注册的方式接口
  register_complex: (data) => {
    return request("/user/mpRegister", 'post', data)
  },
  //添加收货地址
  addAddress: (data) => {
    return request("/address/addAddress", 'post',data)
  },
  //更换为主办方认证
  changebossCertification: (data) => {
    return request("/company/getCompanyInfoByUserId", 'get', data)
  },
  //主办方认证
  savebossCertification: (data) => {
    return request("/company/addCompany", 'post', data)
  }


}