// pages/allactivity/allactivity.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dropDownMenuTitle: ['全部', '全部', '全部', '全部'],
    data2: [
      { id: 1, title: '免费' },
      { id: 2, title: '付费' }],
    data3: [
      { id: 1, title: '行业' },
      { id: 2, title: '亲子' }
      ],
    data4: [
      { id: 1, title: '综合' }, { id: 2, title: '最新' }, { id: 3, title: '热度' }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  turn_search: function () {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },

  selectedItem: function (e) {
    console.log('id --' + e.detail.selectedId + "cityname = " + e.detail.selectedTitle);
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

