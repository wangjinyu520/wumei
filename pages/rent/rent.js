// var cityData = require('../../../utils/city.js'); //引入自己定义的深圳地铁区域及号线数据信息
const WXAPI = require('../../wxapi/main');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    content: [],
    px: ['灯光师', '音响师', '视频师', '项目经理', '搭建工头', '平面设计', '3D设计'], //排序列表内容
    qyopen: false, //点击地铁区域筛选滑动弹窗显示效果，默认不显示
    qyshow: true, //用户点击闭关区域的弹窗设置，默认不显示
    nzopen: false, //价格筛选弹窗
    pxopen: false, //排序筛选弹窗
    nzshow: true,
    pxshow: true,
    isfull: false,
    reimenflag: true,
    cityleft: {}, //获取地铁区域的下拉框筛选项内容
    citycenter: {}, //选择地铁区域左边筛选框后的显示的中间内容部分
    cityright: {}, //选择地铁区域的中间内容部分后显示的右边内容
    select1: '', //地铁区域选中后的第二个子菜单，默认显示地铁下的子菜单
    select2: '', //地铁区域选择部分的中间
    select3: '', //地铁区域选择部分的右边
    selectName1: '', //地铁区域选中后的第二个子菜单，默认显示地铁下的子菜单
    selectName2: '', //地铁区域选择部分的中间
    selectName3: '', //地铁区域选择部分的右边
    shownavindex: '',
    page: 1,
    pageSize: 4,
    contentlist: null, //数据列表,
    hasMoreData: '',
    searchValue: '',
    city: '',
    cityData:[],
    technologyType: '' //选中的分类

  },
  // 获取分类列表
  getTechnologyTypeList: function (e) {
    WXAPI.getTechnologyTypeList().then(res => {
      if (res.code == 200) {
        res.data = res.data.map(ele => {
          return ele.typeName
        })
        res.data.unshift('全部');
        this.setData({
          px: res.data
        })
      } else {
        wx.showToast({
          icon: "none",
          title: res.message,
        })
      }
    })
  },
  // 获取需求列表的内容
  getMusicInfo: function (data) {
    var that = this;
    WXAPI.getDemandList(data).then(res => {
      if (res.code == 200) {
        var contentlistTem = that.data.contentlist //总的数据列表
        if (res.data) {
          if (that.data.page == 1) {
            contentlistTem = []
          }
          var contentlist = res.data //contentlist每次返回的个数
          if (contentlist.length < that.data.pageSize) {
            that.setData({
              contentlist: contentlistTem.concat(contentlist),
              hasMoreData: true
            })
          } else {
            that.setData({
              contentlist: contentlistTem.concat(contentlist),
              hasMoreData: false,
              page: that.data.page + 1
            })
            console.log(that.data.page)
          }
        } else {
          that.setData({
            contentlist: null
          })
        }
      }
    })
  },
  // 搜索获取值
  inputBind: function (e) {
    this.setData({
      searchValue: e.detail.value
    })
  },
  // 搜索列表后台数据
  getActivityInfo: function (e) {
    console.log(this.data.searchValue);
    this.setData({
      page: 1
    })
    let data = {
      pageNum: this.data.page,
      pageSize: this.data.pageSize,
      demandTitle: this.data.searchValue,
      city: this.data.city,
      technologyType: this.data.technologyType,
    }
    this.getMusicInfo(data);
  },
  // 大师申请订单
  toApply: function (e) {
    console.log(e.currentTarget.dataset.id);
    if (wx.getStorageSync('token').userType != 3) {
      wx.showToast({
        icon: "none",
        title: '你还不是大师不能申请接单',
      })
      return
    }
    wx.navigateTo({
      url: '/subShopping/pages/commandDetail/commandDetail?demandId=' + e.currentTarget.dataset.id,
    })
  },
  toRemand: function (e) {
    wx.navigateTo({
      url: '/subShopping/pages/publishRequirements/publishRequirements'
    })
  },
  //获取经纬度
  selectCity: function (e) {
    // 定位所在的城市
    let that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var longitude = res.longitude
        var latitude = res.latitude
        that.loadCity(longitude, latitude);
      }
    })
    // 注意
  },
  // 获取百度地图的城市
  loadCity: function (longitude, latitude) {
    var page = this
    wx.request({
      url: 'https://api.map.baidu.com/reverse_geocoding/v3/?ak=xlgfUBXvHyF9qcUlY80fUCBa531152xP&output=json&coordtype=wgs84ll&location=' + latitude + ',' + longitude,
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var city = res.data.result.addressComponent.province;
        page.loadCityData(city);
        page.setData({
          currentCity: city
        });
      },
      fail: function () {
        wx.showToast({
          title: '获取定位失败',
          icon: 'none',
        })
        page.setData({
          currentCity: "上海省"
        });
      },

    })
  },
  // 获取城市
  getCityList: function (e) {
    // 定位所在的城市
    // 注意
    let data = {
      level: 2
    }
    WXAPI.getPronceCity(data).then(res => {
      this.setData({
        cityData: res.data,
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTechnologyTypeList();
    this.selectCity(); //获取定位城市
    this.getCityList(); //获取城市列表
    data = {
      pageNum: this.data.page,
      pageSize: this.data.pageSize,
      demandTitle: '',
      city: '',
      technologyType: '',
    }
    this.getMusicInfo(data);
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(this.data.hasMoreData);
    if (!this.data.hasMoreData) {
      let data = {
        pageNum: this.data.page,
        pageSize: this.data.pageSize,
        demandTitle: this.data.searchValue,
        city: this.data.city,
        technologyType: this.data.technologyType,
      }
      this.getMusicInfo(data);
    } else {
      wx.showToast({
        title: '没有更多数据',
        icon: 'none'
      })
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.data.page = 1
    let data = {
      pageNum: this.data.page,
      pageSize: this.data.pageSize,
      demandTitle: this.data.searchValue,
      city: this.data.city,
      technologyType: this.data.technologyType,
    }
    console.log(this.data.page);
    this.getMusicInfo(data);
  },




  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 定位地址区域列表下拉框是否隐藏
  listqys: function (e) {
    this.setData({
      qyopen: !this.data.qyopen,
      qyshow: !this.data.qyshow,
      isfull: !this.data.isfull,
    })
  },
  // 切换城市选项
  toSelectCity(e) {
    let cityItem = e.currentTarget.dataset.name;
    let index = e.currentTarget.dataset.index;
    let that = this;
    that.setData({
      currentCity: cityItem,
      showView: true,
      currentId: index,
      isfull: false,
      qyopen: false,
      qyshow: true, //用户点击闭关区域的弹窗设置，默认不显示
    })
    this.loadCityData(cityItem);
    wx.showLoading({
      title: '加载中...',
    })
  },
  // 通过城市获取首页的数据
  loadCityData: function (city) {
    let data = {
      city: city
    }
    // WXAPI.getHomeList(data).then(res => {
    //   if (res.code == 200) {
    //     this.setData({
    //       masters: res.data.technologyTask,
    //       activityList: res.data.activityTask,
    //     })
    //     wx.hideLoading()
    //     var masters = this.data.masters.map(ele => {
    //       if (ele.technologyOccupation == 1) {
    //         ele.technologyOccupation = '灯光师'
    //       } else if (ele.technologyOccupation == 2) {
    //         ele.technologyOccupation = '音响师'
    //       } else if (ele.technologyOccupation == 3) {
    //         ele.technologyOccupation = '视频师'
    //       } else if (ele.technologyOccupation == 4) {
    //         ele.technologyOccupation = '项目经理'
    //       } else if (ele.technologyOccupation == 5) {
    //         ele.technologyOccupation = '搭建'
    //       } else if (ele.technologyOccupation == 6) {
    //         ele.technologyOccupation = '舞美设计'
    //       } else {}
    //       return ele;
    //     })
    //     this.setData({
    //       masters
    //     })
    //   } else {

    //   }
    // })
  },
  // 价格下拉框是否隐藏
  list: function (e) {
    if (this.data.nzopen) {
      this.setData({
        nzopen: false,
        pxopen: false,
        qyopen: false,
        nzshow: false,
        pxshow: true,
        qyshow: true,
        isfull: false,
        shownavindex: 0
      })
    } else {
      this.setData({
        content: this.data.nv,
        nzopen: true,
        pxopen: false,
        qyopen: false,
        nzshow: false,
        pxshow: true,
        qyshow: true,
        isfull: true,
        shownavindex: e.currentTarget.dataset.nav
      })
    }
  },
  // 排序下拉框是否隐藏
  listpx: function (e) {
    if (this.data.pxopen) {
      this.setData({
        nzopen: false,
        pxopen: false,
        qyopen: false,
        nzshow: true,
        pxshow: false,
        qyshow: true,
        isfull: false,
        shownavindex: 0
      })
    } else {
      this.setData({
        content: this.data.px,
        nzopen: false,
        pxopen: true,
        qyopen: false,
        nzshow: true,
        pxshow: false,
        qyshow: true,
        isfull: true,
        shownavindex: e.currentTarget.dataset.nav
      })
    }
    console.log(e.target)
  },
  // 地铁区域第一栏选择内容
  selectleft: function (e) {
    if (e.target.dataset.code !== 0) {
      let data = {
        level: 3,
        parentCode: e.target.dataset.code
      }
      this.setData({
        selectName1: e.target.dataset.name,
      });
      WXAPI.getPronceCity(data).then(res => {
        res.data.unshift({
          name: '全省',
          code: 0
        });
        this.setData({
          citycenter: res.data,
        })
      })
    } else {
      this.setData({
        selectName1: '',
        city: ''
      });
    }
    this.setData({
      reimenflag: false,
      cityright: {},
      select1: e.target.dataset.city,
      select2: '-1'
    });


  },


  // 点击灰色背景隐藏所有的筛选内容
  hidebg: function (e) {
    this.setData({
      qyopen: false,
      nzopen: false,
      pxopen: false,
      nzshow: true,
      pxshow: true,
      qyshow: true,
      isfull: false,
      shownavindex: 0,
    })
  },
  // 地铁区域清空筛选项
  quyuEmpty: function () {
    this.setData({
      select1: '',
      select2: '',
      select3: '',
      selectName1: '',
      selectName2: '',
      selectName3: '-1',
      page: 1,
      qyopen: false,
      nzopen: false,
      pxopen: false,
      nzshow: true,
      pxshow: true,
      qyshow: false,
      isfull: false,
    })
    let data = {
      pageNum: this.data.page,
      pageSize: this.data.pageSize,
      demandTitle: this.data.searchValue,
      city: '',
      technologyType: this.data.technologyType,
    }
    console.log(this.data.page);
    this.getMusicInfo(data);
  },
  // 地铁区域选择筛选项后，点击提交
  submitFilter: function () {
    // 隐藏地铁区域下拉框
    this.setData({
      qyopen: false,
      nzopen: false,
      pxopen: false,
      nzshow: true,
      pxshow: true,
      qyshow: false,
      isfull: false,
      page: 1,
      shownavindex: 0
    })
    this.data.page = 1;
    let city = "";
    if (this.data.selectName1 == this.data.selectName2) {
      city = this.data.selectName1 + this.data.selectName3;
    } else {
      city = this.data.selectName1 + this.data.selectName2 + this.data.selectName3;
    }
    this.setData({
      city: city
    })
    //地铁区域选中后的第二个子菜单，默认显示地铁下的子菜单
    let data = {
      pageNum: this.data.page,
      pageSize: this.data.pageSize,
      demandTitle: this.data.searchValue,
      city: city,
      technologyType: this.data.technologyType,
    }
    this.getMusicInfo(data);

  },
  // 左边滑块滑动的值
  leftSchange: function (e) {
    console.log('左边改变的值为：' + e.detail.value);
    let currentValue = parseInt(e.detail.value);
    let currentPer = parseInt(currentValue)
    var that = this;
    that.setData({
      leftValue: e.detail.value //设置左边当前值
    })
  },
  // 右边滑块滑动的值
  rightSchange: function (e) {
    console.log('右边改变的值为：' + e.detail.value);
    let currentValue = parseInt(e.detail.value);
    var that = this;
    that.setData({
      rightValue: e.detail.value,
    })
  },
  // 价格筛选框重置内容
  PriceEmpty: function () {
    this.setData({
      leftValue: 1000, //左边滑块默认值
      rightValue: 6000, //右边滑块默认值
    })
  },
  // 排序内容下拉框筛选
  selectPX: function (e) {
    console.log(e.currentTarget.dataset.index);
    this.setData({
      technologyType: e.currentTarget.dataset.index,
      nzopen: false,
      pxopen: false,
      qyopen: false,
      nzshow: true,
      pxshow: false,
      qyshow: true,
      isfull: false,
      shownavindex: 0,
      page: 1
    });
    let data = {
      pageNum: this.data.page,
      pageSize: this.data.pageSize,
      demandTitle: this.data.searchValue,
      city: this.data.city,
      technologyType: this.data.technologyType,
    }
    this.getMusicInfo(data);
  },

})