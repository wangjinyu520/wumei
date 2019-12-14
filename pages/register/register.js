// pages/register/register.js

const WXAPI = require('../../wxapi/main')

//const app = require('path');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '获取验证码', //按钮文字
   // currentTime: 61, //倒计时
   // disabled: false, //按钮是否禁用
   // //phone: '', //获取到的手机栏中的值
   // VerificationCode: '',
   // Code: '',
   // NewChanges: '',
   // NewChangesAgain: '',
    success: false,
    state: '',

    phone: '',
    code: '',
    iscode: null,
    password: '',
    codenamde: '获取验证码',
    disabled:false,
  },

  /**
    * 获取验证码
    
  return_home: function (e) {
    wx.navigateTo({
      url: '',
    })

  },
  handleInputPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  handleVerificationCode: function (e) {
    console.log(e);
    this.setData({
      Code: e.detail.value
    })
  },
  handleNewChanges: function (e) {
    console.log(e);
    this.setData({
      NewChanges: e.detail.value
    })
  },
  handleNewChangesAgain: function (e) {
    console.log(e);
    this.setData({
      NewChangesAgain: e.detail.value
    })

  },
  doGetCode: function () {
    var that = this;
    that.setData({
      disabled: true, //只要点击了按钮就让按钮禁用 （避免正常情况下多次触发定时器事件）
      color: '#ccc',
    })

    var phone = that.data.phone;
    var currentTime = that.data.currentTime //把手机号跟倒计时值变例成js值
    var warn = null; //warn为当手机号为空或格式不正确时提示用户的文字，默认为空
    var phone = that.data.phone;
    var currentTime = that.data.currentTime //把手机号跟倒计时值变例成js值
    var warn = null; //warn为当手机号为空或格式不正确时提示用户的文字，默认为空
    //wx.request({
      //url: 'http://10.20.11.126:8080/wumei-server/user/getVerCode', //后端判断是否已被注册， 已被注册返回1 ，未被注册返回0
      //method: "GET",
      //header: {
        //'content-type': 'application/x-www-form-urlencoded'
      //},
      //success: function (res) {
        //that.setData({
          //state: res.data
       // })
       // if (phone == '') {
          //warn = "号码不能为空";
        //} else if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
          //warn = "手机号格式不正确";
        //} //手机号已被注册提示信息
        //else if (that.data.state == 1) {  //判断是否被注册
         // warn = "手机号已被注册";

        //}
        //else {
          wx.request({
            url: 'http://10.20.11.126:8080/wumei-server/user/getVerCode', //填写发送验证码接口
            method: "POST",
            data: {
              coachid: that.data.phone
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res.data)
              that.setData({
                VerificationCode: res.data.verifycode
              })


              //当手机号正确的时候提示用户短信验证码已经发送
              wx.showToast({
                title: '短信验证码已发送',
                icon: 'none',
                duration: 2000
              });
              //设置一分钟的倒计时
              var interval = setInterval(function () {
                currentTime--; //每执行一次让倒计时秒数减一
                that.setData({
                  text: currentTime + 's', //按钮文字变成倒计时对应秒数

                })
                //如果当秒数小于等于0时 停止计时器 且按钮文字变成重新发送 且按钮变成可用状态 倒计时的秒数也要恢复成默认秒数 即让获取验证码的按钮恢复到初始化状态只改变按钮文字
                if (currentTime <= 0) {
                  clearInterval(interval)
                  that.setData({
                    text: '重新发送',
                    currentTime: 61,
                    disabled: false,
                    color: '#33FF99'
                  })
                }
              }, 100);
            //}
          //})
       // };
        //判断 当提示错误信息文字不为空 即手机号输入有问题时提示用户错误信息 并且提示完之后一定要让按钮为可用状态 因为点击按钮时设置了只要点击了按钮就让按钮禁用的情况
        if (warn != null) {
          wx.showModal({
            title: '提示',
            content: warn
          })
          that.setData({
            disabled: false,
            color: '#33FF99'
          })
          return;
        }
      }

    })

  },
  submit: function (e) {
    var that = this
    if (this.data.Code == '') {
      wx.showToast({
        title: '请输入验证码',
        image: '/images/error.png',
        duration: 2000
      })
      return
    } else if (this.data.Code != this.data.VerificationCode) {
      wx.showToast({
        title: '验证码错误',
        image: '/images/error.png',
        duration: 2000
      })
      return
    }
    else if (this.data.NewChanges == '') {
      wx.showToast({
        title: '请输入密码',
        image: '/images/error.png',
        duration: 2000
      })
      return
    } else if (this.data.NewChangesAgain != this.data.NewChanges) {
      wx.showToast({
        title: '两次密码不一致',
        image: '/images/error.png',
        duration: 2000
      })
      return
    } else {
      var that = this
      var phone = that.data.phone;
      wx.request({
        url: getApp().globalData.baseUrl + '/Coachs/insert',
        method: "POST",
        data: {
          coachid: phone,
          coachpassword: that.data.NewChanges
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          wx.showToast({
            title: '提交成功~',
            icon: 'loading',
            duration: 2000
          })
          console.log(res)
          that.setData({
            success: true
          })
        }
      })
    }
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



  //获取input输入框的值
  bindPhoneValue: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  bindCodeValue: function(e) {
    this.setData({
      code: e.detail.value
    })
  },
  bindPasswordValue: function(e) {
    this.setData({
      password: e.detail.value
    })
  },

  //判断手机号
  getCode: function() {
    var a = this.data.phone;
    var _this = this;
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    if (this.data.phone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(this.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else {
      wx.request({
        data: {
      
        },
        header:{
          'content-type':'application/json',
        },
        url:"http://10.20.11.126:8080/wumei-server/user/getVerCode",
        success(res) {
          console.log(res.data.data)
          _this.setData({
            iscode: res.data.data
          })
          var num = 61;
          var timer = setInterval(function() {
            num--;
            if (num <= 0) {
              clearInterval(timer);
              _this.setData({
                codename: '重新发送',
                disabled: false
              })

            } else {
              _this.setData({
                codename: num + "s"
              })
            }
          }, 1000)
        },
        fail(err){
          console.log(err)
        }
      })
    }

  },
  //获取验证码
  getVerificationCode() {
    this.getCode();
    var _this = this
    _this.setData({
      disabled: true
    })
  },
  //提交表单信息
  save: function() {
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    if (this.data.phone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(this.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (this.data.code == "") {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (this.data.code != this.data.iscode) {
      wx.showToast({
        title: '验证码错误',
        icon: 'none',
        duration: 1000
      })
      return false;
      if (this.data.password == "") {
        wx.showToast({
          title: '密码不能为空',
          icon: 'none',
          duration: 1000
        })
        return false;
      }
    }else {
      wx.setStorageSync('phone', this.data.phone);
      wx.setStorageSync('password', this.data.password);
      wx.redirectTo({
        url: '../login/login',
      })
    }
  },


  //保存
  save(e) {
    console.log('手机号: ' + this.data.phone);
    console.log('验证码: ' + this.data.code);
    console.log('密码: ' + this.data.psd);
  },
  


  /*goToPage: function() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  }
  */
})