// pages/light/light.js
const WXAPI = require('../../wxapi/main')

import{
  getProduct
} from '../../wxapi/main.js'

const RECOMMEND="recommend"
const NEW="new"
const BACK_TOP_POSITION = 1000;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    titles: ["推荐", "最新"],
    gaffers:{
      [RECOMMEND]:{page:1,list:[]},
      [NEW]:{page:1,list:[]}
    },
    currentType: 'recommend',
  },
  loadMore() {
    this._getProductData(this.data.currentType);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 1.发送网络请求
    this._getData()
  },


  tabClick(e) {
    // 1.根据当前的点击赋值最新的currentType
    let currentType = ''
    switch (e.detail.index) {
      case 0:
        currentType = RECOMMEND
        break
      case 1:
        currentType = NEW
        break
    }
    this.setData({
      currentType: currentType
    })
    console.log(this.selectComponent('.tab-control'));
    this.selectComponent('.tab-control').setCurrentIndex(e.detail.index)
    this.selectComponent('.tab-control-temp').setCurrentIndex(e.detail.index)
  },

  //onBackTop() {
    // wx.pageScrollTo({
    //   scrollTop: 0,
    //   duration: 0
    // })
    //this.setData({
     // showBackTop: false,
      //topPosition: 0,
     // tabControlTop: 0
    //})
  //},

  // 网络请求相关方法
  _getData() {
    this._getProductData(RECOMMEND);
    this._getProductData(NEW);
  },
  _getProductData(type) {
    // 1.获取数据对应的页码
    const page = this.data.gaffers[type].page;
    let data={
      pageNum:this.data.gaffers[type].page,
      pageSize:20
    }
    console.log(data)
    // 2.请求数据
    getProduct(data).then(res => {
      console.log(res)
      // 1.取出数据
      const list = res.data;
    //console.log(list)
      // 2.将数据临时获取
      const gaffers = this.data.gaffers;
      gaffers[type].list.push(...list)
      gaffers[type].page += 1;

      // 3.最新的gaffers设置到gaffers中
      this.setData({
        gaffers: gaffers
      })
    })
  },


  dispath: function (e) {
    //e.currentTarget.dataset.text获取点击的模块的值
    if ("" == e.currentTarget.dataset.text) {
      wx.navigateTo({
        url: './page',
      })
    }
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