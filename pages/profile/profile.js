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
    title:'点击登录',
    isClicked:true,
    openDisplay:false,
    userIdDiscount:null
  },

  toCoupon: function () {
    wx.navigateTo({
      url: '/pages/coupon/coupon'
    })
  },

  toCollect: function () {
    wx.navigateTo({
      url: '/pages/collect/collect'
    })
  },

  toFocus: function () {
    wx.navigateTo({
      url: '/pages/focus/focus'
    })
  },




  toStorecenter: function () {
    wx.navigateTo({
      url: '/pages/center/center',
    })
  },

  toOrder: function () {
    wx.navigateTo({
      url: '/pages/order/order',
    })
  },

  toActivity: function () {
    wx.navigateTo({
      url: '/pages/userActivity/userActivity',
    })
  },

  toAccount: function () {
    wx.navigateTo({
      url: '/pages/account/account',
    })
  },

  toCertification: function () {
    wx.navigateTo({
      url: '/pages/certification/certification',
    })
  },

  toAddress: function () {
    wx.navigateTo({
      url: '/pages/myaddress/myaddress',
    })
  },

  toAdvice: function () {
    wx.navigateTo({
      url: '/pages/advice/advice',
    })
  },

  toSetup: function () {
    wx.navigateTo({
      url: '/pages/set/set',
    })
  },

  toMassage: function () {
    wx.navigateTo({
      url: '/pages/massage/massage',
    })
  },
  // onGotUserInfo(e) {
  //   if (!e.detail.userInfo) {
  //     wx.showToast({
  //       title: '您已取消登录',
  //       icon: 'none',
  //     })
  //     return;
  //   }
  //   if (app.globalData.isConnected) {
  //     AUTH.register(this);
  //   } else {
  //     wx.showToast({
  //       title: '当前无网络',
  //       icon: 'none',
  //     })
  //   }
  // },

  // 点击登录
  openlogin() {
    let that=this;
    wx.login({
      success: function (res) {
       let code=res.code
        if (res.code) {
          WXAPI.getlogin({ 'code': res.code }).then(res => {
            if (res.code == 50000) {
              // 去注册
              wx.navigateTo({
                url: '/pages/sqlogin/sqlogin',
              })
            }else if(res.code==SUCCESS) {
              wx.getUserInfo({
                success: function (res) {
                  var userInfo = res.userInfo
                  var nickName = userInfo.nickName
                  var avatarUrl = userInfo.avatarUrl
                  var gender = userInfo.gender //性别 0：未知、1：男、2：女
                  var province = userInfo.province
                  var city = userInfo.city
                  var country = userInfo.country
                }
              })
              that.setData({
                title: res.data.userName,
                isClicked: false,
                openDisplay: true,

              })
              wx.setStorageSync('token',res.data);
              wx.setStorageSync('companyId', res.data.companyId);
            }else if(res.code==11211){
              wx.showModal({
                title: '',
                content: '登录出错，请重新登录',
              })
            }
          })
        }
      }
    })
  },
  // 更换为主办方认证
  toSponsor: function (e) {
    let token = wx.getStorageSync('token');
    if (!token) {
      wx.showToast({
        title: '请先去登录',
      })
      wx.navigateTo({
        url: '/pages/sqlogin/sqlogin'
      })
      return;
    }
    let userId = wx.getStorageSync('token').userId;
    WXAPI.changebossCertification({ userId }).then(res => {
      if (res.code !=200) {
        wx.showToast({
          title: '您还不是主办方，马上注册',
        })
        wx.navigateTo({
          url: '/pages/bossCertification/bossCertification',
        })
      } else if (res.code == 200) {
        wx.navigateTo({
          url: '/pages/boss/boss',
        })
      }
    })

  },
  //获取优惠券。收藏，关注
  getDiscount:function(e){
    let userId=wx.getStorageSync('token').userId;
    WXAPI.getDiscount({userId}).then(res=>{
        this.setData({
          userIdDiscount:res.data
        })
    })
  },
   /*
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = wx.getStorageSync('token').userName;
    if (token) {
    this.setData({
      title: token, 
      openDisplay: true
    })
      this.getDiscount();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let token = wx.getStorageSync('token').userName;
    if (token) {
      this.setData({
        title: token
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})