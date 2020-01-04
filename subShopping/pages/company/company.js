// pages/company/company.js
const app = getApp()
const WXAPI = require('../../wxapi/main')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityList: {
      page: 1,
      list: []
    },
    companyDetail: null,
    focusText: '关注',
    focusKeyed: true,
    contentlist: null, //展示的数据列表
    contentlistTem: null, //全部的数据列表
    page: 1,
    pageSize: 2,
    isClick: false
  },
  // 取消关注
  reduceFocus: function(e) {
    let data = {
      userId: wx.getStorageSync('token').userId,
      relationId: this.data.companyDetail.companyId,
      focusType: 1
    }
    WXAPI.reduceFocus(data).then(res => {
      if (res.code == 200) {
        wx.showToast({
          title: res.message,
        })
        this.setData({
          focusText: '关注',
          focusKeyed: true,
        })
      } else {
        wx.showToast({
          title: res.message,
        })
      }
    })
  },
  // 添加关注
  addFocus: function(e) {
    // console.log(wx.getStorageSync('token').userId);
    let data = {
      "userId": wx.getStorageSync('token').userId,
      "relationId": this.data.companyDetail.companyId,
      "focusType": 1
    }
    WXAPI.addFocus(data).then(res => {
      if (res.code == 200) {
        wx.showToast({
          title: res.message,
        })
        this.setData({
          focusText: '取消关注',
          focusKeyed: false,
        })
      } else {
        wx.showToast({
          title: res.message,
        })
      }
    })
  },
  // 获取更多的活动
  getMoreActivity: function(e) {
    this.setData({
      contentlist: this.data.contentlistTem,
      isClick: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    let companyId = options.companyId;
    let data = {
      userId: wx.getStorageSync('token').userId,
      companyId: options.companyId
    }
    WXAPI.getCompanyInfo(data).then(res => {
      if (res.code == 200) {
        that.setData({
          companyDetail: res.data
        })
        if (res.data.focusStatus) {
          that.setData({
            focusText: '取消关注',
            focusKeyed: false,
          })
        } else {
          that.setData({
            focusText: '关注',
            focusKeyed: true,
          })
        }
      if (res.data.rsActivityList.length>0) {
          console.log("fdgdfg")
          var contentlistTem = res.data.rsActivityList //总的数据列表
          var showActivityList = contentlistTem.slice(0, 2);
          that.setData({
            contentlistTem,
            contentlist: showActivityList,
          })
          if (contentlistTem.length > 2) {
            that.setData({
              isClick: true
            })
          }
        console.log(that.data.contentlist)

        }else{
          that.setData({
            contentlist:null,
          })
        }

      } else {
        wx.showToast({
          title: res.message,
        })
      }
    })
  },

  toReport: function() {
    wx.navigateTo({
      url: '/subShopping/pages/report/report',
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