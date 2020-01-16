// subShopping/pages/masterDetail/masterDetail.js
let userId = '';
let WXAPI = require('../../wxapi/main.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentId: '0',
    section: [{
      name: '图片资源',

    }, {
      name: '服务案例',

    }, {
      name: '用户评价',

    }],
    masterDetail:null,//大师详情
    isCollect:false,
  },
  //联系大师
  goPhone: function (e) {
    wx.makePhoneCall({
      phoneNumber: this.data.masterDetail.phone,
    })
  },
  // 收藏
  haveSave: function () {
    let data = {
      userId: wx.getStorageSync('token').userId,
      relationId: this.data.masterDetail.userId,
      collectType: 4
    }
    WXAPI.saveActivity(data).then(res => {
      if (res.code == 200) {
        this.setData({
          isCollect: true,
        })
        wx.showToast({
          title: res.message,
        })
      } else {
        wx.showToast({
          title: res.message,
        })
      }
    })

  },
  // 取消收藏
  noSave: function () {
    let data = {
      userId: wx.getStorageSync('token').userId,
      relationId: this.data.masterDetail.userId,
      collectType: 4  //收藏类型
    }
    WXAPI.nosaveActivity(data).then(res => {
      if (res.code == 200) {
        this.setData({
          isCollect: false,
        })
        wx.showToast({
          title: res.message,
        })
      } else {
        wx.showToast({
          title: res.message,
        })
      }
    })

  },

  //点击每个导航的点击事件
  handleTap: function(e) {
    let id = e.currentTarget.id;
    if (id) {
      this.setData({
        currentId: id
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    userId = options.id;
    WXAPI.getDetailInfo({ userId }).then(res => {
      console.log(res)
      that.setData({
        masterDetail: res.data,
      });

    })
  },
  goIntoduce:function(e){
    let value = this.data.masterDetail.personalIntroduce;
    wx.navigateTo({
      url: '/subShopping/pages/masterDetail/introduce?value=' + value
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