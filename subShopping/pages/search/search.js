// pages/search/search.js
let WXAPI = require('../../wxapi/main.js')
let data = null;
Page({
  data: {
    searchValue: '',
    page: 1,
    pageSize: 6,
    searchType: '',
    contentlist: null, //活动列表
    contentlist1: null, //租赁列表
    contentlist2: null, //商城商品列表


  },
  onLoad: function(options) {
    let type = options.type;//跳转页面显示搜索的类型是活动还是商品还是租赁的商品
    this.setData({
      searchType: type
    })
  },
  inputBind: function(e) {
    this.setData({
      searchValue: e.detail.value
    })

  },
  // 搜索的内容
  getActivityInfo: function(e) {
    let searchField = this.data.searchType
    this.setData({
      searchValue: e.detail.value
    })
    var that = this;
    if (searchField == "activity") {
      data = {
        pageNum: that.data.page,
        pageSize: that.data.pageSize,
        activityTheme: that.data.searchValue //按活动的名称搜索
      };
      WXAPI.getActivityList(data).then(res => {
        if (res.code == 200) {
          var contentlistTem = that.data.contentlist //总的数据列表
          if (res.data) {
            if (that.data.page == 1) {
              contentlistTem = []
            }
            var contentlist = res.data //contentlist每次返回的个数
            if (contentlist.length < that.data.pageSize) {
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
    } else if (searchField == "commodity") {
      data = {
        pageNum: that.data.page,
        pageSize: that.data.pageSize,
        commodityName: that.data.searchValue  //按租赁的名称搜索
      };
      WXAPI.getCommodity(data).then(res => {
        if (res.code == 200) {
          var contentlistTem = that.data.contentlist1 //总的数据列表
          if (res.data) {
            if (that.data.page == 1) {
              contentlistTem = []
            }
            var contentlist1 = res.data //contentlist每次返回的个数
            if (contentlist1.length < that.data.pageSize) {
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
        }
      })
    } 
    //这里面搜索商品的接口还没有做
    else if (searchField == "goods") {
      data = {
        pageNum: that.data.page,
        pageSize: that.data.pageSize,
        commodityName: that.data.searchValue  //按租赁的名称搜索
      };
      console.log(data);
      WXAPI.getCommodity(data).then(res => {
        if (res.code == 200) {
          var contentlistTem = that.data.contentlist2 //总的数据列表
          if (res.data) {
            if (that.data.page == 1) {
              contentlistTem = []
            }
            var contentlist2 = res.data //contentlist每次返回的个数
            if (contentlist2.length < that.data.pageSize) {
              that.setData({
                contentlist2: contentlistTem.concat(contentlist2),
                hasMoreData: false
              })
            } else {
              that.setData({
                contentlist2: contentlistTem.concat(contentlist2),
                hasMoreData: true,
                page: that.data.page + 1
              })
            }
          } else {
            that.setData({
              contentlist2: null
            })
          }
        }
      })
    } 
    console.log(data);
  },
  return_index: function() {
    wx.navigateBack({
      
    })
  }
})