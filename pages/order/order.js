// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderType: ['全部', '待付款', '待发货', '待收货','待评价'],
    currentType: 0,
  },

  orderTap: function (e) {
    const curType = e.currentTarget.dataset.index;
    this.setData({
      currentType: curType
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  toRefund:function(){
    wx.navigateTo({
      url: '/pages/refund/refund',
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