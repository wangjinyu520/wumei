// pages/goods/goods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    showView: false,
    isClick: false
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let detId = options.id;
    let _this = this;
  },

  // 用于实现点击时，来显示与隐藏整个“conts”，这一部分其实是利用了面板的显示与隐藏功能  
  change: function () {
    let that = this;
    that.setData({
      showView: !that.data.showView
    })
  },
  // 商品规格的选择
  close: function () {
    this.setData({
      showView: !this.data.showView
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