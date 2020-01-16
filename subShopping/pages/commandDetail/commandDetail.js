// subShopping/pages/commandDetail/commandDetail.js
let WXAPI = require('../../wxapi/main.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    demandDetail:null,
    isCollect: false,
  },
  // 收藏
  haveSave: function () {
    let data = {
      userId: wx.getStorageSync('token').userId,
      relationId: this.data.masterDetail.userId,
      collectType: 4
    }
    WXAPI.saveActivity(data).then(res => {
      if (res.code == 200) {
        this.setData({
          isCollect: true,
        })
        wx.showToast({
          title: res.message,
        })
      } else {
        wx.showToast({
          title: res.message,
        })
      }
    })

  },
  // 取消收藏
  noSave: function () {
    let data = {
      userId: wx.getStorageSync('token').userId,
      relationId: this.data.masterDetail.userId,
      collectType: 4  //收藏类型
    }
    WXAPI.nosaveActivity(data).then(res => {
      if (res.code == 200) {
        this.setData({
          isCollect: false,
        })
        wx.showToast({
          title: res.message,
        })
      } else {
        wx.showToast({
          title: res.message,
        })
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   let demandId = options.demandId;
    WXAPI.getRemandInfo({ demandId }).then(res => {
      this.setData({
        demandDetail: res.data,
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