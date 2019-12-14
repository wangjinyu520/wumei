// pages/setprice/setprice.js
const app = getApp();//在小程序中通过getapp获取全局的数据、方法（类似vue中的this.store）
let globalData = app.globalData;
let arrticket=[];
Page({
  data: {
    showModalStatus: false,
    startTime: '售票开始时间',
    endTime: '售票结束时间',
    arrtickets:[],
    switch1Checked:false
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数

    //this.tempData();
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
        // wx.showToast({
        //   title: '添加成功',
        //   icon: 'succes',
        //   duration: 1000,
        //   mask: true
        // })
      }
    }.bind(this), 200)
    // 显示  
    if (currentStatu == "open") {
      this.setData({
        showModalStatus: true
      });
    }
  },
  //开始时间选择
  bindDateChange: function(e) {
    this.setData({
      startTime: e.detail.value
    })
  },
  //结束时间选择
  bindDateChanges: function(e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  requirename:function(e){
    if (e.detail.value.trim()=='') {
      wx.showToast({
        title: '名称必填',
        icon: 'loading',
        duration: 1000
      })
      return;
    }
  },
  numberRsg:function(e){
    var regNum = new RegExp('[0-9]', 'g');
    var rsNum = regNum.exec(e.detail.value);
    if (!rsNum) {
      wx.showToast({
        title: '必须为数字',
        icon: 'loading',
        duration: 100
      })
      return
    }
  },
  //开关的变化
  switch1Change:function(e){
    this.setData({
      switch1Checked:e.detail.value
    })
    console.log(this.data.switch1Checked);
    console.log(e.currentTarget.dataset.name);


  },
  //提交表单
  formSubmit: function(e) {
    globalData=e.detail.value;
    arrticket.push(e.detail.value.ticketName);
    this.setData({
      arrtickets:arrticket
    })
    console.log(this.data.arrtickets);

    // if (e.detail.value.mobile.length == 0 || e.detail.value.password.length == 0) {

    //   wx.showToast({

    //     title: '手机号码或密码不得为空!',

    //     icon: 'loading',

    //     duration: 1500

    //   })

    //   setTimeout(function() {

    //     wx.hideToast()

    //   }, 2000)

    // } else if (e.detail.va+lue.mobile.length != 11) {

    //   wx.showToast({

    //     title: '请输入11位手机号码!',

    //     icon: 'loading',

    //     duration: 1500

    //   })
    // }
    // const name = e.detail.value.name;
    // const phone = e.detail.value.phone;
    // const province_code = this.data.regioncode[0];
    // const city_code = this.data.regioncode[1];
    // const district_code = this.data.regioncode[2];
    // const isDefault = this.data.isDefault;
    // const address = e.detail.value.address;
    // // const arr = wx.getStorageSync('addressList') || [];
    // // console.log("arr,{}", arr);
    // addressList = {
    //   addressee: name,
    //   addresseePhone: phone,
    //   provinceCode: province_code,
    //   cityCode: city_code,
    //   districtCode: district_code,
    //   isDefault: isDefault,
    //   address: address,
    //   userId: '123'
    // }
    // WXAPI.addAddress(addressList).then(res => {

    // })

    // arr.push(addressList);
    // wx.setStorageSync('addressList', arr);
    // wx.navigateBack({

    // })

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