// pages/search/search.js
Page({
  data: {
    hot_key: ['crushh', '连衣裙', '口红红', '榴莲', '草莓', '一个超级长的关键词', '前面的还不够长我再加一个'],
    recent_key: [],
    delete_recent: false,
    inputValue: '',
    search_detail: [],
    pageNum: 1,
    pageSize: 10,
    goods: [],

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
  delete_recent: function () {
    const that = this;
    wx.removeStorage({
      key: 'history',
      success(res) {
        that.setData({
          recent_key: []
        })
      }
    })
  },
  return_index: function () {
    wx.navigateBack()
  },
  get_history: function () {
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
  build_history: function (e) {

    //建立历史记录表
    this.setData({
      inputValue: e.detail.value
    })

    const inputValue = this.data.inputValue;
    let history = this.data.recent_key;
    history.push(inputValue)

    wx.setStorage({
      key: 'history',
      data: history
    })

    this.get_history();//把storage的数据存到data里
  },
  getGoodsList: function (e) {
    const that = this;
    that.build_history(e);
    wx.navigateTo({
      url: '/pages/search-detail/search-detail?search_name=' + e.detail.value
    })


  }
})