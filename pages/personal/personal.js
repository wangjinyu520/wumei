// pages/personal/personal.js
const WXAPI = require('../../wxapi/main')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    uploadedImages: [],
    imgBoolean: true,

    sexIndex: 0,
    arraySex: ['男', '女'],
    arrayAge: ['10', '18', '20', '22', '30', '40', '50', '60'],
    ageIndex: 0,

    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',

    item: '',
    headImage: '',
    name:'',
    desc:''
  },

  bindSexChange: function(e) {
    console.log('pickerSex发送选择改变，携带值为', e.detail.value);
    const sex = e.detail.value;
    this.setData({
      sexIndex: e.detail.value
    })
  },

  bindAgeChange: function(e) {
    console.log('pickerAge发送选择改变，携带值为', e.detail.value)
    this.setData({
      ageIndex: e.detail.value
    })
  },

  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  chooseImage: function() {
    var that = this;
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
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
    console.log("这是1" + current);
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

  fromSubmit: function (e) {
    console.log(e)
    this.setData({
      headImage: e.detail.value.headImage,
      name: e.detail.value.name,
      sexIndex: e.detail.value.sexIndex,
      ageIndex: e.detail.value.ageIndex,
      region: e.detail.value.region,
      dsrc: e.detail.value.desc
    })
    console.log(this.data.regionIndex)
    const that=this;
    const wxreq = wx.request({
      url: 'http://10.20.11.126:8080/wumei-server/user/modifyUser',
      data: {
        'headImage': that.data.item,
        'name': that.data.name,
        'sexIndex': that.data.sexIndex,
        'ageIndex': that.data.ageIndex,
        'region': that.data.region,
        'desc': that.data.desc
      },
      method: 'POST',
      header: {
        'Content-Type': "application/x-www-form-urlencoded",
        'Cookie': 'SESSION=' + wx.getStorageSync("sessionId")
      }, // 设置请求的 header 
      success: function (res) {
        console.log("提交成功");
        wx.navigateTo({//页面跳转
          url: '/pages/prefile/prefile',
        })
        wx.showModal({//提示弹框
          title: '提示',
          content: '提交成功，请耐心等待审核。',
          showCancel: false, //是否显示取消按钮 
          fail: function (res) { }, //接口调用失败的回调函数
          complete: function (res) { }, //接口调用结束的回调函数（调用成功、失败都会执行）
        })
      },
      fail: function () {
        console.log("请求数据失败");
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

  },

  /*
   *图片上传
   **/
  /*chooseImage: function () {
    var that = this;
    //选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths[0]
        that.setData({
          showImage_url: tempFilePaths
        })
        //图片上传
        wx.uploadFile({
          url: '/user/modifyUser',//调用后台接口的路径
          method: 'POST',
          filePath: that.data.showImage_url,
          name: 'file',//此处注意要与后台保持一致
          header: {
            "Content-Type": false,
          },
          //formdata:adds,
          success: function (res) { }
        })
      }
    })
  },

  fromSubmit: function (e) {
    this.setData({
      headimage: e.detail.value.headImage,
      name: e.detail.value.name,
      sex: e.detail.value.array[sexIndex],
      age: e.detail.value.array[ageIndex],
      region: e.detail.value.array[region],
      dsrc : e.detail.value.desc
    })
    const wxreq = wx.request({
      url: '/user/modifyUser',
      data: {
        'headImage': this.data.showImage_url,
        'name': this.data.name,
        'sex': this.data.array[sexIndex],
        'age': this.data.array[ageIndex],
        'region': this.data.array[regionIndex],
        'desc':this.data.desc
      },
      method: 'POST', 
      header: {
        'Content-Type': "application/x-www-form-urlencoded",
        'Cookie': 'SESSION=' + wx.getStorageSync("sessionId")
      }, // 设置请求的 header 
      success: function (res) {
        console.log("提交任务成功");
        wx.navigateTo({//页面跳转
          url: '/pages/prefile/prefile',
        })
        wx.showModal({//提示弹框
          title: '提示',
          content: '提交成功，请耐心等待审核。',
          showCancel: false, //是否显示取消按钮 
          fail: function (res) { }, //接口调用失败的回调函数
          complete: function (res) { }, //接口调用结束的回调函数（调用成功、失败都会执行）
        })
      },
      fail: function () {
        console.log("请求数据失败");
      }
    })

  },*/


/*
  formSubmit: function(e) {
    var id = e.target.id;
    data = JSON.parse(e.detail.value);
    data.name = this.data.name
    data.sexIndex = this.data.array[sexIndex]
    data.ageIndex = this.data.array[ageIndex]
    data.region = this.data.array[region]
    data.dsrc = this.data.desc
    this.upload()
  },
  upload: function() {
    const that = this 
    wx.uploadFile({
      url: '/user/modifyUser',
      filePath: that.chooseImage.item,
      name: 'file', //文件对应的参数名字(key)
      formData: data, //其它的表单信息
      success: function(res) {
        console.log(rse)
        if(res){
          wx.showToast({
            title: '提交成功',
          })
        }
      }
    })
    this.setData({
      formdata: ''
    })
  },
*/


})