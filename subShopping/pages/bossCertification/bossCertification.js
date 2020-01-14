// pages/bossCertification/bossCertification.js
const app = getApp();
const WXAPI = require('../../wxapi/main');
// import uploadImg from '../../xcomponents/uploadpic/up-pic.js'
let {
  SUCCESS
} = require('../../config/base.js');
let company = {};
let mulImage = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgBoolean: true,
    uploadedImages: [],
    imgs: [],
    list: '',
    upload_picture_list: [],
    mulImage: [],
    isClick: true
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
          upload_picture_list.push(tempFiles[i])
        }
        //显示
        that.setData({
          upload_picture_list: upload_picture_list,
        });
        that.uploadimage();
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
    if (!this.isClick) {
      wx.showToast({
        title: '请勿重复点击',
      })
    }
    let that = this;
    company = e.detail.value;
    company.userId = wx.getStorageSync('token').userId;
    // 验证表单信息
    if (!company.companyName) {
      wx.showToast({
        title: '公司名称不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (company.companyTaxnumber.length == 0) {
      wx.showToast({
        title: '公司税号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (company.contact.length == 0) {
      wx.showToast({
        title: '联系方式不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (company.contact.length != 11) {
      wx.showToast({
        title: '联系方式格式不正确',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!company.companyIntroduction) {
      wx.showToast({
        title: '公司介绍不能为空',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    if (mulImage) {
      company.companyProve = mulImage.join(',');
      wx.showLoading({
        title: '正在为您认证',
      })
      setTimeout(function() {
        wx.hideLoading();
      }, 2000)
      WXAPI.savebossCertification(company).then(res => {
        if (res.code == 200) {
          wx.setStorageSync('token', res.data);
          wx.setStorageSync('companyId', res.data.companyId);
          that.setData({
            isClick: false
          })
          wx.showToast({
            icon: "none",
            title: '恭喜您，认证成功',
            duration: 2000,
            success: function(e) {
              wx.navigateBack({
                delta: 2
              })
            }
          })
        } else {
          wx.showToast({
            title: res.msg,
          })
        }
      })
    } else {
      wx.showToast({
        title: '证明材料不能为空',
        icon: 'none',
        duration: 1000
      })
      return;
    }

  },
  // 点击上传图片
  uploadimage: function() {
    // console.log(this.data.upload_picture_list.length);
    var that = this;
    for (let i = 0; i < this.data.upload_picture_list.length; i++) {
      that.uploadFile(i).then(res => {
        mulImage.push(res.data);
      });
    }

  },
  uploadFile: function(i) {
    return new Promise((resolve, reject) => {
      const app = getApp();
      let filterName = {
        "filterName": "company"
      }
      wx.uploadFile({
        url: 'https://www.techwells.com/wumei-server/file/imageUpload',
        header: {
          'content-type': 'multipart/form-data'
        },
        filePath: this.data.upload_picture_list[i].path,
        formData: filterName,
        name: 'file', //name是后台接收到字段
        success: function(result) {
          console.log(result);
          const res = JSON.parse(result.data);
          res.status === -1 ? reject(res) : resolve(res);
        },
        fail: function(res) {}
      })
    });
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
    // this.myComponent = this.selectComponent('#myComponent')
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