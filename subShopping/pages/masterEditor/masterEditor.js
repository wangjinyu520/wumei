// pages/publish/publish.js
const WXAPI = require('../../wxapi/main')
const WxParse = require('../../wxParse/wxParse.js');
const app = getApp()
let globalData = app.globalData;
var fromList = null;
let activity = null;
let activityForm = null;
var editorImg = [];
let mulImage = [];   //提交表单的时候给后台的证书的数据
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
    upload_picture_list: [],  //证书重新上传的数据
    isClick: true,
    masterDetail: [],
    imgList: [],   //编辑获取初始化
    html: ""
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
  // 在这里设置html可能是响应还没有回来所以可以用时间函数延迟几秒
    let that = this;
    setTimeout(function() {
      let html = that.data.html;
      console.log(html);
      wx.createSelectorQuery().select('#editor').context(function(res) {
        that.editorCtx = res.context;
        that.editorCtx.setContents({
          html: html, //这里就是获取上一页面中的数据
          success: (res) => {
            console.log(res)
          },
          fail: (res) => {
            console.log(res)
          }
        })
      }).exec()
    }, 500)

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
          success: function() {}
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

  // 点击删除新上传的图片
  deleteImg(e) {
    let upload_picture_list = this.data.upload_picture_list;
    let index = e.currentTarget.dataset.index;
    upload_picture_list.splice(index, 1);
    mulImage.splice(index,1);
    this.setData({
      upload_picture_list: upload_picture_list
    });
  },
  // 删除回来的图片
  deleteImg1(e) {
    let imgList = this.data.imgList;
    console.log(imgList);
    let index = e.currentTarget.dataset.index;
    imgList.splice(index, 1);
    this.setData({
      imgList: imgList
    });
    console.log(this.data.imgList);

  },
  // 预览图片
  previewImg(e) {
    //获取当前图片的下标
    console.log(e.currentTarget.dataset.src)
    let src = e.currentTarget.dataset.src;
    //所有图片
    let images = this.data.upload_picture_list;
    wx.previewImage({
      //当前显示图片
      current: src,
      urls: images
      //所有图片
    })
  },
  //  表单提交事件
  fromSubmit: function(e) {
    if (!this.isClick) {
      wx.showToast({
        title: '请勿重复点击',
      })
    }
    let that = this;
    master = e.detail.value;
    master.userId = wx.getStorageSync('token').userId;
    master.workCase = this.data.detailHtml;
    master.technologyOccupation = this.data.selectId;
    mulImage= mulImage.concat(that.data.imgList);
    master.certificate = mulImage.join(',');
    master.technologyPhone = wx.getStorageSync('token').mobile;
    // 验证表单信息
    if (master.technologyOccupation.length == 0) {
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
    } else if (master.workCase.length == 0) {
      wx.showToast({
        title: '案例介绍不能为空',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    // console.log(master);
    wx.showLoading({
      title: '正在为您修改',
    })
    setTimeout(function() {
      wx.hideLoading();
    }, 2000)
    let technology = JSON.stringify(master)
    WXAPI.editorDetailInfo(master).then(res => {
      mulImage = [];
      if (res.code == 200) {
        that.setData({
          isClick: false
        })
        wx.showToast({
          icon: "none",
          title: '恭喜您，已经修改成功',
          duration: 2000,
          success: function() {
            wx.switchTab({
              url: '/pages/profile/profile',
            })
          }
        })
      } else {
        wx.showToast({
          icon: "none",
          title: res.message + "请重试",
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
            mulImage.push(str.data);   //图片上传成功之后的存储的地方
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
  // 初始化用户信息
  initUserInfo: function(e) {
    let that = this;
    let userId = wx.getStorageSync('token').userId;
    WXAPI.getDetailInfo({
      userId
    }).then(res => {
      //灯光使
      if (res.data.technologyOccupation == 1) {
        res.data.technologyOccupation = '灯光师'
      } else if (res.data.technologyOccupation == 2) {
        res.data.technologyOccupation = '音响师'
      } else if (res.data.technologyOccupation == 3) {
        res.data.technologyOccupation = '视频师'
      } else if (res.data.technologyOccupation == 4) {
        res.data.technologyOccupation = '项目经理'
      } else if (res.data.technologyOccupation == 5) {
        res.data.technologyOccupation = '搭建'
      } else if (res.data.technologyOccupation == 6) {
        res.data.technologyOccupation = '舞美设计'
      } else {}
      if (res.data.certificateImage) {
        res.data.certificateImage = res.data.certificateImage.split(',');
      } else {

      }
      res.data.workCase = res.data.workCase.replace(/<img /g, '<img class="rich_img" ');
      res.data.workCase = res.data.workCase.replace(/<p/g, '<p class="rich_p" ');
      let content = "";
      if (res.data.workCase) {
        content = WxParse.wxParse('article', 'html', res.data.workCase, that, 5);
      } else {
        content = WxParse.wxParse('article', 'html', `<p style="text-indent:1em">暂无案例</p>`, that, 5);
      }
      that.setData({
        masterDetail: res.data,
        content: content,
        imgList: res.data.certificateImage,
        html: res.data.workCase
      });
  
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let userId = wx.getStorageSync("token").userId;
    if (userId) {
      this.initUserInfo();
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