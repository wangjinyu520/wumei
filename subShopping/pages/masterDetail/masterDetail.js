// subShopping/pages/masterDetail/masterDetail.js
let userId = '';
let WXAPI = require('../../wxapi/main.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentId: '0',
    section: [{
      name: '图片资源',

    }, {
      name: '服务案例',

    }, {
      name: '用户评价',

    }],
    masterDetail: null, //大师详情
    isCollect: false,
    caseList: [], //案例列表
    imgHuo: false,
    imgTime: false,
    createTime: 0,
    pvCount: 0,
    page: 1,
    pageSize: 50,
    contentlist: null, //图片列表



    // 下单的部分
    shopType: '',
    hideShopPopup: true,
    startDate: '',
    endDate: '',
    totalDay: 0
  },
  // 打电话

  goPhone: function(e) {
    wx.makePhoneCall({
      phoneNumber: this.data.masterDetail.phone,
    })

  },
  //选择日期
  DateChange(e) {
    console.log(e)
    this.setData({
      startDate: e.detail.value
    })
    this.checkDate(this.data.startDate, this.data.endDate)
  },
  endDateChange(e) {
    this.setData({
      endDate: e.detail.value
    })
    this.checkDate(this.data.startDate, this.data.endDate)
  },
  checkDate: function(startTime, endTime) {
    //日期格式化
    var start_date = new Date(startTime.replace(/-/g, "/"));
    var end_date = new Date(endTime.replace(/-/g, "/"));
    //转成毫秒数，两个日期相减
    var ms = end_date.getTime() - start_date.getTime();
    if (ms > 0) {
      //转换成天数
      var day = parseInt(ms / (1000 * 60 * 60 * 24));
      //do something
      this.setData({
        totalDay: day
      })
    } else {
      wx.showToast({
        icon:'none',
        title: '开始时间应该在结束时间之前',
      })
    }

  },
  // 立即下单
  tobuy: function() {
    if (wx.getStorageSync('token')) {
      this.setData({
        shopType: "tobuy"
      });
      this.bindGuiGeTap();
    } else {
      wx.showToast({
        title: '您还未登录请先登录',
      })
      wx.switchTab({
        url: '/pages/profile/profile',
      })
    }

  },
  /**
   * 立即购买
   */
  buyNow: function() {
    let that = this;
    if (!that.data.startDate && !that.data.endDate) {
      wx.showToast({
        title: '请选择服务时间',
      })
      return;
    }
    setTimeout(function() {
      wx.hideLoading();
      //组建立即购买信息
      let totalPrice = that.data.totalDay * that.data.masterDetail.salary;
      console.log(totalPrice);
      var buyNowInfo = {
        userId: wx.getStorageSync('token').userId,
        technologyInfo: that.data.masterDetail,
        startDate: that.data.startDate,
        endDate: that.data.endDate,
        amount: that.data.totalDay,
        totalPrice: totalPrice
      }
      // 写入本地存储
      wx.setStorageSync('buyNowInfo', buyNowInfo)
      that.closePopupTap();
      wx.navigateTo({
        url: "/subShopping/pages/pay-order/pay-order"
      })
    }, 1000);
    wx.showLoading({
      title: '商品准备中...',
    })

  },
  // 显示弹窗
  bindGuiGeTap: function() {
    this.setData({
      hideShopPopup: false
    })
  },
  /**
   * 规格选择弹出框隐藏
   */
  closePopupTap: function() {
    this.setData({
      hideShopPopup: true
    })
  },
  //按热度排名
  huoSort: function(e) {
    let that = this;
    if (this.data.imgHuo) {
      this.setData({
        imgHuo: false,
        pvCount: 0,
      })
    } else {
      if (this.data.imgTime)
        this.setData({
          imgHuo: true,
          pvCount: 1,
          imgTime: false,
          createTime: 0,
        })
    }
    console.log(this.data.pvCount);
    let data = {
      pageNum: this.data.page,
      pageSize: this.data.pageSize,
      technologyId: this.data.masterDetail.userId,
      pvCount: Number(this.data.pvCount),
      createTime: 0
    }
    WXAPI.getTechnologyCaseList(data).then(res => {
      console.log(res.data)
      if (res.code == 200) {
        var contentlistTem = that.data.contentlist //总的数据列表
        if (res.data) {
          if (that.data.page == 1) {
            contentlistTem = []
          }
          var contentlist = res.data //contentlist每次返回的个数
          if (contentlist.length < that.data.pageSize) {
            that.setData({
              contentlist: contentlistTem.concat(contentlist),
              hasMoreData: true
            })
          } else {
            that.setData({
              contentlist: contentlistTem.concat(contentlist),
              hasMoreData: false,
              page: that.data.page + 1
            })
            console.log(that.data.page)
          }
        } else {
          that.setData({
            contentlist: null
          })
        }
      }
      console.log(that.data.contentlist)
    })


  },
  //按热度排名
  timeSort: function(e) {
    let that = this;
    if (this.data.imgTime) {
      this.setData({
        imgTime: false,
        createTime: 0,
      })
    } else {
      if (this.data.imgHuo)
        this.setData({
          imgHuo: false,
          pvCount: 0,
          imgTime: true,
          createTime: 1,
        })
    }
    let data = {
      pageNum: this.data.page,
      pageSize: this.data.pageSize,
      technologyId: this.data.masterDetail.userId,
      pvCount: 0,
      createTime: Number(this.data.createTime)
    }
    WXAPI.getTechnologyCaseList(data).then(res => {
      if (res.code == 200) {
        var contentlistTem = that.data.contentlist //总的数据列表
        if (res.data) {
          if (that.data.page == 1) {
            contentlistTem = []
          }
          var contentlist = res.data //contentlist每次返回的个数
          if (contentlist.length < that.data.pageSize) {
            that.setData({
              contentlist: contentlistTem.concat(contentlist),
              hasMoreData: true
            })
          } else {
            that.setData({
              contentlist: contentlistTem.concat(contentlist),
              hasMoreData: false,
              page: that.data.page + 1
            })
            console.log(that.data.page)
          }
        } else {
          that.setData({
            contentlist: null
          })
        }
        console.log(that.data.contentlist);
      }
    })


  },
  //联系大师
  goPhone: function(e) {
    wx.makePhoneCall({
      phoneNumber: this.data.masterDetail.phone,
    })
  },
  // 收藏
  haveSave: function() {
    let data = {
      userId: wx.getStorageSync('token').userId,
      relationId: this.data.masterDetail.userId,
      collectType: 4
    }
    WXAPI.saveActivity(data).then(res => {
      if (res.code == 200) {
        this.setData({
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
  noSave: function() {
    let data = {
      userId: wx.getStorageSync('token').userId,
      relationId: this.data.masterDetail.userId,
      collectType: 4 //收藏类型
    }
    WXAPI.nosaveActivity(data).then(res => {
      if (res.code == 200) {
        this.setData({
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

  //点击每个导航的点击事件
  handleTap: function(e) {
    let id = e.currentTarget.id;
    if (id) {
      this.setData({
        currentId: id
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    userId = options.id;
    WXAPI.getDetailInfo({
      userId
    }).then(res => {
      console.log(res)
      that.setData({
        masterDetail: res.data,
        caseList: res.data.caseList,
        contentlist: res.data.caseList,
      });
      console.log(res.data.caseList)

    })
  },
  goIntoduce: function(e) {
    let value = this.data.masterDetail.personalIntroduce;
    wx.navigateTo({
      url: '/subShopping/pages/masterDetail/introduce?value=' + value
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