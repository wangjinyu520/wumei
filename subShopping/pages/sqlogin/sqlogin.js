// pages/sqlogin/sqlogin.js
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
    code: ''
  },
  getPhoneNumber(e) {
    let that=this;
    wx.login({
      success: function (res) {
        that.setData({
          code:res.code
        })
        if (res.code) {
          if (e.detail.errMsg == "getPhoneNumber:ok") {
            //相当于注册
            // wx.getUserInfo({
            //   success: function (res) {
            //     var userInfo = res.userInfo
            //     var nickName = userInfo.nickName
            //     var avatarUrl = userInfo.avatarUrl
            //     var gender = userInfo.gender //性别 0：未知、1：男、2：女
            //   }
            // })
           
            let encryptedData = e.detail.encryptedData;
            let iv = e.detail.iv;
            let code = that.data.code;
            let data = {
              code: code,
              encrypted: encryptedData,
              iv: iv
            };
            // 下面开始调用注册接口
            WXAPI.register_complex(data).then(function (res) {
             if(res.code==SUCCESS){
               wx.showModal({
                 title: '',
                 content: '用户授权成功',
               })
               wx.setStorageSync('token', res.data);
               wx.switchTab({
                 url: '/pages/profile/profile',
               })
             }else{
               wx.showModal({
                 title: '',
                 content: res.message,
               })
             }
            })
          }else {
            wx.showModal({
              title: '拒绝授权',
              content: '用户拒绝授权',
            })
          }
        }
      }
    })
  
   

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