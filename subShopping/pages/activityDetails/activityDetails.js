// pages/activityDetails/activityDetails.js
const WXAPI = require('../../wxapi/main');
const WxParse = require('../../wxParse/wxParse.js');
let ticketsnum = '';
let minticketsnum = '';
let maxticketsnum = '';
let amount = '';
let totalPrice='';
let price='';
const app = getApp()
let globalData = app.globalData;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activityDetailList: [],
    pageSize: 9,
    page: 1,
    popularActivity: [],
    focusText: '关注',
    collectText: '收藏',
    focusKeyed: true,   //关注的状态
    isCollect: false,   //收藏的状态
    collectId: '',
    tickets: null,
    ticketsnum: 1,
    addbtn: true,
    reducebtn: true,
    totalPrice:0,
    content:'',

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    let data = {
      activityId: options.activityId,
      userId: wx.getStorageSync('token').userId
    }
    WXAPI.getActivityDetails(data).then(function(res) {
      console.log(res.data)
      if (res.code == 200) {
        if (res.data.focusId) {
          that.setData({
            focusText: '取消关注',
            focusKeyed: false,
          })
        } else {
          that.setData({
            focusText: '关注',
            focusKeyed: true,
          })
        }
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
        res.data.activityIntroduce = res.data.activityIntroduce.replace(/<img /g, '<img class="rich_img" ');
        res.data.activityIntroduce = res.data.activityIntroduce.replace(/<p/g, '<p class="rich_p" ');
        let content = "";
        if (res.data.activityIntroduce) {
          content = WxParse.wxParse('article', 'html', res.data.activityIntroduce, that, 5);

        } else {
          content = WxParse.wxParse('article', 'html', `<p style="text-indent:1em">暂无介绍</p>`, that, 5);
        }
      
        globalData.cartActivityInfo=res.data;
        ticketsnum=res.data.ticket.startingAt;

        price = res.data.activityFee;
        totalPrice = ticketsnum*price;
        that.setData({
          activityDetailList: res.data,
          collectId: res.data.collectId,
          tickets: res.data.ticket,
          ticketsnum: res.data.ticket.startingAt,
          totalPrice: totalPrice,
          content: content
        })
        console.log(that.data.activityDetailList);
    
        globalData.activityForm = res.data.activityForm;
      }
    })
    data = {
      userId: wx.getStorageSync('token').userId,
      relationId: options.activityId,
      pvType: 1
    }
    //浏览量请求
    WXAPI.browseNum(data).then(function(res) {
      // console.log(res.data)
    })
    that.popularActvity();
  },
  // 减票种数量
  reduceTickets: function(e) {
    //票种的数量限制
    maxticketsnum = this.data.tickets.purchaseLimit;
    ticketsnum = this.data.ticketsnum;
    amount = this.data.tickets.amount;
    minticketsnum = this.data.tickets.startingAt;
    if (amount > minticketsnum) {
      if (ticketsnum <= minticketsnum) {
        wx.showToast({
          title: '最少' + minticketsnum + '张起售',
        })
        this.setData({
          reducebtn: false
        })
        return;
      }
      ticketsnum--;
      price = this.data.activityDetailList.activityFee
      totalPrice = ticketsnum * price;
      this.setData({
        ticketsnum: ticketsnum,
        totalPrice: totalPrice
      })
    } else {
      wx.showToast({
        title: '对不起，票已经售完',
      })
    }
  },
  // 加票种数量
  addTickets: function(e) {
    ticketsnum = this.data.ticketsnum;
    minticketsnum = this.data.tickets.startingAt;
    amount = this.data.tickets.amount;
    maxticketsnum = this.data.tickets.purchaseLimit;
    if (amount > minticketsnum) { 
      if (ticketsnum >=maxticketsnum) {
        wx.showToast({ 
          title: '最多限购' + maxticketsnum + '张',
        })
        this.setData({
          addbtn: false
        })
        return;
      }
      ticketsnum++;
      price = this.data.activityDetailList.activityFee
      totalPrice = ticketsnum *price;
      this.setData({
        ticketsnum: ticketsnum,
        totalPrice: totalPrice
      })
    } else {
      wx.showToast({
        title: '对不起，票已经售完',
      })
    }


  },
  // 自定义弹框
  deployed: function() {
    wx.navigateTo({
      url: '../deploy/deploy'
      //  url: '../logs/logs'
    })
  },
  // 弹框
  powerDrawer: function(e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  cancelDrawer: function(e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  //动画
  util: function(currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200, //动画时长  
      timingFunction: "linear", //线性  
      delay: 0 //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function() {
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })
      //关闭  
      if (currentStatu == "close") {

        this.setData({
          showModalStatus: false
        });
      }
    }.bind(this), 200)
    // 显示  
    if (currentStatu == "open") {
      this.setData({
        showModalStatus: true
      });
    }
  },
  toBuy: function() {
    globalData.activityCart={
      'ticketsnum': this.data.ticketsnum,
      'totalPrice': totalPrice
    }
    wx.navigateTo({
      url: '/subShopping/pages/buyticket/buyticket',
    })

  },
  //联系主办方
  goPhone:function(e){
    wx.makePhoneCall({
      phoneNumber: this.data.activityDetailList.rsCompany.contact,
    })
  },
  // 收藏
  haveSave: function() {
    let data = {
      userId: wx.getStorageSync('token').userId,
      relationId: this.data.activityDetailList.activityId,
      collectType: 2
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
  noSave: function() {
    let data = {
      userId: wx.getStorageSync('token').userId,
      relationId: this.data.activityDetailList.activityId,
      collectType: 2
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
  // 取消关注
  reduceFocus: function(e) {
    let data = {
      userId: wx.getStorageSync('token').userId,
      relationId: this.data.activityDetailList.companyId,
      focusType: 1
    }
    WXAPI.reduceFocus(data).then(res => {
      if (res.code == 200) {
        wx.showToast({
          title: res.message,
        })
        this.setData({
          focusText: '关注',
          focusKeyed: true,
        })

      } else {
        wx.showToast({
          title: res.message,
        })
      }
    })
  },
  // 添加关注
  addFocus: function(e) {
    // console.log(wx.getStorageSync('token').userId);
    let data = {
      "userId": wx.getStorageSync('token').userId,
      "relationId": this.data.activityDetailList.companyId,
      "focusType": 1
    }
    WXAPI.addFocus(data).then(res => {
      if (res.code == 200) {
        wx.showToast({
          title: res.message,
        })
        this.setData({
          focusText: '取消关注',
          focusKeyed: false,
        })
      } else {
        wx.showToast({
          title: res.message,
        })
      }
    })
  },
  // 热门活动获取
  popularActvity: function(e) {
    let data = {
      pageNum: this.data.page,
      pageSize: this.data.pageSize,
    }
    WXAPI.getPopularActivity(data).then(res => {
      this.setData({
        popularActivity: res.data.slice(0,3),
      })
      // console.log(this.data.popularActivity);
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