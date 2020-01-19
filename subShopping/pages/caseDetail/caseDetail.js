// subShopping/pages/caseDetail/caseDetail.js
let WXAPI = require('../../wxapi/main.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    caseDetail:null,
    banners:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
   let caseId = options.caseId;
    // 获取案例详情
    WXAPI.getTechnologyCaseInfo({ caseId }).then(res => {
      res.data.caseImageUrl=res.data.caseImageUrl.split(',');
      console.log(res.data.caseImageUrl)
      that.setData({
        caseDetail: res.data,
        banners: res.data.caseImageUrl
      });

    })
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