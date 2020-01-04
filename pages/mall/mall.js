// pages/mall/mall.js
const WXAPI = require('../../wxapi/main')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false, //初始文本框不显示内容

    inputShowed: false,
    inputVal: "",
    banners: [],
    goodsList: []
  },
  // 使文本框进入可编辑状态
  showInput: function() {
    this.setData({
      inputShowed: true //设置文本框可以输入内容
    });
  },
  // 取消搜索
  hideInput: function() {
    this.setData({
      inputShowed: false
    });
  },
  goLight: function (e) {
    let type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '/subShopping/pages/goodsList/goodsList?type='+type,
    })
  },

  toDetailsAssemble: function () {
    wx.navigateTo({
      url: '/subShopping/pages/assembledetails/assembledetails',
    })
  },

  toDetailsGoods: function () {
    wx.navigateTo({
      url: '/subShopping/pages/goods/goods',
    })
  },
  // 获取轮播接口
  getBannerList: function (e) {
    let that = this;
    let data = {
      pageNum: 1,
      pageSize: 2
    }
    WXAPI.getBannerList(data).then(res => {
      if (res.code == 200) {
        that.setData({
          banners: res.data
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
  onLoad: function(options) {
    this.getBannerList();
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