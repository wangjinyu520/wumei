// pages/bossCertification/bossCertification.js
const app = getApp();
const WXAPI = require('../../wxapi/main');
var util = require('../../../utils/util.js');
// import uploadImg from '../../xcomponents/uploadpic/up-pic.js'
let company = {};
let mulImage = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: "",
    isSend: false,
    secend: 60,
    cardType: '',
    bankName: '',
    bankNumber: ''
  },

  //银行卡号
  getUserIdCardNumber: function(e) {
    this.setData({
      bankNumber: e.detail.value
    })
    var temp = util.bankCardAttribution(e.detail.value)
    if (temp == Error) {
      temp.bankName = '';
      temp.cardTypeName = '';
    } else {
      this.setData({
        cardType: temp.bankName + temp.cardTypeName,
      })
    }
  },
  // 发送验证码
  sendCode: function(e) {
    let that = this;
    let data = {
      codeType: 6,
      mobile: this.data.phoneNumber
    }
    WXAPI.addVerificationCode(data).then(res => {
      if (res.code == 200) {
        wx.setStorageSync("code", res.data)
        var secend = that.data.secend;
        var interVal = setInterval(function() {
          secend--
          that.setData({
            secend: secend
          })
          if (secend == 0) {
            clearInterval(interVal);
            that.setData({
              secend: 60,
              isSend: false
            })
          }
        }, 1000)
        that.setData({
          isSend: true
        })
      } else {
        wx.showToast({
          title: res.message,
        })
      }
    })
  },
  // 输入验证码
  writeCode(e) {
    let code = wx.getStorageSync('code');
    if (code === e.detail.value) {} else {
      return;
    }
  },
  // 手机号部分
  inputPhoneNum: function(e) {
    let phoneNumber = e.detail.value
    if (phoneNumber.length === 11) {
      let checkedNum = this.checkPhoneNum(phoneNumber)
    } else {
      return;
    }

  },
  checkPhoneNum: function(phoneNumber) {
    let that = this;

    let str = /^1\d{10}$/
    if (str.test(phoneNumber)) {
      that.setData({
        phoneNumber: phoneNumber
      })

    } else {
      return
    }
  },
  //  表单提交事件
  fromSubmit: function(e) {
    // console.log(bossList);
    let that = this;
    let data = e.detail.value;
    var compare = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (data.realName.length == 0 && data.realName.length < 2) {
      wx.showToast({
        title: '用户名不正确',
        icon: 'none',
        image: '',
        duration: 1000
      })
      return;
    } else if (!data.idCard) {
      wx.showToast({
        title: '身份证号不能为空',
        icon: 'none',
        duration: 1000
      })
      return
    } else if (data.idCard.length != 18) {
      wx.showToast({
        title: '身份证号不规范',
        icon: 'none',
        duration: 1000
      })
      return
    } else if (!data.bankNumber) {
      wx.showToast({
        title: '银行卡号不能为空',
        icon: 'none',
        duration: 1000
      })
      return;
    } else if (!data.bankName) {
      wx.showToast({
        title: '不支持该类型的银行卡，请更换',
        icon: 'none',
        duration: 1000
      })
      return;

    } else if (data.mobile.length != 11) {
      wx.showToast({
        title: '手机号长度有误',
        icon: 'none',
        image: '',
        duration: 1000
      })
      return false;
    } else if (!compare.test(data.mobile)) {
      wx.showToast({
        title: '请输入正确的手机号！',
        icon: 'none',
        image: '',
        duration: 1000
      })
      return false;
    } else if (!data.verificationCode) {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    data.userId = wx.getStorageSync("token").userId;
    data.relationId = wx.getStorageSync("token").userId;
    data.authenticationType = 2;
    wx.showLoading({
      title: '正在为您认证',
    })
    setTimeout(function() {
      wx.hideLoading()
    }, 2000)
    WXAPI.addAuthentication(data).then(res => {
      if (res.code == 200) {
        wx.setStorageSync("token", res.data)
        wx.showToast({
          icon: 'none',
          title: '恭喜您，实名认证已通过，赶快申请成为大师吧',
          duration:2000,
          success: function() {
            wx.navigateTo({
              url: '/subShopping/pages/masterRegister/masterRegister',
            })
          }
        })
      } else {
        wx.showToast({
          icon:"none",
          title: res.message,
        })
      }
    })
    // }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // this.myComponent = this.selectComponent('#myComponent')
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