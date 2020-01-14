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
    banners: [],
    currentType:'masters',
    showBackTop:false,
    isTabFixed:false,
    inputShowed: false,
    inputVal: ""
  },

  turn_search: function () {
    wx.navigateTo({
      url: '/subShopping/pages/search/search'
    })
  },
  goLight: function (e) {
    let type=e.currentTarget.dataset.type;
    console.log(type);
    wx.navigateTo({
      url: '/subShopping/pages/light/light?type='+type,
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
  // 获取轮播接口
  getBannerList:function(e){
    let that=this;
    let data={
      pageNum:1,
      pageSize:2
    }
    WXAPI.getBannerList(data).then(res=>{
      console.log(res)
      if(res.code==200){
        that.setData({
          banners: res.data
        })
      }else{
        wx.showToast({
          title: res.message,
        })
      }
     
    })
  },
  toTechnology: function () {
    wx.navigateTo({
      url: '/subShopping/pages/technology/technology',
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showTabBar();
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
    this.getBannerList();
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