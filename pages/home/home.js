// pages/home/home.js
const app = getApp()
const WXAPI = require('../../wxapi/main')

//import{
  //getMultiData,
  //getMastersData
//}from '../../service/home.js'

import {
  getProduct,
  getActivity
} from '../../wxapi/main.js'


const MASTERS="masters"
const BACK_TOP_POSITION = 1000;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    masters: [],
    activityList:[],
    banners: [' http://101.133.164.180:8089/wumei-upload/image/1577187646839wx9704107d6ee309ff.o6zAJs4jJUXoX75lAb1ATeCbI45w.Tx94jRrYs3zDf7a0d235374123d063896f20cc33b5d9.jpg','http://101.133.164.180:8089/wumei-upload/image/1577187652232wx9704107d6ee309ff.o6zAJs4jJUXoX75lAb1ATeCbI45w.xbCQqKJy0blM2601794cd3ff9ea8f055f56acf5a7d37.jpg'],
    currentType:'masters',
    showBackTop:false,
    isTabFixed:false,
    inputShowed: false,
    inputVal: ""
  },

  turn_search: function () {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  goLight: function (e) {
    let type=e.currentTarget.dataset.type;
    console.log(type);
    wx.navigateTo({
      url: '/pages/light/light?type='+type,
    })
  },
  loadMore() {
    this._getProductData(this.data.currentType);
  },


  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  toPublish: function (event) {
    wx.switchTab({
      url: '/pages/publish/publish',
    })
  },

  toNearby: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.setStorage({
      key: "mall_type",
      data: id
    })
    var url = '../mall/mall';
    wx.switchTab({
      url: url,
    })
  },
  toTechnology: function () {
    wx.navigateTo({
      url: '/pages/technology/technology',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showTabBar();
    //请求轮播图和推荐数据
    // this._getMultiData()
    // this._getData();
    // this.getActivityData();
    WXAPI.getHomeList().then(res=>{
      this.setData({
        masters: res.data.technologyTask,
        activityList: res.data.activityTask ,
      })
      var masters = this.data.masters.map(ele => {
        if (ele.technologyOccupation == 1) {
          ele.technologyOccupation = '灯光师'
        } else if (ele.technologyOccupation == 2) {
          ele.technologyOccupation = '音响师'
        } else if (ele.technologyOccupation == 3) {
          ele.technologyOccupation = '视频师'
        } else if (ele.technologyOccupation == 4) {
          ele.technologyOccupation = '项目经理'
        } else if (ele.technologyOccupation == 5) {
          ele.technologyOccupation = '搭建'
        } else if (ele.technologyOccupation == 6) {
          ele.technologyOccupation = '舞美设计'
        } else{

        }
        return ele;
      })
      this.setData({
        masters
      })
      console.log(this.data.masters);
      console.log(this.data.activityList);

    })
  },
  // 网络请求相关方法
  _getData() {
    this._getProductData(MASTERS);
  },
  handleTabClick(event){
    const index = event.detail.index;
    
    this.setData({
      currentType:types[index]
    })
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
   wx.showTabBar({
     
   })
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
  /*onReachBottom: function() {
    this._getPopsData(this.data.currentType)
  },

  onPageScroll(option){
    const scrollTop=options.scrollTop;

    const flag = scrollTop >= TOP_DISTANCE
    if (flag != this.data.showBackTop) {
      this.setData({
        showBackTop: flag
      })

    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})