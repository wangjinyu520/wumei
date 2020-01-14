// certification/pages/bossCertification/bossCertification.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    picker: ['喵喵喵', '汪汪汪', '哼唧哼唧','汪汪汪', '哼唧哼唧'],
    region: ['广东省', '广州市', '海珠区'],
  },



  //  表单提交事件
  fromSubmit: function (e) {
    // if (!this.isClick) {
    //   wx.showToast({
    //     title: '请勿重复点击',
    //   })
    // }
    let that = this;
    console.log(e.detail.value);
    console.log(mulImage);
    let master = e.detail.value;
    master.imageUrl = mulImage.join(',');
    let caseList = that.data.caseList.push(master);
    this.setData({
      caseList: caseList
    });
    // console.log(that.data.caseList);
    // master.userId = wx.getStorageSync('token').userId;
    // master.workCase = this.data.detailHtml;
    // master.technologyOccupation = this.data.selectId;
    // master.certificate = mulImage.join(',');
    // master.technologyPhone = wx.getStorageSync('token').mobile;
    // 验证表单信息
    // if (master.technologyOccupation.length == 0) {
    //   wx.showToast({
    //     title: '大师的类型不能为空',
    //     icon: 'none',
    //     duration: 1000
    //   })
    //   return false;
    // } else if (!master.workExperience) {
    //   wx.showToast({
    //     title: '工作经验不能为空',
    //     icon: 'none',
    //     duration: 1000
    //   })
    //   return false;
    // } else if (!master.technologyAge) {
    //   wx.showToast({
    //     title: '年龄不能为空',
    //     icon: 'none',
    //     duration: 1000
    //   })
    //   return false;
    // }
    // else if (master.workCase.length == 0) {
    //   wx.showToast({
    //     title: '案例介绍不能为空',
    //     icon: 'none',
    //     duration: 1000
    //   })
    //   return;
    // }
    // else if (!mulImage) {
    //   wx.showToast({
    //     title: "证书不能为空",
    //     icon: 'none',
    //     duration: 1000
    //   })
    //   return false;
    // }
    // // console.log(master);
    // wx.showLoading({
    //   title: '正在为您修改',
    // })
    // setTimeout(function () {
    //   wx.hideLoading();
    // }, 2000)
    // WXAPI.addTechnology(master).then(res => {
    //   mulImage = [];
    //   if (res.code == 200) {
    //     wx.setStorageSync('token', res.data);
    //     that.setData({
    //       isClick: false
    //     })
    //     wx.showToast({
    //       icon: "none",
    //       title: '恭喜您，已经修改成功',
    //       duration: 2000,
    //       success: function () {
    //         wx.switchTab({
    //           url: '/pages/profile/profile',
    //         })
    //       }
    //     })
    //   } else {
    //     wx.showToast({
    //       icon: "none",
    //       title: res.message + "请重试",
    //       duration: 2000
    //     })
    //   }
    // })
  },
  // 取消
  fromReset: function (e) {
    wx.navigateBack({
      delta: 2
    })
  },
  // 下拉选择
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  // 城市选择器
  RegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
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