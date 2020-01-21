// pages/index/index.js
const app = getApp()
const WXAPI = require('../../wxapi/main')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isfull: false,
    qyopen: false, //点击地铁区域筛选滑动弹窗显示效果，默认不显示
    qyshow: true, //用户点击闭关区域的弹窗设置，默认不显示
    currentId: -1,
    TabCur: 0,
    scrollLeft: 0,
    list: ["全部", "灯光师", "音响师", "视频师", "项目经理", "搭建", "舞美设计"],
    cityData: [], //热门城市的数据
    currentCity: "",
    masters: null,
    activityList: null,
    modalName:''
  },
  // 点击搜索那里面的加号
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    let id=e.currentTarget.dataset.id;
    console.log(id);
    console.log(e)
    this.setData({
      modalName: null
    })
    if(id==0){
      wx.navigateTo({
        url: '/subShopping/pages/publishRequirements/publishRequirements',

      })
    }else if(id==1){
    wx.showToast({
      title: '还在快速开发中',
    })
    }
  },
  // 选择城市的动画
  toOpen(e) {
    this.setData({
      showView: true
    })
  },
  //大师更多页面
  goLight: function(e) {
    wx.navigateTo({
      url: '/subShopping/pages/popularMaster/popularMaster?selectCate=' + this.data.TabCur,
    })
  },
  // 大师类型
  getTechnologyTypeList: function(e) {
    WXAPI.getTechnologyTypeList().then(res => {
      if (res.code == 200) {
        res.data = res.data.map(ele => {
          return ele.typeName
        })
        res.data.unshift('全部');
        this.setData({
          list: res.data
        })
      } else {
        wx.showToast({
          icon: "none",
          title: res.message,
        })
      }
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
  // 切换大师的选项
  tabSelect(e) {
    let index = e.currentTarget.dataset.id;
    this.setData({
      TabCur: index,
      scrollLeft: (index - 1) * 60
    })
    this.getDateListInfo();
  },
  // 大师详情
  toDetailsMaster: function(e) {
    console.log(e);
    wx.navigateTo({
      url: '/subShopping/pages/masterDetail/masterDetail?id=' + e.currentTarget.dataset.id,
    })
  },
  //获取不同类型的大师
  getDateListInfo: function() {
    // console.log('推荐')
    var that = this;
    let data = {
      pageNum: 1,
      pageSize: 2,
      technologyOccupation: that.data.TabCur,
      city: that.data.currentCity
    };
    console.log(data);
    WXAPI.getHotTechnologyList(data).then(res => {
      if (res.code == 200) {
        if (res.data) {
          that.setData({
            masters: res.data,
          })
          var masters = that.data.masters.map(ele => {
            if (ele.technologyOccupation == 1) {
              ele.technologyOccupation = '灯光师'
            } else if (ele.technologyOccupation == 2) {
              ele.technologyOccupation = '音响师'
            } else if (ele.technologyOccupation == 3) {
              ele.technologyOccupation = '视频师'
            } else if (ele.technologyOccupation == 4) {
              ele.technologyOccupation = '项目经理'
            } else if (ele.technologyOccupation == 5) {
              ele.technologyOccupation = '搭建'
            } else if (ele.technologyOccupation == 6) {
              ele.technologyOccupation = '舞美设计'
            } else {}
            return ele;
          })
          that.setData({
            masters
          })
        } else {

        }

      }

    })
  },
  // 获取轮播接口
  getBannerList: function(e) {
    let that = this;
    let data = {
      pageNum: 1,
      pageSize: 2
    }
    WXAPI.getBannerList(data).then(res => {
      if (res.code == 200) {
        that.setData({
          banners: res.data
        })
      } else {
        wx.showToast({
          title: res.message,
        })
      }

    })
  },
  toTechnology: function() {
    wx.navigateTo({
      url: '/subShopping/pages/technology/technology',
    })
  },
  turn_search: function() {
    wx.navigateTo({
      url: "/subShopping/pages/search/search?type=commodity"
    })
  },
  //获取经纬度
  selectCity: function(e) {
    // 定位所在的城市
    let that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var longitude = res.longitude
        var latitude = res.latitude
        that.loadCity(longitude, latitude);
      }
    })
    // 注意
  },

  // 获取百度地图的城市
  loadCity: function(longitude, latitude) {
    var page = this
    wx.request({
      url: 'https://api.map.baidu.com/reverse_geocoding/v3/?ak=xlgfUBXvHyF9qcUlY80fUCBa531152xP&output=json&coordtype=wgs84ll&location=' + latitude + ',' + longitude,
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        var city = res.data.result.addressComponent.province;
        page.loadCityData(city);
        page.setData({
          currentCity: city
        });
      },
      fail: function() {
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
  getCityList: function(e) {
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
  // 地址区域列表下拉框是否隐藏
  listqy: function(e) {
    this.setData({
      qyopen: !this.data.qyopen,
      qyshow: !this.data.qyshow,
      isfull: !this.data.isfull,
    })


  },

  // 点击灰色背景隐藏所有的筛选内容
  hidebg: function(e) {
    this.setData({
      qyopen: false,
      qyshow: true,
      isfull: false,
    })
  },
  // 通过城市获取首页的数据
  loadCityData: function(city) {
    let data = {
      city: city
    }
    WXAPI.getHomeList(data).then(res => {
      if (res.code == 200) {
        this.setData({
          masters: res.data.technologyTask,
          activityList: res.data.activityTask,
        })
        wx.hideLoading()
        var masters = this.data.masters.map(ele => {
          if (ele.technologyOccupation == 1) {
            ele.technologyOccupation = '灯光师'
          } else if (ele.technologyOccupation == 2) {
            ele.technologyOccupation = '音响师'
          } else if (ele.technologyOccupation == 3) {
            ele.technologyOccupation = '视频师'
          } else if (ele.technologyOccupation == 4) {
            ele.technologyOccupation = '项目经理'
          } else if (ele.technologyOccupation == 5) {
            ele.technologyOccupation = '搭建'
          } else if (ele.technologyOccupation == 6) {
            ele.technologyOccupation = '舞美设计'
          } else {}
          return ele;
        })
        this.setData({
          masters
        })
      } else {

      }


    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.selectCity(); //获取定位城市
    this.getCityList(); //获取城市列表
    this.getBannerList();
    this.getTechnologyTypeList();
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
    wx.showTabBar();

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