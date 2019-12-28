
// pages/activity/activity.js
const app = getApp();
let globalData = app.globalData;
const WXAPI = require('../../wxapi/main')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dropDownMenuTitle: ["行业", "免费", "类型", "综合"],
    data2: [{
        id: 1,
        title: '付费'
      },
      {
        id: 2,
        title: '免费'
      }
    ],
    data3: [{
        id: 1,
        title: '线下'
      },
      {
        id: 2,
        title: '线上'
      },
    ],
    data4: [
     {
      id: 1,
      title: '最新'
    }, {
      id: 2,
      title: '热度'
    }],

    shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectDatas: [], //查询选中的条件
    indexs: 0, //选择的下拉列 表下标,
    activityList:
      { page: 1, list: []},
    currentType: 0,
    databaseStatus: '',
    page: 1,
    contentlist: [],
    pageSize: 6, //根据后台每页的数据设定
    hasMoreData: '', //是否有更多数据文字,
    isFree:'',
    activityType:'',
    newest:'',
    pv:''
  },
  turn_search: function() {
    wx.navigateTo({
      url: '/subShopping/pages/search/search'
    })
  },

  selectedItem: function(e) {
    console.log(e);
    if (e.detail.index == 1) {
      this.setData({
        isFree: '',
        activityType: '',
        newest: '',
        pv: ''
      })
    }
    let selectDatas = this.data.selectDatas;
    let result=selectDatas.some(v=>{
      return v.selectedTitle == e.detail.selectedTitle;
    })
    if (!result){
      selectDatas.push(e.detail);
    }
    this.setData({
      selectDatas: selectDatas,
      page:1
    })
    if(e.detail.index==2){
      this.setData({
        isFree: e.detail.selectedId-1
      })
    }
    if (e.detail.index == 3) {
      this.setData({
        activityType: e.detail.selectedId - 1
      })
    }
    if (e.detail.index == 4&&e.detail.selectedId==1) {
      this.setData({
        newest: e.detail.selectedId
      })
    }
    if (e.detail.index == 4 && e.detail.selectedId == 2) {
      this.setData({
        pv: e.detail.selectedId
      })
    }
    this.getMusicInfo();
    // console.log(selectDatas);
  },
  // 获取用户活动的内容
  getMusicInfo: function (message) {
    var that = this;
    let data = {
      pageNum: that.data.page,
      pageSize: that.data.pageSize,
      newest:that.data.newest,
      activityType:that.data.activityType,
      isFree:that.data.isFree,
      pv:that.data.pv
    };
    WXAPI.getActivityList(data).then(res => {
      if (res.code == 200) {
        var contentlistTem = that.data.contentlist //总的数据列表
        if (res.data) {
          if (that.data.page == 1) {
            contentlistTem = []
          }
          var contentlist = res.data //contentlist每次返回的个数
          if (contentlist.length > that.data.pageSize) {
            that.setData({
              contentlist: contentlistTem.concat(contentlist),
              hasMoreData: false
            })
          } else {
            that.setData({
              contentlist: contentlistTem.concat(contentlist),
              hasMoreData: true,
              page: that.data.page + 1
            })
          }
        } else {
          that.setData({
            contentlist: null
          })
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.status) {
      this.setData({
        databaseStatus: options.status,
        currentType: 1
      })
    }
    var that = this;
    that.getMusicInfo();
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
  onPullDownRefresh: function () {
    this.data.page = 1
    this.getMusicInfo()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(this.data.hasMoreData);
    if (this.data.hasMoreData) {
      this.getMusicInfo()
    } else {
      wx.showToast({
        title: '没有更多数据',
        icon: 'none'
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }




})