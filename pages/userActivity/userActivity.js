// pages/myactivity/myactivity.js
const app = getApp()
let globalData = app.globalData;
const WXAPI = require('../../wxapi/main')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderType: ['全部', '待举办', '进行中', '已结束'],
    currentType: 0,
    databaseStatus: '',
    page: 1,
    contentlist: [],
    pageSize: 6, //根据后台每页的数据设定
    hasMoreData: '', //是否有更多数据文字

  },
  //切换状态
  orderTap: function (e) {
    const curType = e.currentTarget.dataset.index;
    this.setData({
      currentType: curType,
      databaseStatus: curType - 1,
      page: 1
    });
    if (curType == 0) {
      this.setData({
        databaseStatus: ''
      });
    }
    this.getMusicInfo();

  },
  // 获取用户活动的内容
  getMusicInfo: function (message) {
    var that = this;
    let data = {
      pageNum: that.data.page,
      pageSize: that.data.pageSize,
      activated: that.data.databaseStatus,
      userId: wx.getStorageSync('token').userId
    };
    WXAPI.getMyActivityList(data).then(res => {
      if (res.code == 200) {
        var contentlistTem = that.data.contentlist //总的数据列表
        if (res.data) {
          if (that.data.page == 1) {
            contentlistTem = []
          }
          // console.log(globalData.activitynum);
          var contentlist = res.data //contentlist每次返回的个数
          var contentlist = contentlist.map(ele => {
            if (ele.activityStatus == 0) {
              ele.activityStatus = '待举办'
            } else if (ele.activityStatus == 1) {
              ele.activityStatus = '进行中'
            } else if (ele.activityStatus == 2) {
              ele.activityStatus = '已结束'
            } else {
              ele.activityStatus = '停止售票'
            }
            return ele;
          })

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
            contentlist:null
            
          })
        }
      }
      console.log(that.data.contentlist);
    })
    
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.dateToweek();
    if (options.status) {
      this.setData({
        databaseStatus: options.status,
        currentType: 1
      })
    }
    var that = this;
    that.getMusicInfo();

  },

  // tabClick(e) {
  //   // 1.根据当前的点击赋值最新的currentType
  //   // console.log(e.detail.value);
  //   let currentType = ''
  //   switch (e.detail.index) {
  //     case 0:
  //       currentType = ALL
  //       break
  //     case 1:
  //       currentType = FINISH
  //       break
  //     case 2:
  //       currentType = END
  //       break
  //   }
  //   this.setData({
  //     currentType: currentType
  //   })
  //   console.log(this.selectComponent('.tab-control'));
  //   this.selectComponent('.tab-control').setCurrentIndex(e.detail.index)
  //   this.selectComponent('.tab-control-temp').setCurrentIndex(e.detail.index)
  // },

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
  onShareAppMessage: function () {

  }
})