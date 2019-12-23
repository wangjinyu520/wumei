// pages/rent/rent.js
const WXAPI = require('../../wxapi/main')

import {
  getCommodity
} from '../../wxapi/main.js'


const RECOMMEND = "recommend"
const NEW = "new"
const BACK_TOP_POSITION = 1000;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {
      addflag: true,  //判断是否显示搜索框右侧部分
      addimg: '../../assets/images/mall/cart.png',
      searchstr: ''
    },
    titles: ["推荐", "最新"],
    selectArray:[
      {"id":"1",
      "text":"全部"
      },
      {"id":"2",
        "text": "灯光"
      },
      {
        "id": "3",
        "text": "音响"
      },
      {
        "id": "4",
        "text": "视频"
      },
      {
        "id": "4",
        "text": "其他"
      }
    ],
    selectArray1: [
      {
        "id": "1",
        "text": "不限"
      },
      {
        "id": "2",
        "text": "北京"
      },
      {
        "id": "3",
        "text": "上海"
      },
      {
        "id": "4",
        "text": "杭州"
      },
      {
        "id": "5",
        "text": "深圳"
      }
    ],
    commodity: {
      [RECOMMEND]: { page: 1, list: [] },
      [NEW]: { page: 1, list: [] }
    },
    currentType: 'recommend'
  },
  loadMore() {
    this._getCommodityData(this.data.currentType);
  },

  toProduct: function (e) {
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/product/product?id=' + e.currentTarget.dataset.id
    })
  },

  toProduct:function(){
    wx.navigateTo({
      url: '/pages/product/product',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1.发送网络请求
    this._getData()
  },

  tap(e) {

  },
  // 搜索框右侧 事件
  addhandle() {
    console.log('触发搜索框右侧事件')
  },

  //搜索框输入时触发
  searchList(ev) {
    let e = ev.detail;
    this.setData({
      searchstr: e.detail.value
    })
  },
  //搜索回调
  endsearchList(e) {
    console.log('查询数据')
  },
  // 取消搜索
  cancelsearch() {
    this.setData({
      searchstr: ''
    })
  },
  //清空搜索框
  activity_clear(e) {

    this.setData({
      searchstr: ''
    })
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

  // 网络请求相关方法
  _getData() {
    this._getCommodityData(RECOMMEND);
    this._getCommodityData(NEW);
  },
  _getCommodityData(type) {
    // 1.获取数据对应的页码
    const page = this.data.commodity[type].page;
    let data = {
      pageNum: this.data.commodity[type].page,
      pageSize: 20
    }
    console.log(data)
    // 2.请求数据
    getCommodity(data).then(res => {
      console.log(res)
      // 1.取出数据
      const list = res.data;
      //console.log(list)
      // 2.将数据临时获取
      const commodity = this.data.commodity;
      commodity[type].list.push(...list)
      commodity[type].page += 1;

      // 3.最新的commodity设置到commodity中
      this.setData({
        commodity: commodity
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