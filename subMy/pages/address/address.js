// pages/address/address.js
const WXAPI = require('../../wxapi/main');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showRegionStr: '请选择',
    submitRegionStr: '',
    region: [],
    switch1Checked: false,
    isDefault: 2,
    addressData: null,
    pRegion: '',
    cRegion: '',
    dRegion: ''
  },

  // 三级地址联动选择
  bindChange: function(e) {
    const region = e.detail.value;
    let showRegionStr = "";
    let submitRegionStr = ""
    if (region[0] == region[1]) {
      showRegionStr = region[0] + " " + region[2];
      submitRegionStr = region[0] + region[2];
    } else {
      showRegionStr = region[0] + " " + region[1] + " " + region[2]
      submitRegionStr = region[0] + region[1] + region[2]
    }
    console.log(showRegionStr);
    this.setData({
      showRegionStr: showRegionStr,
      submitRegionStr
    })
  },
  // 开关的事件
  switchChange: function(e) {
    this.setData({
      switch1Checked: e.detail.value,
    })
    switch (e.detail.value) {
      case true:
        this.setData({
          isDefault: 1,
        })
        break
      case false:
        this.setData({
          isDefault: 2,
        })
        break
    }
    console.log(this.data.isDefault)
  },

  // 保存表单
  bindSave: function(e) {
    let data = e.detail.value;
    const that = this;
    data.address = e.detail.value.address;
    data.provinceCity = that.data.submitRegionStr;
    data.isDefault = that.data.isDefault;
    data.userId = wx.getStorageSync('token').userId;
    console.log(data);
    if (e.detail.value.addressee == "") {
      wx.showModal({
        title: '提示',
        content: '请填写联系人姓名',
        showCancel: false
      })
      return
    }
    if (e.detail.value.addresseePhone == "") {
      wx.showModal({
        title: '提示',
        content: '请填写手机号码',
        showCancel: false
      })
      return
    }
    if (!that.data.submitRegionStr) {
      wx.showModal({
        title: '提示',
        content: '请选择地区',
        showCancel: false
      })
      return
    }
    if (e.detail.value.address == "") {
      wx.showModal({
        title: '提示',
        content: '请填写详细地址',
        showCancel: false
      })
      return
    }
    WXAPI.addAddress(data).then(res => {
      console.log(res)
      if (res.code != 200) {
        // 登录错误 
        wx.hideLoading();
        wx.showModal({
          title: '失败',
          content: res.msg,
          showCancel: false
        })
        return;
      } else {
        wx.navigateBack({})
      }
      // 跳转到结算页面
    })
  },
  // 如果是编辑进入获取内容
  getAddressDetail(id) {
    wx.showLoading()
    WXAPI.getAddressById({
      "addressId": id
    }).then(res => {
      console.log(res);
      wx.hideLoading();
      if (res.code == 200) {

        switch (res.data.isDefault) {
          case 1:
            this.setData({
              switch1Checked: true,
            })
            break
          case 2:
            this.setData({
              switch1Checked: false,
            })
            break
        }
        this.setData({
          addressData: res.data,
          showRegionStr: res.data.provinceCity,
        });
        return;
      } else {
        wx.showModal({
          title: '提示',
          content: '无法获取快递地址数据',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let id = options.id;
    console.log(id);
    if (id) {
      // switch (addressList.isDefault) {
      //   case 1:
      //     this.setData({
      //       switch1Checked: true,
      //     })
      //     break
      //   case 2:
      //     this.setData({
      //       switch1Checked: false,
      //     })
      //     break
      // }
      // this.setData({
      //   addressData: addressList,
      //   submitRegionStr:"wodeshjie"
      // })
      this.getAddressDetail(id);
    }
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