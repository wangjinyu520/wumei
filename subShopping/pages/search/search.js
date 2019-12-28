// pages/search/search.js
let WXAPI=require('../../wxapi/main.js')
Page({
  data: {
   searchValue:'',
   page:1,
   pageSize:6
  },
  onLoad: function () {
    const that = this;
    wx.getStorage({
      key: 'history',
      success: function (res) {
        that.setData({
          recent_key: res.data
        });
      }
    });
  },
  inputBind:function(e){
    this.setData({
      searchValue:e.detail.value
    })

  },
  getActivityInfo: function (e) {
    this.setData({
      searchValue: e.detail.value
    })
    var that = this;
    let data = {
      pageNum: that.data.page,
      pageSize: that.data.pageSize,
      activityTheme:that.data.searchValue
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
          }else{
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
  return_index:function(){
   wx.navigateTo({
     url: '/subShopping/pages/activity/activity',
   
   })
  }
})