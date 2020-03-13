// subMy/pages/myPublicDetail/myPublicDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderType: ["申请者", "需求详情"],
    currentId: 0, //当前选中的切换列表
    demandDetail: null
  },
  // 我的发布里面的切换栏
  tabItem(e) {
    console.log(e.detail.index); //子组件中设置的index为传递数值的参数，父组件的接收方式
    let index = e.detail.index;
    this.setData({
      currentId: index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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