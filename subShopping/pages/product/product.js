// pages/product/product.js
const WXAPI = require('../../wxapi/main')
const WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    imgList: ['http://www.techwells.com/wumei-upload/image/1577518950031tmp_49324e776471e4b13151fadcefdc6e6bd092504bf756815a.jpg', 'http://www.techwells.com/wumei-upload/image/1577518940946tmp_1f9fb6f3fbfb1b8c46478864be6862b915c77e1252bd2357.jpg'],
    commodityDetail:null,
    collectText: '收藏',
    isCollect: false,
  },
  // 收藏
  haveSave: function () {
    let data = {
      userId: wx.getStorageSync('token').userId,
      relationId: this.data.commodityDetail.commodityId,
      collectType: 3
    }
    WXAPI.saveActivity(data).then(res => {
      if (res.code == 200) {
        this.setData({
          collectText: '已收藏',
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
      relationId: this.data.commodityDetail.commodityId,
      collectType: 3
    }
    WXAPI.nosaveActivity(data).then(res => {
      if (res.code == 200) {
        this.setData({
          collectText: '收藏',
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
  // 查看公司
  seeCompany:function(e){
    let companyId=this.data.commodityDetail.companyId;
     wx.navigateTo({
       url: '/subShopping/pages/company/company?companyId=' + companyId,
       success: function(res) {},
       fail: function(res) {},
       complete: function(res) {},
     })
  },
  // 联系商家
  goPhone: function (e) {
    wx.makePhoneCall({
      phoneNumber: this.data.commodityDetail.companyContact,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    let that = this;
    let data = {
      commodityId: options.commodityId,
      userId:wx.getStorageSync('token').userId,
      queryType:1
    }
    WXAPI.getCommodityById(data).then(res => {
      console.log(res)
      if (res.code == 200) {
        if (res.data.collectId) {
          that.setData({
            collectText: '已收藏',
            isCollect: true,
          })
        } else {
          that.setData({
            collectText: '收藏',
            isCollect: false,
          })
        }
        res.data.introduce = res.data.introduce.replace(/<img /g, '<img class="rich_img" ');
        res.data.introduce = res.data.introduce.replace(/<p/g, '<p class="rich_p" ');
        let content = "";
        if (res.data.introduce) {
          content = WxParse.wxParse('article', 'html', res.data.introduce, that, 5);

        } else {
          content = WxParse.wxParse('article', 'html', `<p style="text-indent:1em">暂无介绍</p>`, that, 5);
        }

        // globalData.cartActivityInfo = res.data;
        // ticketsnum = res.data.ticket.startingAt;

        // price = res.data.activityFee;
        // totalPrice = ticketsnum * price;
      that.setData({
        commodityDetail: res.data,
        // collectId: res.data.collectId,
        // tickets: res.data.ticket,
        // ticketsnum: res.data.ticket.startingAt,
        // totalPrice: totalPrice,
        // content: content
      })
        // console.log(that.data.activityDetailList);

        // globalData.activityForm = res.data.activityForm;
      }
    })
  },

  show: function() {
    this.setData({
      showModal: true
    })
  },

  preventTouchMove: function() {

  },


  go: function() {
    this.setData({
      showModal: false
    })
  },

  tel: function() {
    wx.makePhoneCall({
      phoneNumber: '158XXXXXXXX',
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