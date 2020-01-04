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

  },
  onLoad: function(options) {
    let type = options.type;
    console.log(type);
    this.setData({
      searchType: type
    })
  },
  inputBind: function(e) {
    this.setData({
      searchValue: e.detail.value
    })

  },
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
        activityTheme: that.data.searchValue
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
        commodityName: that.data.searchValue
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
    console.log(data);
  },
  return_index: function() {
    wx.navigateBack({
      
    })
  }
})