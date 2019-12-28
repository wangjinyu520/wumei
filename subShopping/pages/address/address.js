// pages/address/address.js

var addressList = null;

const WXAPI = require('../../wxapi/main');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    customItem: '全部',
    region: ['浙江省','杭州市','余杭区'],
    switchChecked:false,
    regioncode:[330000,330100,330110],
    isDefault:2
  },

  bindRegionChange: function (e) {
    console.log(e.detail);
    this.setData({
      region:e.detail.value
    })
  },

  switchChange: function (e) {
    console.log(`Switch样式点击后是否选中：`, e.detail.value)
    const isDefault = e.detail.value ==true ? 1 : 2;
    console.log(isDefault);
    this.setData({
      isDefault: isDefault
    })
  },


  /**
   * 生命周期函数--监听页面加载
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


  saveAddress:function(e){
    const name = e.detail.value.name;
    const phone = e.detail.value.phone;
    const province_code =this.data.regioncode[0];
    const city_code =this.data.regioncode[1];
    const district_code = this.data.regioncode[2];

    const isDefault = this.data.isDefault;

    const address = e.detail.value.address;
    // const arr = wx.getStorageSync('addressList') || [];
    // console.log("arr,{}", arr);
    addressList = {
      addressee: name,
      addresseePhone: phone,
      provinceCode: province_code,
      cityCode: city_code,
      districtCode: district_code,
      isDefault: isDefault,
      address:address,
      userId:'123'
    }
    WXAPI.addAddress(addressList).then(res=>{

    })
 
    // arr.push(addressList);
    // wx.setStorageSync('addressList', arr);
    // wx.navigateBack({

    // })

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