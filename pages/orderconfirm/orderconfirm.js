// pages/orderconfirm/orderconfirm.js
const WXAPI = require('../../wxapi/main.js');
const app = getApp()
let globalData = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: true,
    cartActivityInfo: null,
    activityCart: null,
    remarksInfo: ''
  },
  // 获取备注信息
  getMoreDesc(e) {
    this.setData({
      remarksInfo: e.detail.value
    })
  },
  goPay: function(e) {
    let that = this;
    wx.login({
      success(res) {
        if (res.code) {
          let data = {
            "code": res.code,
            "JsonActivityOrder": {
              activityId: that.data.cartActivityInfo.activityId,
              userId: wx.getStorageSync('token').userId,
              buyerInformation: JSON.stringify(that.data.activityCart.buyerInformation),
              paymentMethod: 1,
              ticketCount: that.data.activityCart.ticketsnum,
              // payAmount: that.data.activityCart.totalPrice,
              payAmount:0.01,
              remark: that.data.remarksInfo,
              account: wx.getStorageSync('token').userName,
            }
          };
          WXAPI.getweChatOpenid(data).then(res => {
            if (res.code == 200) {
              wx.requestPayment({
                timeStamp: res.data.timeStamp,
                nonceStr: res.data.nonceStr,
                package: res.data.package,
                signType: res.data.signType,
                paySign: res.data.paySign,
                success(res) {
                  console.log(res);
                  if (res.errMsg == "requestPayment:ok"){
                    wx.navigateTo({
                      url: '/pages/orderdetil/orderdetil',
                    
                    })
                  }else{
                    wx.showToast({
                      title: '支付失败',
                      icon: '',
                      image: '../../assets/common/fail.png',
                    })
                  }
                },
                fail(res) {
                  console.log(res)
                }
              })
            }
          })

        } else {
          console.log('获取openid失败')
        }
      }
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      activityCart: globalData.activityCart,
      cartActivityInfo: globalData.cartActivityInfo
    })
    console.log(globalData)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})