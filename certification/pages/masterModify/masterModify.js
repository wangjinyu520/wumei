// pages/masterModify/materModify.js
const WXAPI = require('../../wxapi/main');
const params={
  pageNum:1,
  pageSize:20
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
       userInfo:'',
       genderImg:'',
      caseList:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userId=wx.getStorageSync('token').userId;
    console.log(userId)
    WXAPI.getDetailInfo({userId}).then(res=>{
     if(res.data.technologyGender==1){
      this.setData({
        genderImg:'/assets/images/master/men.png'
      })
     }else{
       this.setData({
        genderImg:'/assets/images/master/wumen.png'
      })
     }
      this.setData({
        userInfo:res.data,
        caseList: res.data.caseList
      })
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