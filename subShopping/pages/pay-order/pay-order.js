//index.js
//获取应用实例
const app = getApp()
const WXAPI = require('../../wxapi/main')
// const CONFIG = require('../../config')
// const wxpay = require('../../utils/pay.js');
Page({
  data: {
    goodsList: [], //大师的信息
    buyNowInfo: null, //订单信息
    isNeedLogistics: 0, // 是否需要物流信息
    allGoodsPrice: 0,
    yunPrice: 0,
    allGoodsAndYunPrice: 0,
    goodsJsonStr: "",
    orderType: "", //订单类型，购物车下单或立即支付下单，默认是购物车，
    hasNoCoupons: true,
    coupons: [],
    youhuijine: 0, //优惠券金额
    curCoupon: null, // 当前选择使用的优惠券
    isHidden: true,
    token: null,
  },
  showAuth() {
    this.setData({
      isHidden: false
    })
  },
  /*
   *授权登录成功后回调
   */
  afterAuth(e) {
    console.log(e)
    this.setData({
      isHidden: true,
      token: e.detail
    })
    this.initShippingAddress();
  },
  onShow: function() {
    const that = this;
    let buyNowInfo = wx.getStorageSync('buyNowInfo');
    that.setData({
      buyNowInfo: buyNowInfo,
      goodsList: buyNowInfo.technologyInfo
    });
  },
  goPay: function(e) {
    let that = this;
    let dataInfo = {
      userId: wx.getStorageSync('token').userId,
      technologyId: that.data.buyNowInfo.technologyInfo.userId,
      startDate: that.data.buyNowInfo.startDate,
      endDate: that.data.buyNowInfo.endDate,
      amount: that.data.buyNowInfo.amount,
      totalPrice: 0.01,
      remark:e.detail.value.remark
    }
    dataInfo=JSON.stringify(dataInfo);
    console.log(dataInfo);
      wx.login({
      success(res) {
        if (res.code) {
          let data = {
            "code": res.code,
            "jsonTechnologyOrder": dataInfo
          };
          WXAPI.getTechnologyPrePayId(data).then(res => {
            console.log(res.data);
            if (res.code == 200) {
              that.setData({
                activityOrderId: res.data.activityOrderId
              })
              wx.requestPayment({
                timeStamp: res.data.timeStamp,
                nonceStr: res.data.nonceStr,
                package: res.data.package,
                signType: res.data.signType,
                paySign: res.data.paySign,
                success(res) {
                  console.log(res);
                  let activityOrderId = that.data.activityOrderId;
                  if (res.errMsg == "requestPayment:ok") {
                    wx.navigateTo({
                      url: '/subShopping/pages/ordersuccess/ordersuccess'
                    })
                  } else {
                    wx.showToast({
                      title: '支付失败',
                      icon: '',
                      image: '/assets/common/fail.png',
                    })

                  }
                },
                fail(res) {
                  console.log(res)
                }
              })
            } else if (res.code == 70000) {
              wx.showToast({
                title: '你已经购买过此活动',
                duration: 1000,
              })
              setTimeout(function() {
                wx.switchTab({
                  url: '/pages/home/home',
                })
              }, 1000)

            } else if (res.code == 60000) {
              wx.navigateTo({
                url: '/subMy/pages/userActivity/userActivity?payStatus=3',
              })
            } else {

            }
          })

        } else {
          console.log('获取openid失败')
        }
      }
    })

  },
  onLoad: function(e) {


  },


})