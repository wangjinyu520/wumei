// pages/company/company.js
const app = getApp()
const WXAPI = require('../../wxapi/main')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityList:
      { page: 1, list: [] }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },

  getData() {

    const that = this;
    const page = that.data.activityList.page;
    let data = {
      pageNum: that.data.activityList.page,
      pageSize: 20
    }
    console.log(data)

    WXAPI.getActivityList(data).then(function (res) {
      const list = res.data;
      const activity = that.data.activityList;
      activity.list.push(...list)
      activity.page += 1;

      that.setData({
        activity: activity
      })
    })
  },



  toReport:function(){
    wx.navigateTo({
      url: '/pages/report/report',
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