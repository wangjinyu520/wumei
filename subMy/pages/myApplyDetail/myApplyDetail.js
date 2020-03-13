// subMy/pages/myApplyDetail/myApplyDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  tabItem(e) {
    console.log(e.detail.index); //子组件中设置的index为传递数值的参数，父组件的接收方式
    let index=e.detail.index;
    this.setData({
      currentId:index
    }) 
    switch(index){
      case 0 :
        this.setData({
          myPublic:true,
          page:1
        }) 
        this.getApply();
        break;
      case 1:
        this.setData({
          myPublic:false,
          page:1
        })
        this.getPublic();
        break;
    }
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