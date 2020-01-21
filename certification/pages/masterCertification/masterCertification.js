// certification/pages/bossCertification/bossCertification.js
const WXAPI = require('../../wxapi/main');
const app = getApp();
let globalData = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picker: [],
    region: ['广东省', '广州市', '海珠区'],
    isClick:true
  },

  //  表单提交事件
  fromSubmit: function(e) {
    let that = this;
    let master = e.detail.value;
    let str = /^1\d{10}$/
    master.city = master.city[0] + master.city[1] + master.city[2]
    master.technologyOccupation = Number(master.technologyOccupation) + 1;
    if (!master.technologyOccupation) {
      wx.showToast({
        title: '大师类型必选',
        icon: 'none',
        image: '',
        duration: 1000
      })
      return;
    } else if (!master.city) {
      wx.showToast({
        title: '地址必选',
        icon: 'none',
        duration: 1000
      })
      return
    } else if (!master.workExperience) {
      wx.showToast({
        title: '工作年限必选且必须为数字',
        icon: 'none',
        duration: 1000
      })
      return
    } else if (!master.technologyAge) {
      wx.showToast({
        title: '年龄必选且必须为数字',
        icon: 'none',
        duration: 1000
      })
      return
    } else if (!master.mobile) {
      wx.showToast({
        title: '联系方式为必填哦',
        icon: 'none',
        duration: 1000
      })
      return
    } else if (!str.test(master.mobile)) {
      wx.showToast({
        title: '联系方式格式不正确',
        icon: 'none',
        duration: 1000
      })
      return
    }else if (!master.salary) {
      wx.showToast({
        title: '薪资为必填哦',
        icon: 'none',
        duration: 1000
      })
      return
    }
    globalData.addTechnology = master;
    wx.navigateTo({
      url: '/certification/pages/masterCertification/personal',
    })
  },
  // 取消
  fromReset: function(e) {
    wx.navigateBack({
      delta: 2
    })
  },
  // 下拉选择
  PickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },
  // 城市选择器
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  getTechnologyTypeList: function(e) {
    WXAPI.getTechnologyTypeList().then(res => {
      if (res.code == 200) {
        res.data = res.data.map(ele => {
          return ele.typeName
        })
        this.setData({
          picker: res.data
        })
      } else {
        wx.showToast({
          icon: "none",
          title: res.message,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getTechnologyTypeList();
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