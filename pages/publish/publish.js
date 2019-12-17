// pages/publish/publish.js
const WXAPI = require('../../wxapi/main')
const app = getApp()
let globalData = app.globalData;
var fromList = null;
let activity = null;
let activityForm = null;
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
    selectArray: ['是', '否'],
    item: '',
    headImage: '',
    title: '',
    beginTime: '2019-12-12',
    endTime: '2019-12-30',
    desc: '是',
    advice: '',
    currentTicket: '',
    selectdiplay: false,
    selectdiplays: false
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
  changeshow: function() {

    this.setData({
      msg: '',
      selectdiplay: !this.data.selectdiplay
    })
    console.log(this.data.selectdiplay);
  },
  changeshows: function() {
    this.setData({
      desc: '',
      selectdiplays: !this.data.selectdiplays
    })
  },

  mySelect(e) {
    var name = e.currentTarget.dataset.name
    this.setData({
      msg: name,
      selectdiplay: false
    })
  },
  mySelects(e) {
    var name = e.currentTarget.dataset.name
    this.setData({
      desc: name,
      selectdiplays: false
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
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      beginTime: e.detail.value
    })
  },
  bindDateChanges: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endTime: e.detail.value
    })
  },
  // 退票
  optionTap: function(e) {

  },
  // 表单提交
  fromSubmit: function(e) {
    activity = e.detail.value;
    activity.activityStartTime = this.data.beginTime;
    activity.activityEndTime = this.data.endTime;
    console.log(this.data.currentTicket);
    activity.activityFee = this.data.currentTicket;
    activity.refundRule = this.data.msg == "退票收取10%手续费" ? 1 : 0;
    activity.trafficPlan = this.data.desc == "是" ? 1 : 0;
    activity.refundRule = this.data.msg == "退票收取10%手续费" ? 1 : 0;
    activity.refundRule = this.data.msg == "退票收取10%手续费" ? 1 : 0;
    activity.ticket = globalData.ticket;
    let obj = {};
    globalData.concatlist.forEach((v, i) => {
      obj[i] = v
    })
    activityForm = JSON.stringify(obj);
    // console.log(company);
    // company.userId = wx.getStorageSync('token').userId;
    this.uploadimage();
    // console.log(bossList);
  },
  //上传图片
  uploadimage: function() {
    // console.log(this.data.upload_picture_list.length);

    var that = this;
    let data = {
      activity: {
        activity
      },
      activityForm
    };
    console.log(data);
    // wx.uploadFile({
    //   url: 'http://10.20.11.126:8080/wumei-server/company/addCompany',
    //   header: {
    //     'content-type': 'multipart/form-data'
    //   },
    //   filePath: this.data.item,
    //   name: 'logo',//name是后台接收到字段
    //   formData: data,
    //   success: function (res) {
    //     console.log(res)
    //   },
    //   fail: function (res) {
    //     console.log(res)
    //   }
    // })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let token = wx.getStorageSync('token');
    if (!token.companyId) {
      wx.showModal({
        title: '',
        content: '只有主办方才能够发布活动，是否申请为主办方',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/bossCertification/bossCertification',
            })
          } else if (res.cancel) {
            wx.switchTab({
              url: '/pages/home/home',
            })
          }
        }
      })

    }
    var that = this;
    //隐藏tabBar
    wx.hideTabBar();
    this.setData({
      currentTicket: globalData.curentTicket ? globalData.curentTicket:'免费'
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
    console.log(globalData.curentTicket);
    this.setData({
      currentTicket: globalData.curentTicket ? globalData.curentTicket : '免费'
    })
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