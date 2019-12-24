// pages/technology/technology.js
const WxParse = require('../../wxParse/wxParse.js');
let userId='';
let WXAPI=require('../../wxapi/main.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
     masterDetail:null,
     content:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    userId=options.id;
    WXAPI.getDetailInfo({userId}).then(res=>{
      //灯光使
        if (res.data.technologyOccupation == 1) {
          res.data.technologyOccupation = '灯光师'
        } else if (res.data.technologyOccupation == 2) {
          res.data.technologyOccupation = '音响师'
        } else if (res.data.technologyOccupation == 3) {
          res.data.technologyOccupation = '视频师'
        } else if (res.data.technologyOccupation == 4) {
          res.data.technologyOccupation = '项目经理'
        } else if (res.data.technologyOccupation == 5) {
          res.data.technologyOccupation = '搭建'
        } else if (res.data.technologyOccupation == 6) {
          res.data.technologyOccupation = '舞美设计'
        } else {
        }
      if (res.data.certificateImage){
        res.data.certificateImage = res.data.certificateImage.split(',');
        console.log(res.data.certificateImage);
      }else{
      
      }
      res.data.workCase = res.data.workCase.replace(/<img /g, '<img class="rich_img" ');
      res.data.workCase = res.data.workCase.replace(/<p /g, '<p class="rich_p" ');
      let content="";
      if (res.data.workCase){
       content = WxParse.wxParse('article', 'html', res.data.workCase, that, 5); 
      }else{
        content = WxParse.wxParse('article', 'html', `<p style="text-indent:1em">暂无案例</p>`, that, 5); 
      }
      that.setData({
        masterDetail: res.data,
        content:content
      });
     
    })
  },
  change: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.masterDetail.phone,
    })
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
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