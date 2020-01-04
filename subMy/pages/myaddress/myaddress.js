// pages/myaddress/myaddress.js
const app = getApp()
const WXAPI = require('../../wxapi/main')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList:null,
    loadingMoreHidden:false,
    startX: 0, //开始坐标
    startY: 0,
    isDefault:2,
    address:''
  },
  //手指触摸动作开始 记录起点X坐标

  touchstart: function (e) {

    //开始触摸时 重置所有删除

    this.data.addressList.forEach(function (v, i) {

      if (v.isTouchMove) //只操作为true的

        v.isTouchMove = false;

    })

    this.setData({

      startX: e.changedTouches[0].clientX,

      startY: e.changedTouches[0].clientY,

      addressList: this.data.addressList

    })

  },
  //滑动事件处理
  touchmove: function (e) {

    var that = this,

      index = e.currentTarget.dataset.index, //当前索引

      startX = that.data.startX, //开始X坐标

      startY = that.data.startY, //开始Y坐标

      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标

      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标

      //获取滑动角度

      angle = that.angle({
        X: startX,
        Y: startY
      }, {
          X: touchMoveX,
          Y: touchMoveY
        });

    that.data.addressList.forEach(function (v, i) {

      v.isTouchMove = false

      //滑动超过30度角 return

      if (Math.abs(angle) > 30) return;

      if (i == index) {

        if (touchMoveX > startX) //右滑

          v.isTouchMove = false

        else //左滑

          v.isTouchMove = true

      }

    })

    //更新数据

    that.setData({

      addressList: that.data.addressList

    })

  },

  /**
  
  * 计算滑动角度
  
  * @param {Object} start 起点坐标
  
  * @param {Object} end 终点坐标
  
  */
  angle: function (start, end) {

    var _X = end.X - start.X,

      _Y = end.Y - start.Y

    //返回角度 /Math.atan()返回数字的反正切值

    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);

  },
  // 选择最后的地址
  selectTap: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.setStorageSync('addressList', this.data.addressList[id]);
    wx.navigateBack({
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  toAddress:function(){
    wx.navigateTo({
      url: '/subMy/pages/address/address',
    })
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
    // 验证登录
    let userId = wx.getStorageSync('token').userId;
    if (!userId) {
      wx.showModal({
        title: '',
        content: '您还没有登录，前去登录',
        success(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/profile/profile',
            })
          } else if (res.cancel) {
            wx.switchTab({
              url: '/pages/home/home',
            })
          }
        }
      })
      return;
    }else{
      this.initShippingAddress();
    }
  },
  // 查询地址
  initShippingAddress: function () {
    let that=this;
    let data = {
      userId: wx.getStorageSync('token').userId,
      pageNum: 1,
      pageSize: 6,
    }
    WXAPI.queryAddress(data).then(res => {
      let that=this;
      if (res.code == 200) {
        this.setData({
          addressList: res.data,
          loadingMoreHidden: true,
        });
        if (that.data.addressList) {
          that.data.addressList.forEach((v, i) => {
            v.isTouchMove = false;
          });
        }
      }else{
        this.setData({
          addressList: null,
          loadingMoreHidden: false
        });
      }
    })
  },

  /* 删除item */
  delAddress: function (e) {
    console.log(e);
    var id = e.currentTarget.dataset.id;
    e.currentTarget.dataset.index
    this.data.addressList.splice(e.currentTarget.dataset.index,1);
    this.setData({
      addressList: this.data.addressList
    })
    // 更新data数据对象  
    WXAPI.deleteAddress({"addressId":id}).then(res=>{
      console.log(res)
    })
    
  },
  // 编辑地址
  editAddess: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/subMy/pages/address/address?id="+id 
    })
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