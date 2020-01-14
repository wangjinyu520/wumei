// pages/publish/publish.js
const WXAPI = require('../../wxapi/main')
const app = getApp()
let globalData = app.globalData;
var fromList = null;
let activity = null;
let activityForm = null;
var editorImg = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '我的主页', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.statusBarHeight * 2 + 20,
    uploadedImages: [],
    imgBoolean: true,
    isAgreement: false, // 是否显示用户协议
    submitBtn: false, // 是否允许投稿
    select: false,
    msg: '退票收取10%手续费',
    selectmsg: ['退票收取10%手续费', '不可退票'],
    selectArray: ['是', '否'],
    item: '',
    headImage: '',
    title: '',
    beginTime: '请选择',
    endTime: '请选择',
    beginDate: '请选择',
    endDate: '请选择',
    dateStart: Date.now(),
    desc: '是',
    advice: '',
    currentTicket: '',
    selectdiplay: false,
    selectdiplays: false,
    picList: [],
    editorImg: [],
    detailHtml: ''
  },
  chooseImage: function() {
    var that = this;
    // 选择图片
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({
          item: tempFilePaths[0],
          imgBoolean: false
        });
      }
    })
  },
  // 图片预览
  previewImage: function(e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: [current]
    })
  },
  //删除图片
  deleteImg: function(e) {
    var that = this;
    var images = that.data.uploadedImages;
    that.setData({
      uploadedImages: images,
      imgBoolean: true
    });
  },
  /*下拉菜单 */
  bindShowMsg() {
    this.setData({
      select: !this.data.select
    })
  },
  changeshow: function() {

    this.setData({
      msg: '',
      selectdiplay: !this.data.selectdiplay
    })
  },
  changeshows: function() {
    this.setData({
      desc: '',
      selectdiplays: !this.data.selectdiplays
    })
  },
  mySelect(e) {
    var name = e.currentTarget.dataset.name
    this.setData({
      msg: name,
      selectdiplay: false
    })
  },
  mySelects(e) {
    var name = e.currentTarget.dataset.name
    this.setData({
      desc: name,
      selectdiplays: false
    })
  },
  // 富文本
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function(res) {
      that.editorCtx = res.context
    }).exec()
  },
  getContent() {
    this.editorCtx.getContents({
      success: (res) => {
        this.setData({
          detailHtml: res.html
        })
      },
      fail: (res) => {
        // console.log(res);
      }
    });
  },
  format(e) {
    let {
      name,
      value
    } = e.target.dataset
    // conosole.log(value);
    if (!name) return
    this.editorCtx.format(name, value)
  },
  onStatusChange(e) {
    const formats = e.detail
    // console.log(formats);

    this.setData({
      formats
    })

  },
  //富文本插入图片
  insertImage() {
    const that = this
    let picList = that.data.picList;
    wx.chooseImage({
      count: 1,
      success: function(res) {
        // console.log(res.tempFiles);
        let tempFiles = res.tempFiles[0].path;
        that.editorCtx.insertImage({
          src: tempFiles
        });
        //把选择的图片 添加到集合里
        //显示
        
        wx.uploadFile({
          url: 'https://www.techwells.com/wumei-server/file/imageUpload',
          header: {
            'content-type': 'multipart/form-data'
          },
          filePath: tempFiles,
          name: 'file', //name是后台接收到字段
          success: function(res) {
            // console.log(res.data);
            let str = JSON.parse(res.data);
            if (str.code == 200) {
              // console.log(str.data)
             
            } else {
              wx.showToast({
                title: str.message,
              })
            }
          },
          fail: function(res) {}
        })
      }
    })
  },
  map: function() {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      }
    })
  },
  bindDateChange: function(e) {
    this.setData({
      beginDate: e.detail.value
    })
  },
  bindDateChanges: function(e) {
    this.setData({
      endDate: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      beginTime: e.detail.value
    })
  },
  bindTimeChanges: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endTime: e.detail.value
    })
  },
  // 退票
  optionTap: function(e) {},
  // 表单提交
  fromSubmit: function(e) {
    activity = e.detail.value;
    activity.activityStartTime = this.data.beginDate + ' ' + this.data.beginTime;
    activity.activityEndTime = this.data.endDate + ' ' + this.data.endTime;
    activity.companyId = wx.getStorageSync('companyId');
    activity.activityIntroduce = this.data.detailHtml;
    if (this.data.currentTicket == "免费") {
      this.data.currentTicket = 0;
    }
    if (new Date().getTime() > new Date(activity.activityStartTime).getTime()) {
      wx.showModal({
        title: '开始时间应该在当前时间之后',
      })
      return;
    }
    activity.activityFee = this.data.currentTicket;
    activity.refundRule = this.data.msg == "退票收取10%手续费" ? 1 : 0;
    activity.trafficPlan = this.data.desc == "是" ? 1 : 0;
    activity.refundRule = this.data.msg == "退票收取10%手续费" ? 1 : 0;
    activity.refundRule = this.data.msg == "退票收取10%手续费" ? 1 : 0;
    activity.ticket = globalData.ticket;
    if (!activity.activityTheme) {
      wx.showToast({
        title: '活动主题不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!activity.activityStartTime || !activity.activityEndTime || !this.data.endTime || !this.data.beginTime) {
      wx.showToast({
        title: '活动时间不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (activity.contact.length == 0) {
      wx.showToast({
        title: '联系方式不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (activity.contact.length != 11) {
      wx.showToast({
        title: '联系方式格式不正确',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!activity.activityLocation) {
      wx.showToast({
        title: '地址不为空',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    let obj = {};
    globalData.concatlist.forEach((v, i) => {
      obj[i] = v
    })
    activityForm = JSON.stringify(obj);
    if (activityForm) {
      wx.showToast({
        title: '报名表单不能为空',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    activity = JSON.stringify(activity);
    this.uploadimage(e);
  },
  // 表单重置
  fromReset: function(e) {
    e.detail.value = null;
    this.setData({
      beginDate: '请选择',
      endDate: '请选择',
      beginTime: '请选择',
      endTime: '请选择',
      currentTicket: '',
      item: ''
    });
    this.editorCtx.clear();
  },
  //上传图片
  uploadimage: function() {
    var that = this;
    let data = {
      activity,
      activityForm
    };
    if (!this.data.item) {
      wx.showModal({
        title: '还没有上传图片',
        content: '还没有上传图片',
      })
    }
    wx.uploadFile({
      url: 'https://www.techwells.com/wumei-server/activity/addActivity',
      header: {
        'content-type': 'multipart/form-data'
      },
      filePath: this.data.item,
      name: 'logo', //name是后台接收到字段
      formData: data,
      success: function(res) {
        let str = JSON.parse(res.data);
        console.log(str.message);
        if (str.code == 200) {
          wx.showToast({
            title: "发布活动成功",
            content: str.message,
            duration:2000
          })
          setTimeout(function () {
            wx.switchTab({
              url: '/pages/home/home',
            })
          }, 2000)
          wx.showTabBar();
        }else{
          wx.showToast({
            title: str.message,
            content: str.message,
          })
        }


      },
      fail: function(res) {}
    })


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //隐藏tabBar
    wx.hideTabBar();
    this.setData({
      currentTicket: globalData.curentTicket ? globalData.curentTicket : '免费'
    });
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
    let that = this;
    this.setData({
      currentTicket: globalData.curentTicket ? globalData.curentTicket : '免费'
    })

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
    }
    let token = wx.getStorageSync('companyId');
    if (!token) {
      wx.showModal({
        title: '',
        content: '只有主办方才能够发布活动，是否申请为主办方',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/subShopping/pages/bossCertification/bossCertification',
            })
          } else if (res.cancel) {
            wx.switchTab({
              url: '/pages/home/home',
            })
          }
        }
      })

    }
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
  onShareAppMessage: function() {},

  showAgreement: function() {
    let that = this;
    if (that.data.isAgreement) {
      that.setData({
        isAgreement: false
      });
    } else {
      that.setData({
        isAgreement: true
      });
    }
  },

  // 同意用户协议
  agreeMent: function(event) {
    let that = this;
    if (event.detail.value == "true") {
      that.setData({
        submitBtn: false
      });
    } else {
      that.setData({
        submitBtn: true
      });
    }
  },


})