// pages/myactivity/myactivity.js
const app = getApp()
let globalData = app.globalData;
const WXAPI = require('../../wxapi/main')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderType: ['全部','待付款','待举办', '进行中', '已结束'],
    currentType: 0,
    databaseStatus: '',
    page: 1,
    contentlist: [],
    pageSize: 6, //根据后台每页的数据设定
    hasMoreData: '', //是否有更多数据文字,
    payStatus:'',
    displayList:true,
    unpaidList:null,

  },
  //切换状态
  orderTap: function (e) {
    const curType = e.currentTarget.dataset.index; 
    this.setData({
      currentType: curType,
      databaseStatus: curType - 2,
      page: 1,
      payStatus: '',
    });
    if (curType == 0) {
      this.setData({
        databaseStatus: ''
      });
    }
    if (curType == 1) {
      this.setData({
        databaseStatus: '',
        payStatus:3,
        displayList:false
      });
      var that = this;
      let data = {
        pageNum: that.data.page,
        pageSize: that.data.pageSize,
        activated: that.data.databaseStatus,
        userId: wx.getStorageSync('token').userId,
        payStatus: that.data.payStatus
      };
      WXAPI.getMyActivityList(data).then(res => {
        if (res.code == 200) {
          var contentlistTem = that.data.unpaidList //总的数据列表
          if (res.data) {
            if (that.data.page == 1) {
              contentlistTem = []
            }
            // console.log(globalData.activitynum);
            var unpaidList = res.data //contentlist每次返回的个数
            var unpaidList = unpaidList.map(ele => {
              if (ele.activityStatus == 0) {
                ele.activityStatus = '待举办'
              } else if (ele.activityStatus == 1) {
                ele.activityStatus = '进行中'
              } else if (ele.activityStatus == 2) {
                ele.activityStatus = '已结束'
              } else {
                ele.activityStatus = '停止售票'
              }
              return ele;
            })

            if (unpaidList.length > that.data.pageSize) {
              that.setData({
                unpaidList: contentlistTem.concat(unpaidList),
                hasMoreData: false
              })
            } else {
              that.setData({
                unpaidList: contentlistTem.concat(unpaidList),
                hasMoreData: true,
                page: that.data.page + 1
              })
            }
          } else {
            that.setData({
              unpaidList: null

            })
          }
        }
        console.log(that.data.unpaidList);
      })
    }else{
      this.setData({
        displayList: true
      });
      this.getMusicInfo();
    }
  },
  // 获取用户活动的内容
  getMusicInfo: function (message) {
    var that = this;
    let data = {
      pageNum: that.data.page,
      pageSize: that.data.pageSize,
      activated: that.data.databaseStatus,
      userId: wx.getStorageSync('token').userId,
      payStatus:that.data.payStatus
    };
    WXAPI.getMyActivityList(data).then(res => {
      if (res.code == 200) {
        var contentlistTem = that.data.contentlist //总的数据列表
        if (res.data) {
          if (that.data.page == 1) {
            contentlistTem = []
          }
          // console.log(globalData.activitynum);
          var contentlist = res.data //contentlist每次返回的个数
          var contentlist = contentlist.map(ele => {
            if (ele.activityStatus == 0) {
              ele.activityStatus = '待举办'
            } else if (ele.activityStatus == 1) {
              ele.activityStatus = '进行中'
            } else if (ele.activityStatus == 2) {
              ele.activityStatus = '已结束'
            } else {
              ele.activityStatus = '停止售票'
            }
            return ele;
          })

          if (contentlist.length > that.data.pageSize) {
            that.setData({
              contentlist: contentlistTem.concat(contentlist),
              hasMoreData: false
            })
          } else {
            that.setData({
              contentlist: contentlistTem.concat(contentlist),
              hasMoreData: true,
              page: that.data.page + 1
            })
          }
        } else {
          that.setData({
            contentlist:null
            
          })
        }
      }
      console.log(that.data.contentlist);
    })
    
  },
  //付款

  goPay: function (e) {
    let index=e.currentTarget.dataset.id;
    let that = this;
    let data={
      activityOrderId: that.data.unpaidList[index].activityOrderId
    }
    WXAPI.activityRePay(data).then(res => {
      console.log(res.data);
      if (res.code == 200) {
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          success(res) {
            let activityOrderId = that.data.unpaidList[index].activityOrderId;
            if (res.errMsg == "requestPayment:ok") {
              wx.navigateTo({
                url: '/subShopping/pages/orderdetil/orderdetil?activityOrderId=' + activityOrderId,
              })
            } else {
              wx.showToast({
                title: '支付失败',
                icon: '',
                image: '/assets/common/fail.png',
              })

            }
          },
          fail(res) {
            console.log(res)
          }
        })
      } else if (res.code == 70000) {
        wx.showToast({
          title: '你已经购买过此活动',
          duration: 1000,
        })
        setTimeout(function () {
          wx.switchTab({
            url: '/pages/home/home',
          })
        }, 1000)

      } else if (res.code == 60000) {
        wx.navigateTo({
          url: '/subMy/pages/userActivity/userActivity?payStatus=3',
        })
      } else {

      }
    })
  },
  // 取消支付
  cancalOrder:function(e){ 
    let index = e.currentTarget.dataset.id;
    let data = {
      activityOrderId: this.data.unpaidList[index].activityOrderId
    }
    WXAPI.cancelActivityOrder(data).then(res => {
        wx.showToast({
          title:res.message,
        })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.dateToweek();
    if (options.status) {
      this.setData({
        databaseStatus: options.status,
        currentType: 2
      })
    }
    console.log(options);
    if (options.payStatus) {
      console.log(options.payStatus);
      this.setData({
        payStatus: options.payStatus,
        currentType:1
      })
    }
    var that = this;
    that.getMusicInfo();

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
    this.data.page = 1
    this.getMusicInfo()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(this.data.hasMoreData);
    if (this.data.hasMoreData) {
      this.getMusicInfo()
    } else {
      wx.showToast({
        title: '没有更多数据',
        icon: 'none'
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})