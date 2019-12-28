// pages/collect/collect.js
const app = getApp()
const WXAPI = require('../../wxapi/main')

const ACTIVITY="activity"
const GOODS="goods"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderType: ['活动', '商品'],

    collectList:{
      [ACTIVITY]: { page: 1, list: [] },
      [GOODS]: { page: 1, list: [] }
    },
    currentType: 'activity',
  },

  orderTap: function (e) {
    const curType = e.currentTarget.dataset.index;
    this.setData({
      currentType: curType
    });
  },

  tabClick(e) {
    // 1.根据当前的点击赋值最新的currentType
    let currentType = ''
    switch (e.detail.index) {
      case 0:
        currentType = ACTIVITY
        break
      case 1:
        currentType = GOODS
        break
    }
    this.setData({
      currentType: currentType
    })
 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },

  getData:function(){
    this.getCollectData(ACTIVITY);
    this.getCollectData(GOODS);
  },


  getCollectData(type) {
    // 1.获取数据对应的页码
    const that = this;
    const page = that.data.collectList[type].page;
    let data = {
      pageNum: that.data.collectList[type].page,
      pageSize: 20
    }
    console.log(data)

    // 2.请求数据
    WXAPI.getCollect(data).then(res => {
      console.log(res);
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