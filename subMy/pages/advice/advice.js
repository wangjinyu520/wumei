// pages/advice/advice.js
const app = getApp()
const WXAPI = require('../../wxapi/main')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgbox: '', //上传图片,
    detailHtml: '',
    picList: []
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
    }).exec()
  },
  getContent() {
    this.editorCtx.getContents({
      success: (res) => {
        this.setData({
          detailHtml: res.html
        })
      },
      fail: (res) => {
        // console.log(res);
      }
    });
  },
  onStatusChange(e) {
    const formats = e.detail
    // console.log(formats);
    this.setData({
      formats
    })

  },
  //富文本插入图片
  insertImage() {
    const that = this
    let picList = that.data.picList;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        // console.log(res.tempFiles);
        let tempFiles = res.tempFiles[0].path;
        //把选择的图片 添加到集合里
        //显示
        wx.uploadFile({
          url: 'https://www.techwells.com/wumei-server/file/imageUpload',
          header: {
            'content-type': 'multipart/form-data'
          },
          filePath: tempFiles,
          name: 'file', //name是后台接收到字段
          success: function (res) {
            // console.log(res.data);
            let str = JSON.parse(res.data);
            if (str.code == 200) {
              // console.log(str.data)
              that.editorCtx.insertImage({
                src: str.data,
                success: function () { }
              });
            } else {
              wx.showToast({
                title: str.message,
              })
            }
          },
          fail: function (res) { }
        })
      }
    })
  },
  // 表单提交
  fromReport: function (e) {
    let that=this;
    let data = {
      userId: wx.getStorageSync("token").userId,
      content: this.data.detailHtml
    }
    WXAPI.addFeedback(data).then(res => {
      console.log(res);
      if (res.code == 200) {
        wx.showToast({
          icon:"none",
          title: res.message,
        })
        that.editorCtx.clear();
      }else{
        wx.showToast({
          icon:"none",
          title: res.message,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载R
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})