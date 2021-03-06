// pages/report/report.js
const app = getApp()
const WXAPI = require('../../wxapi/main')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [{
        name: '发布不适当内容。'
      },
      {
        name: '存在欺诈骗钱行为。'
      },
      {
        name: '此账号可能被盗用了。',
        checked: 'true'
      },
      {
        name: '存在侵权行为。'
      }
    ],

    imgbox: '' //上传图片

  },

  // 获取多选框list中选中的值和对应的id
  checkboxChange: function(e) {
    var text = [];
    var id = [];
    for (var i = 0; i < e.detail.value.length; i++) {
      var aaa = e.detail.value[i].split(',');
      text = text.concat(aaa[0])
      id = id.concat(aaa[1])
    }
    console.log(text)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },

  // 删除照片 &&
  imgDelete1: function(e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgbox = this.data.imgbox;
    imgbox.splice(index, 1)
    that.setData({
      imgbox: imgbox
    });
  },
  // 上传图片 &&&
  addPic1: function(e) {
    var imgbox = this.data.imgbox;
    console.log(imgbox)
    var picid = e.currentTarget.dataset.pic;
    console.log(picid)
    var that = this;
    var n = 9;
    if (9 > imgbox.length > 0) {
      n = 9 - imgbox.length;
    } else if (imgbox.length == 9) {
      n = 1;
    }
    wx.chooseImage({
      count: n, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths

        if (imgbox.length == 0) {
          imgbox = tempFilePaths
        } else if (9 > imgbox.length) {
          imgbox = imgbox.concat(tempFilePaths);

        } else {
          imgbox[picid] = tempFilePaths[0];
        }
        that.setData({
          imgbox: imgbox
        });
      }
    })
  },



  click: function(e) {
    const value = e.currentTarget.dataset.value
    console.log("value：" + value)
  },

  fromReport: function(e) {
    console.log(e.detail.value);
    const checkbox = e.detail.value.checkbox;
    const input = e.detail.value.input;
    const imgbox = e.detail.value.imgbox;
    const that = this;

    wx.request({
      url: 'http://101.133.164.180:8080/wumei-server/report/addReport',
      data: {
        checkbox,
        input,
        imgbox
      },
      header: {
        'Content-Type': "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log(res.data)
        that.setData({
          newsList: res.data.result
        })
      },
      fail: function(err) {
      }
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