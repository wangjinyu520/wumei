// pages/rent/rent.js
const WXAPI = require('../../wxapi/main')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {
      addflag: true, //判断是否显示搜索框右侧部分
      addimg: '../../assets/images/mall/cart.png',
      searchstr: ''
    },

    titles: ["推荐", "最新"],
    selectArray: [{
        "id": "1",
        "text": "全部"
      },
      {
        "id": "2",
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
    selectArray1: [{
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

    pageSize: 6,
    page: 1,
    location: '',
    commodityType:'',
    createDate: '',
    recommend: 1,
    contentlist:null,
    banners:[],
  
  },
  // 搜索
  turn_search: function () {
    wx.navigateTo({
      url: "/subShopping/pages/search/search?type=commodity"
    })
  },
  // 获取租赁的类型
  selectedItem: function(e) {
    console.log(e.detail.index);

    this.setData({
      commodityType: e.detail.index,
      page:1
    })
    if (e.detail.index == 0) {
      this.setData({
        commodityType: ''
      })
    }
    this.getCommodity();
  },
  // 获取地址
  selectedItem1: function(e) {
    console.log(e.detail.selectedTitle);
    this.setData({
      location: e.detail.selectedTitle,
      page:1
    })
    if (e.detail.index == 0) {
      this.setData({
        location: ''
      })
    }
    this.getCommodity();
  },
  // 切换最新和推荐
  tabClick(e) {
    console.log(e.detail);
    console.log(e);
    // 1.根据当前的点击赋值最新的currentType
    // let currentType = ''
    switch (e.detail.index) {
      case 0:
        this.setData({
          recommend: 1,
          createDate: '',
          page:1
        })
        break
      case 1:
        this.setData({
          createDate: "true",
          recommend:'',
          page: 1

        })
        break
    }
    this.getCommodity();

  },
  // 获取租赁的数据
  getCommodity: function(e) {
    var that = this;
    let data = {
      pageNum: that.data.page,
      pageSize: that.data.pageSize,
      createDate: that.data.createDate,
      location: that.data.location,
      commodityType: that.data.commodityType,
      recommend: that.data.recommend,

    };
    WXAPI.getCommodity(data).then(res => {
      console.log(res.data);
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
  // 获取轮播接口
  getBannerList: function (e) {
    let that = this;
    let data = {
      pageNum: 1,
      pageSize: 2
    }
    WXAPI.getBannerList(data).then(res => {
      console.log(res)
      if (res.code == 200) {
        that.setData({
          banners: res.data
        })
      } else {
        wx.showToast({
          title: res.message,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCommodity();
    this.getBannerList();
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