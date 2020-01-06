// pages/publish/publish.js
const WXAPI = require('../../wxapi/main')
const app = getApp()
let globalData = app.globalData;
var fromList = null;
let activity = null;
let activityForm = null;
var editorImg = [];
let mulImage = [];
let master = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uploadedImages: [],
    imgBoolean: true,
    isAgreement: false, // 是否显示用户协议
    submitBtn: false, // 是否允许投稿
    select: false,
    msg: '',
    selectmsg: ['灯光师', '音响师', '视频师', '项目经理', '搭建', '舞美设计'],
    item: '',
    headImage: '',
    selectId: 1,
    title: '',
    advice: '',
    selectdiplay: false,
    selectdiplays: false,
    picList: [],
    editorImg: [],
    detailHtml: '',
    upload_picture_list: [],
    isClick:true
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
    var name = e.currentTarget.dataset.name;
    var id = e.currentTarget.dataset.id + 1;

    this.setData({
      msg: name,
      selectId: id,
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
  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function(res) {
      that.editorCtx = res.context
    }).exec()
  },
  blur() {

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
        // console.log(str.data)
        that.editorCtx.insertImage({
          src: tempFiles,
          success: function () { }
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
           
            } else {
        
              wx.showToast({
                title: str.message,
              })
              return;
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
      beginTime: e.detail.value
    })
  },
  bindDateChanges: function(e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  // 退票
  optionTap: function(e) {

  },
  //选择图片方法
  uploadpic: function(e) {
    let that = this //获取上下文
    let upload_picture_list = that.data.upload_picture_list
    //选择图片
    wx.chooseImage({
      count: 8, // 默认9，这里显示一次选择相册的图片数量 
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) { // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
        let tempFiles = res.tempFiles
        //把选择的图片 添加到集合里
        for (let i in tempFiles) {
          upload_picture_list.push(tempFiles[i])
        }
        //显示
        that.setData({
          upload_picture_list: upload_picture_list,
        });
        that.uploadimage();
      }
    })
  },

  // 点击删除图片
  deleteImg(e) {
    let upload_picture_list = this.data.upload_picture_list;
    let index = e.currentTarget.dataset.index;
    upload_picture_list.splice(index, 1);
    this.setData({
      upload_picture_list: upload_picture_list
    });
  },
  // 预览图片
  previewImg(e) {
    //获取当前图片的下标
    let index = e.currentTarget.dataset.index;
    //所有图片
    let imgs = this.data.imgs;
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  },
  //  表单提交事件
  fromSubmit: function(e) {
    if(!this.isClick){
      wx.showToast({
        title: '请勿重复点击',
      })
    }
    let that = this;
    master = e.detail.value;
    master.userId = wx.getStorageSync('token').userId;
    master.workCase = this.data.detailHtml;
    master.technologyOccupation = this.data.selectId;
    master.certificate = mulImage.join(',');
    master.technologyPhone = wx.getStorageSync('token').mobile;
    // 验证表单信息
    if (master.technologyOccupation.length==0) {
      wx.showToast({
        title: '大师的类型不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!master.workExperience) {
      wx.showToast({
        title: '工作经验不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!master.technologyAge) {
      wx.showToast({
        title: '年龄不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    else if (master.workCase.length==0) {
      wx.showToast({
        title: '案例介绍不能为空',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    else if (!mulImage) {
      wx.showToast({
        title: "证书不能为空",
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    // console.log(master);
    wx.showLoading({
      title: '正在为您申请',
    })
    setTimeout(function () {
      wx.hideLoading();
    }, 2000)

    WXAPI.addTechnology(master).then(res => {
      mulImage = [];
      if (res.code == 200) {
        wx.setStorageSync('token', res.data);
        that.setData({
          isClick: false
        })
        wx.showToast({
          icon:"none",
          title: '恭喜您，已经成为技术人员',
          duration:2000,
          success:function(){
            wx.switchTab({
              url: '/pages/profile/profile',
            })
          }
        })
      }else{
        wx.showToast({
          icon: "none",
          title: res.message+"请重试",
          duration: 2000
        })
      }
    })
  },
  // 取消
  fromReset: function(e) {
    wx.navigateBack({
      delta: 2
    })
  },
  // 点击上传图片
  uploadimage: function() {
    // console.log(this.data.upload_picture_list.length);
    var that = this;
    for (let i = 0; i < this.data.upload_picture_list.length; i++) {
      let filterName = {
        "filterName": "technology"
      }
      wx.uploadFile({
        url: 'https://www.techwells.com/wumei-server/file/imageUpload',
        header: {
          'content-type': 'multipart/form-data'
        },
        filePath: this.data.upload_picture_list[i].path,
        formData: filterName,
        name: 'file', //name是后台接收到字段
        formData: master,
        success: function(res) {
          let str = JSON.parse(res.data);
          if (str.code == 200) {
            mulImage.push(str.data);
          } else {
            wx.showToast({
              title: str.message,   
            })
          }

        },
        fail: function(res) {
          console.log(res)
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