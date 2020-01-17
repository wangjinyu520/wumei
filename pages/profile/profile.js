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
    title: '点击登录',
    openDisplay: false,
    userIdDiscount: null,
    userInfo: null
  },

  toCoupon: function() {
    wx.navigateTo({
      url: '/subMy/pages/coupon/coupon'
    })
  },

  toCollect: function() {
    wx.navigateTo({
      url: '/subMy/pages/collect/collect'
    })
  },

  toFocus: function() {
    wx.navigateTo({
      url: '/subMy/pages/focus/focus'
    })
  },

  toStorecenter: function() {
    wx.navigateTo({
      url: '/subMy/pages/center/center',
    })
  },

  toOrder: function() {
    wx.navigateTo({
      url: '/subMy/pages/order/order',
    })
  },

  toActivity: function() {
    wx.navigateTo({
      url: '/subMy/pages/userActivity/userActivity',
    })
  },

  toAccount: function() {
    wx.navigateTo({
      url: '/subMy/pages/account/account',
    })
  },
  // 申请大师
  toCertification: function() {
    let token = wx.getStorageSync('token');
    if (!token) {
      wx.showToast({
        title: '请先去登录',
      })
      wx.switchTab({
        url: '/pages/profile/profile',
      })
      return;
    }
    if (token.userType == 3) {
      wx.showModal({
        title: '',
        content: '您已经是大师了，是想编辑大师信息吗',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/subShopping/pages/masterEditor/masterEditor',
            })
          } else if (res.cancel) {

          }
        }
      })
      return;
    }
    let companyId = wx.getStorageSync('companyId');
    if (companyId) {
      wx.showToast({
        icon: 'none',
        title: '你已经是主办方身份，不能再申请大师身份',
      })
      return
    }
    let isAuthentication = wx.getStorageSync('token').isAuthentication;
    if (!isAuthentication) {
      wx.showToast({
        icon: 'none',
        title: "技术人员需要实名哦",
        success: function(res) {
          wx.navigateTo({
            url: '/certification/pages/certification/certification'
          })
        }
      })
      return
    }
    wx.navigateTo({
      url: '/certification/pages/masterCertification/masterCertification',
    })

  },
  toAddress: function() {
    wx.navigateTo({
      url: '/subMy/pages/myaddress/myaddress',
    })
  },
  toAdvice: function() {
    wx.navigateTo({
      url: '/subMy/pages/advice/advice',
    })
  },
  toSetup: function() {
    wx.navigateTo({
      url: '/subMy/pages/set/set',
    })
  },
  toMassage: function() {
    wx.navigateTo({
      url: '/subMy/pages/massage/massage',
    })
  },
  // 完善个人信息
  onGotUserInfo(e) {
    let that = this;
    let tokens = wx.getStorageSync('token');
    tokens.avatarUrl = tokens.userIcon;
    if (tokens.nickName) {
      this.setData({
        userInfo: tokens
      });
    } else {
      wx.getUserInfo({
        success: function(res) {
          // console.log(res);
          var userInfo = res.userInfo;
          userInfo.userId = wx.getStorageSync('token').userId;
          that.setData({
            userInfo
          });
          // console.log(userInfo);
          WXAPI.modifyUser(userInfo).then(res => {
            console.log(res.data);
            let token = wx.getStorageSync('token');
            token.userIcon = res.data.userIcon;
            token.nickName = res.data.nickName;
            wx.setStorageSync('token', token);
          })
        }
      })
    }

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
            if (res.code == 50000) {
              // 去注册
              wx.navigateTo({
                url: '/subShopping/pages/sqlogin/sqlogin',
              })
            } else if (res.code == SUCCESS) {
              that.setData({
                title: res.data.userName,
                openDisplay: true,

              })
              console.log(res.data);
              if (res.data.nickName) {
                if (res.data.userIcon) {
                  res.data.avatarUrl = res.data.userIcon;
                }
                that.setData({
                  userInfo: res.data
                });
              }
              wx.setStorageSync('token', res.data);
              if (res.data.companyId) {
                wx.setStorageSync('companyId', res.data.companyId);
              }
              wx.navigateBack({})

            } else if (res.code == 11211) {
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
  toSponsor: function(e) {
    let token = wx.getStorageSync('token');
    if (!token) {
      wx.showToast({
        title: '请先去登录',
      })
      wx.navigateTo({
        url: '/subShopping/pages/sqlogin/sqlogin'
      })
      return;
    }
    if (token.userType == 3) {
      wx.showToast({
        title: '您已经是大师，不能再注册主办方身份',
      })
      return;
    }
    let userId = wx.getStorageSync('token').userId;

    WXAPI.changebossCertification({
      userId
    }).then(res => {
      console.log(res);
      if (res.code != 200) {
        wx.showToast({
          title: '您还不是主办方，马上注册',
        })
        wx.navigateTo({
          url: '/subShopping/pages/bossCertification/bossCertification',
        })
      } else if (res.code == 200) {
        wx.navigateTo({
          url: '/subShopping/pages/boss/boss',
        })
      }
    })

  },
  //获取优惠券。收藏，关注
  getDiscount: function(e) {
    let userId = wx.getStorageSync('token').userId;
    WXAPI.getDiscount({
      userId
    }).then(res => {
      this.setData({
        userIdDiscount: res.data
      })
    })
  },
  /*
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let token = wx.getStorageSync('token').mobile;
    if (token) {
      this.setData({
        title: token,
        openDisplay: true
      })
      let tokens = wx.getStorageSync('token');

      if (tokens.nickName) {
        if (tokens.userIcon) {
          tokens.avatarUrl = tokens.userIcon;
        }
        this.setData({
          userInfo: tokens
        });
      }
    }
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
    wx.showTabBar({})
    let token = wx.getStorageSync('token').userName;
    if (token) {
      this.setData({
        title: token
      })
      this.getDiscount();
    }
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