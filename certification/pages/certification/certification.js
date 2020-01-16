// certification/pages/certification/certification.js
const WXAPI = require('../../wxapi/main');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkValue: false,
    changecolor: false,
    picker: ['男', '女'],
    index:'',
  },
  // 改变性别
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value,
      changecolor:true
    })
  },

  //  表单提交事件
  fromSubmit: function (e) {
    // console.log(e.detail.value);
    let that = this;
    let data = e.detail.value;
    data.sex=Number(data.sex)+1;
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
    } 
    data.userId = wx.getStorageSync("token").userId;
    data.relationId = wx.getStorageSync("token").userId;
    data.authenticationType = 2;
    console.log(data);
    wx.showLoading({
      title: '正在为您认证',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
    WXAPI.addAuthentication(data).then(res => {
      if (res.code == 200) {
        wx.setStorageSync("token", res.data)
        wx.showToast({
          icon: 'none',
          title: '恭喜您，实名认证已通过，赶快申请成为大师吧',
          duration: 2000,
          success: function () {
            wx.navigateTo({
              url: '/certification/pages/masterCertification/masterCertification',
            })
          }
        })
      } else {
        wx.showToast({
          icon: "none",
          title: res.message,
        })
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