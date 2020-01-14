// pages/collect/collect.js
const app = getApp()
const WXAPI = require('../../wxapi/main')

const ACTIVITY = "activity"
const GOODS = "goods"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderType:["活动","商品"],
    contentlist: null,//活动优惠券
    contentlist1: null,//商品优惠劵
    currentType: 0,//切换效果
    curType:2,//传给后台的状态
    page:1,
    pageSize:6
  },
  tabClick(e) {
    // 1.根据当前的点击赋值最新的currentType
    const curType = e.currentTarget.dataset.index;
    this.setData({
      currentType: curType
    })
    console.log(curType);
    switch (e.currentTarget.dataset.index) {
      case 0:
        this.setData({
          curType:2,
          page: 1
        
        })
        break
      case 1:
        this.setData({
          curType: 3,
          page: 1
        })
        break
    }
   
  
    console.log(this.data.curType);

    this.getMyCollectList();

  },
  // 获取收藏
  getMyCollectList: function () {
    var that = this;
    let data = {
      pageNum: that.data.page,
      pageSize: that.data.pageSize,
      userId: wx.getStorageSync('token').userId , //这里是不是还有一个收藏的类型
      collectType: that.data.curType
    };
    WXAPI.getMyCollectList(data).then(res => {
      console.log(res);
      if (res.code == 200 && that.data.curType==2) {
        that.setData({
          contentlist1: null
        })
        var contentlistTem = that.data.contentlist //总的数据列表
        if (res.data.length) {
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
      } else if (res.code == 200 && that.data.curType == 3) {
        that.setData({
          contentlist: null
        })
        var contentlistTem = that.data.contentlist1 //总的数据列表
        if (res.data.length) {
          if (that.data.page == 1) {
            contentlistTem = []
          }
          var contentlist1 = res.data //contentlist每次返回的个数
          if (contentlist1.length > that.data.pageSize) {
            that.setData({
              contentlist1: contentlistTem.concat(contentlist1),
              hasMoreData: false
            })
          } else {
            that.setData({
              contentlist1: contentlistTem.concat(contentlist1),
              hasMoreData: true,
              page: that.data.page + 1
            })
          }
        } else {
          that.setData({
            contentlist1: null
          })
        }
        console.log(res.data);

        console.log(that.data.contentlist1);

      }else{
        wx.showToast({
          title:res.message,
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getMyCollectList();
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