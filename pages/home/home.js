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
    masters: {
      [MASTERS]: { page: 1, list: [] }
    },
    activityList: { page: 1, list: [] },
    banners:[],
    
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

  goLight: function () {
    wx.navigateTo({
      url: '/pages/light/light',
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

  toDetailsTap:function(){
    wx.navigateTo({
      url: '/pages/activityDetails/activityDetails',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //请求轮播图和推荐数据
    //this._getMultiData()
    this._getData();
    this.getActivityData();
    
  },


  getActivityData(){
    const that = this;
    const page = that.data.activityList.page;
    let data = {
      pageNum: that.data.activityList.page,
      pageSize: 20
    }
    // console.log(data)

    WXAPI.getActivity(data).then(function (res) {
      // console.log(res);

      const list = res.data;
      const activity = that.data.activityList;
      activity.list.push(...list)
      activity.page += 1;

      that.setData({
        activity: activity
      })
    })
  },
  
  //_getMultiData(){
    //请求轮播图和推荐数据
    //getMultiData().then(res => {
      //console.log(res)
      //取出轮播图
      //const banners = res.data.data.banner.list;

      //将banner放到data中
     // this.setData({
       // banners
     // })
    //})
 // },
//
  // 网络请求相关方法
  _getData() {
    this._getProductData(MASTERS);
  },
  _getProductData(type) {
    //console.log(type);
    // 1.获取数据对应的页码
    const page = this.data.masters[type].page;
    let data = {
      pageNum: this.data.masters[type].page,
      pageSize: 20
    }
    // console.log(data)
    // 2.请求数据
    getProduct(data).then(res => {
      // console.log(res)
      // 1.取出数据
      const list = res.data;
      //console.log(list)
      // 2.将数据临时获取
      const masters = this.data.masters;
      masters[type].list.push(...list)
      masters[type].page += 1;

      // 3.最新的masters设置到masters中
      this.setData({
        masters: masters
      })
    })

  },

  //goToLight:function(){
   // console.log('goToLight');
  //},

  //_getActivityData(){
    //console.log();
    // 1.获取数据对应的页码
    //const page = this.data.activity.page;
    //let data = {
      //pageNum: this.data.activity.page,
      //pageSize: 20
    //}
    //console.log(data)
    // 2.请求数据
    //getActivity(data).then(res => {
     // console.log(res)
      // 1.取出数据
      //const list = res.data;
      //console.log(list)
      // 2.将数据临时获取
      //const activity = this.data.activity;
      //activity[type].list.push(...list)
      //activity[type].page += 1;

      // 3.最新的activity设置到activity中
      //this.setData({
        ///activity: activity
      //})
    //})
  //},

  

  handleTabClick(event){
    const index = event.detail.index;
    
    this.setData({
      currentType:types[index]
    })
  },

  /*toDetailsTap: function (e) {
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '' + e.currentTarget.dataset.id
    })
  },*/

 

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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