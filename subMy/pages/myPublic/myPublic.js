// subMy/pages/myPublic/myPublic.js
const WXAPI = require('../../wxapi/main')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    pageSize: 6,
    contentlist: null,
    modalName: "",
    deleteId: ''
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target,
      deleteId: e.currentTarget.dataset.id
    })
  },

  submitDelete(e) {
    let that = this;
    let data = {
      demandId: that.data.deleteId
    }
    WXAPI.deleteDemand(data).then(res => {
      if (res.code == 200) {
        that.data.contentlist.splice(e.currentTarget.dataset.index, 1);
        that.setData({
          modalName: null
        })
      }
    })
  },
  toEditer(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/subMy/pages/editorRemad/editorRemad?id='+id,
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  getMusicInfo: function() {
    var that = this;
    let data = {
      pageNum: this.data.page,
      pageSize: this.data.pageSize,
      userId: wx.getStorageSync('token').userId
    }
    WXAPI.getMyDemand(data).then(res => {
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
              hasMoreData: true
            })
          } else {
            that.setData({
              contentlist: contentlistTem.concat(contentlist),
              hasMoreData: false,
              page: that.data.page + 1
            })
            console.log(that.data.page)
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
    this.getMusicInfo();
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
    this.data.page = 1
    this.getMusicInfo()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
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