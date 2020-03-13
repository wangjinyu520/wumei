// subShopping/pages/commandDetail/commandDetail.js
let WXAPI = require('../../wxapi/main.js');
let demandId=1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    demandDetail:null,
    isCollect: false,
    phoneNumber:'',
  },
  //联系发布人
  goApply: function (e) {
    
  },
  // 收藏
  haveSave: function () {
    let data = {
      userId: wx.getStorageSync('token').userId,
      relationId:demandId,
      collectType: 5
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
      relationId:demandId,
      collectType: 5 //收藏类型
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
  // 大师申请需求
  applyComand: function () {
    let data = {
      userId: wx.getStorageSync('token').userId,
      demandId: 1,
    }
    WXAPI.addDemandApply(data).then(res => {
      wx.showLoading({
        title: '正在为您申请',
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
      console.log(res)
      if (res.code == 200) {
        wx.navigateTo({
          url: '/subShopping/pages/commandDetail/success'
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
   demandId = options.demandId;
    WXAPI.getRemandInfo({ demandId }).then(res => {
      res.data.demandImage=res.data.demandImage.split(',');
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