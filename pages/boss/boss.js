// pages/profile/profile.js
const app = getApp();
const WXAPI = require('../../wxapi/main');
let {
  SUCCESS
} = require('../../config/base.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    activitynum: 0,
    openDisplay: false
  },

  toCoupon: function() {
    wx.navigateTo({
      url: '/pages/myactivity/myactivity?status=0'
    })
  },

  toCollect: function() {
    wx.navigateTo({
      url: '/pages/collect/collect'
    })
  },

  toFocus: function() {
    wx.navigateTo({
      url: '/pages/focus/focus'
    })
  },

  toStorecenter: function() {
    wx.navigateTo({
      url: '/pages/center/center',
    })
  },

  toOrder: function() {
    wx.navigateTo({
      url: '/pages/order/order',
    })
  },

  toActivity: function() {
    wx.navigateTo({
      url: '/pages/myactivity/myactivity',
    })
  },

  toAccount: function() {
    wx.navigateTo({
      url: '/pages/account/account',
    })
  },

  toCertification: function() {
    let companyId=wx.getStorageSync('companyId');
    if(companyId){
     
    }else{
      wx.navigateTo({
        url: '/pages/bossCertification/bossCertification',
      })
    }
 
  },

  toAddress: function() {
    wx.navigateTo({
      url: '/pages/myaddress/myaddress',
    })
  },

  toAdvice: function() {
    wx.navigateTo({
      url: '/pages/advice/advice',
    })
  },

  toSetup: function() {
    wx.navigateTo({
      url: '/pages/set/set',
    })
  },

  toMassage: function() {
    wx.navigateTo({
      url: '/pages/massage/massage',
    })
  },
  // 更换为普通用户
  toUser: function(e) {
    let token = wx.getStorageSync('token');
    if (!token) {
      wx.showToast({
        title: '请先去登录',
      })
      wx.navigateTo({
        url: '/pages/sqlogin/sqlogin'
      })
    }
    wx.switchTab({
      url: '/pages/profile/profile',
    })
  

  },
  // 点击登录
  openlogin() {
    let that = this;
    wx.login({
      success: function(res) {
        let code = res.code
        if (res.code) {
          WXAPI.getlogin({
            'code': res.code
          }).then(res => {
            if (res.code == 11222) {
              wx.navigateTo({
                url: '/pages/sqlogin/sqlogin',
              })
            } else if (res.code == SUCCESS) {
              // console.log(res.data.userName);
              that.setData({
                title: res.data.userName
              })
              wx.setStorageSync('token', res.data);
            }
          })
        }
      }
    })
  },
  /*
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showTabBar();
    let userId = wx.getStorageSync('token').userName;
    this.setData({
      title: userId,
    })
    //获取待举办数量
    var that = this;
    let data = {
      pageNum: 1,
      pageSize: 10,
      activated: 0,
      companyId: wx.getStorageSync('companyId')
    };
    WXAPI.getwillHold(data).then(res => {
      console.log(res);
      if (res.code == 200) {
        that.setData({
          activitynum: res.total
        })
       console.log(res.data.total)
      }
    })
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
    wx.showTabBar();
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