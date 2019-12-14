// pages/publish/publish.js
const WXAPI = require('../../wxapi/main')
const app = getApp()

var fromList = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    uploadedImages: [],
    imgBoolean: true,
    isAgreement: false, // 是否显示用户协议
    submitBtn: false, // 是否允许投稿

    select: false,
    msg: '退票收取10%手续费',
    selectmsg: ['退票收取10%手续费', '不可退票'],
    selectArray: [{
      "text": '是'
    }, {
      "text": '否'
    }],

    item: '',
    headImage: '',
    title: '',
    beginTime: '2019-12-12',
    endTime: '2019-12-30',
    desc: '',
    advice: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //隐藏tabBar
    wx.hideTabBar()
  },

  chooseImage: function() {
    var that = this;
    // 选择图片
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({
          item: tempFilePaths[0],
          imgBoolean: false
        });
      }
    })
  },
  // 图片预览
  previewImage: function(e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: [current]
    })
    // console.log("这是1" + current);
  },
  //删除图片
  deleteImg: function(e) {
    var that = this;
    var images = that.data.uploadedImages;
    that.setData({
      uploadedImages: images,
      imgBoolean: true
    });
  },

  /*下拉菜单 */
  bindShowMsg() {
    this.setData({
      select: !this.data.select
    })
  },
  mySelect(e) {
    var name = e.currentTarget.dataset.name
    this.setData({
      msg: name,
      select: false
    })
  },

  map: function() {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      }
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      beginTime: e.detail.value
    })
  },
  bindDateChanges: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endTime: e.detail.value
    })
  },


  fromSubmit: function(e) {
    console.log(e)
    this.setData({

    })
    const that = this;
    const wxreq = wx.request({
      url: '',
      data: {

      },
      method: 'POST',
      header: {
        'Content-Type': "application/x-www-form-urlencoded",
        'Cookie': 'SESSION=' + wx.getStorageSync("sessionId")
      }, // 设置请求的 header 
      success: function(res) {
        console.log("提交任务成功");
        wx.navigateTo({ //页面跳转
          url: '',
        })
        wx.showModal({ //提示弹框
          title: '提示',
          content: '提交成功，请耐心等待审核。',
          showCancel: false, //是否显示取消按钮 
          fail: function(res) {}, //接口调用失败的回调函数
          complete: function(res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
        })
      },
      fail: function() {
        console.log("请求数据失败");
      }
    })

  },

  submit: function(e) {
    console.log(e)
    if (e.detail.target.dataset.type == 1) {
      this.xxxx()
    } else if (e.detail.target.dataset.type == 2) {
      this.cccc()
    } else {
      this.bbbb()
    }
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
  onShareAppMessage: function() {},

  showAgreement: function() {
    let that = this;
    if (that.data.isAgreement) {
      that.setData({
        isAgreement: false
      });
    } else {
      that.setData({
        isAgreement: true
      });
    }
  },

  // 同意用户协议
  agreeMent: function(event) {
    let that = this;
    if (event.detail.value == "true") {
      that.setData({
        submitBtn: false
      });
    } else {
      that.setData({
        submitBtn: true
      });
    }
  },


})