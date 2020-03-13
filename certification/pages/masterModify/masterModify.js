// pages/masterModify/materModify.js
const WXAPI = require('../../wxapi/main');
const app = getApp();
let globalData = app.globalData;
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
      caseList:null,
      city:""
  },
  // 编辑个人情况
  modifyBasic(){
   wx.navigateTo({
      url: '/certification/pages/masterModify/modifyBasic'
   })
  },
  goIntroduce(){
    wx.navigateTo({
      url: '/certification/pages/masterModify/introduce'
    })
  },
  addCase(){
    wx.navigateTo({
      url: '/certification/pages/masterModify/case'
   })
  },
  goEditor(e){
    console.log(e)
    let id=e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '/certification/pages/masterModify/editorCase?id='+id,
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
    let userId=wx.getStorageSync('token').userId;
    let data={
      technologyId:userId,
      userId
    }
    WXAPI.getDetailInfo(data).then(res=>{
      globalData.editorMaster=res.data
     if(res.data.technologyGender==1){
      this.setData({
        genderImg:'/assets/images/master/men.png'
      })
     }else{
       this.setData({
        genderImg:'/assets/images/master/wumen.png'
      })
     }
     let startCode=res.data.city.indexOf('省');
     let endCode=res.data.city.indexOf('市');
     let city=res.data.city;
     if(startCode){
      city=city.slice(startCode+1,endCode);
     }else{
       city=city.slice(0,endCode)
     }
    
      this.setData({
        city:city,
        userInfo:res.data,
        caseList: res.data.caseList
      })
   })
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