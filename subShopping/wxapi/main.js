const API_BASE_URL = "http://10.20.11.252:8080/wumei-server"
// const API_BASE_URL = "http://101.133.164.180:8080/wumei-server"
// const API_BASE_URL = "https://www.techwells.com/wumei-server";

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
  getHomeList: (data) => {
    return request("/home/getHomeDetail", 'get', data)
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
    return request("/address/addAddress", 'post', data)
  },
  //****主办方的相关接口 */
  //更换为主办方认证
  changebossCertification: (data) => {
    return request("/company/getCompanyInfoByUserId", 'get', data)
  },
  //主办方认证
  addVerificationCode: (data) => {
    return request("/verificationCode/addVerificationCode", 'get', data)
  },
  //实名认证
  addAuthentication: (data) => {
    return request("/authentication/addAuthentication", 'post', data)
  },
  //验证码发送
  savebossCertification: (data) => {
    return request("/company/addCompany", 'get', data)
  },
  //主办主页的待举办数
  getwillHold: (data) => {
    return request("/activity/companyActivityList", 'get', data)
  },
  // 用户活动详情
  getActivityDetails: (data) => {
    return request("/activity/getActivityInfo", 'get', data)
  },
  // 添加关注
  addFocus: (data) => {
    return request("/focus/addFocus", 'get', data)
  },
  // 取消关注
  reduceFocus: (data) => {
    return request("/focus/cancelFocus", 'get', data)
  },
  getPopularActivity: (data) => {
    return request("/activity/getPopularActivityList", 'get', data)
  },
  //用户活动收藏     1收藏商品   2.收藏活动    3.收藏租赁商品
  saveActivity: (data) => {
    return request("/collect/addCollect", 'get', data)
  },
  nosaveActivity: (data) => {
    return request("/collect/delCollect", 'get', data)
  },
  //详情页的热门活动
  getPopularActivity: (data) => {
    return request("/activity/getPopularActivityList", 'get', data)
  },
  // 浏览量 
  browseNum: (data) => {
    return request("/pv/addPv", 'get', data)
  },
  // 获取大师的详细信息
  getDetailInfo: (data) => {
    return request("/technology/getTechnologyInfo", 'get', data)
  },
  // 编辑大师的详细信息
  editorDetailInfo: (data) => {
    return request("/technology/modifyTechnology", 'post', data)
  },

  //微信支付接口
  getweChatOpenid: (data) => {
    return request("/weChat/getActivityPrePayId", 'get', data)
  },
  //****用户相关页面的接口：
  getActivityList: (data) => {
    return request("/activity/getActivityList", 'get', data)
  },
  // 申请为大师
  addTechnology: (data) => {
    return request("/technology/addTechnology", 'get', data)
  },
  // 获取优惠券、收藏、关注
  getDiscount: (data) => {
    return request("/user/getMyInfo", 'get', data)
  },
  // 获取大师列表页面-最新的大师数据
  getNewMaster: (data) => {
    return request("/technology/getTechnologyList", 'get', data)
  },
  // 获取大师列表页面-推荐的大师数据
  getRecommendList: (data) => {
    return request("/technology/getTechnologyList", 'get', data)
  },
  // 获取我的主页的用户活动列表
  getMyActivityList: (data) => {
    return request("/activity/getUserActivityList", 'get', data)
  },
  // 获取我的主页的用户活动列表
  getCompanyActivityList: (data) => {
    return request("/activity/companyActivityList", 'get', data)
  },
  //更新用户信息获取头像
  modifyUser: (data) => {
    return request("/user/modifyUser", 'get', data)
  },
  //获取活动订单详情
  getActivityOrderInfo: (data) => {
    return request("/activityOrder/getActivityOrderInfo", 'get', data)
  },
  // 主办方的反馈意见
  addFeedback: (data) => {
    return request("/feedback/addFeedback", 'get', data)
  },
  // 租赁详情页数据
  getCommodityById: (data) => {
    return request("/commodity/getCommodityById", 'get', data)
  },
  // 租赁详情页数据
  getCompanyInfo: (data) => {
    return request("/company/getCompanyInfoByCompanyId", 'get', data)
  },
  // 获取三级地址城市
  getPronceCity: (data) => {
    return request("/city/getCityList", 'get', data)
  }, 
  // 获取技术人员类型
  getTechnologyTypeList: (data) => {
    return request("/technologyType/getTechnologyTypeList", 'get', data)
  },
  // 获取技术人员类型
  getDemandList: (data) => {
    return request("/demand/getDemandList", 'get', data)
  },
  // 需求详情
  getRemandInfo: (data) => {
    return request("/demand/getDemandInfo", 'get', data)
  },

}
