
// pages/activity/activity.js
const app = getApp()
const WXAPI = require('../../wxapi/main')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    dropDownMenuTitle: ["免费", "行业", "热度", "综合"],
    data2: [{
        id: 1,
        title: '免费'
      },
      {
        id: 2,
        title: '付费'
      }
    ],
    data3: [{
        id: 1,
        title: '行业'
      },
      {
        id: 2,
        title: '亲子'
      },
      {
        id: 3,
        title: '生活'
      },
      {
        id: 4,
        title: '学习'
      }
    ],
    data4: [{
      id: 1,
      title: '综合'
    }, {
      id: 2,
      title: '最新'
    }, {
      id: 3,
      title: '热度'
    }],

    shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectDatas: ['消费账户', '平台返利账户', '微信钱包'], //下拉列表的数据
    indexs: 0, //选择的下拉列 表下标,

    activityList:
      { page: 1, list: []},
  

  },

  // 点击下拉显示框
  selectTaps() {
    this.setData({
      shows: !this.data.shows,
    });
  },
  // 点击下拉列表
  optionTaps(e) {
    let Indexs = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    console.log(Indexs)
    this.setData({
      indexs: Indexs,
      shows: !this.data.shows
    });

  },



  turn_search: function() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },

  selectedItem: function(e) {
    console.log('id --' + e.detail.selectedId + "name = " + e.detail.selectedTitle);
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData();

  },

  getData(){

    const that = this;
    const page = that.data.activityList.page;
    let data = {
      pageNum: that.data.activityList.page,
      pageSize: 20
    }
    console.log(data)

    WXAPI.getActivityList(data).then(function (res) {
      console.log(res);
 
      const list = res.data;
      const activity = that.data.activityList;
      activity.list.push(...list)
      activity.page += 1;

      that.setData({
        activity: activity
      })
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
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }




})