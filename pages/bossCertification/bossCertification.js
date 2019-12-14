// pages/bossCertification/bossCertification.js
const app = getApp();
const WXAPI = require('../../wxapi/main');
let {
  SUCCESS
} = require('../../config/base.js');
let company={};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgBoolean: true,
    uploadedImages: [],
    imgs: [],
    list: '',
    upload_picture_list: []
  },
  //选择图片方法
  uploadpic: function(e) {
    let that = this //获取上下文
    let upload_picture_list = that.data.upload_picture_list
    //选择图片
    wx.chooseImage({
      count: 8, // 默认9，这里显示一次选择相册的图片数量 
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) { // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
        let tempFiles = res.tempFiles
        //把选择的图片 添加到集合里
        for (let i in tempFiles) {
          // tempFiles[i]['upload_percent'] = 0
          // tempFiles[i]['path_server'] = ''
          upload_picture_list.push(tempFiles[i])
        }
        //显示
        that.setData({
          upload_picture_list: upload_picture_list,
        });
        console.log(upload_picture_list);
      }
    })
  },

  // 点击删除图片
  deleteImg(e) {
    let upload_picture_list = this.data.upload_picture_list;
    let index = e.currentTarget.dataset.index;
    upload_picture_list.splice(index, 1);
    this.setData({
      upload_picture_list: upload_picture_list
    });
  },
  // 预览图片
  previewImg(e) {
    //获取当前图片的下标
    let index = e.currentTarget.dataset.index;
    //所有图片
    let imgs = this.data.imgs;
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  },
  // 手机号部分

  inputPhoneNum: function(e) {
    let phoneNumber = e.detail.value
    if (phoneNumber.length === 11) {
      let checkedNum = this.checkPhoneNum(phoneNumber)
    } else {
      wx.showToast({
        title: '手机号不正确',
      })
    }
  },
  checkPhoneNum: function(phoneNumber) {
    let str = /^1\d{10}$/
    if (str.test(phoneNumber)) {
      return true
    } else {
      wx.showToast({
        title: '手机号不正确',
      })
      return false
    }
  },
  //  表单提交事件
  fromSubmit: function(e) {
    // console.log(bossList);
    company = e.detail.value;
    company.userId = wx.getStorageSync('token').userId;
    this.uploadimage();
    // console.log(bossList);
  },
  // 点击上传图片
  uploadimage: function() {
    // console.log(this.data.upload_picture_list.length);
    var that = this;
    for (let i = 0; i < this.data.upload_picture_list.length; i++) {
      wx.uploadFile({
        url: 'http://10.20.11.126:8080/wumei-server/company/addCompany',
        header: {
          'content-type': 'multipart/form-data'
        },
        filePath: this.data.upload_picture_list[i].path,
        name: 'prove',//name是后台接收到字段
        formData: company,
        success: function(res) {
          console.log(res)
        },
        fail: function(res) {
          console.log(res)
        }
      })
    }

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