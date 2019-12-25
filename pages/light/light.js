// pages/light/light.js
const WXAPI = require('../../wxapi/main')

import {
  getProduct
} from '../../wxapi/main.js'

// const RECOMMEND="recommend"
// const NEW="new"
const BACK_TOP_POSITION = 1000;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    titles: ["推荐", "最新"],
    gaffers: [],
    currentType: 'recommend',
    nowType: '',
    page: 1,
    pageSize: 6, //根据后台每页的数据设定
    currentIndex: 0
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let type = options.type;
    this.setData({
      nowType: type
    });
    this.getRecommendListInfo();
  },
  tabClick(e) {
    // 1.根据当前的点击赋值最新的currentType
    const curType = e.currentTarget.dataset.index;
    this.setData({
      currentIndex: curType,
      page: 1
    });
    switch (curType) {
      case 0:
        this.getRecommendListInfo();
        break
      case 1:
        this.getDateListInfo();
        break
    }

  },
  //获取最新下面的数据
  getDateListInfo: function() {
    // console.log('推荐')
    var that = this;
    let data = {
      pageNum: that.data.page,
      pageSize: that.data.pageSize,
      technologyOccupation: that.data.nowType,
      createDate: 1
    };
    WXAPI.getNewMaster(data).then(res => {
      if (res.code == 200) {
        var contentlistTem = that.data.gaffers //总的数据列表
        if (res) {
          if (that.data.page == 1) {
            contentlistTem = []
          }
          // console.log(globalData.activitynum);/
          var gaffers = res.data //contentlist每次返回的个数
          if (gaffers.length > that.data.pageSize) {
            that.setData({
              gaffers: contentlistTem.concat(gaffers),
              hasMoreData: false
            })
          } else {
            that.setData({
              gaffers: contentlistTem.concat(gaffers),
              hasMoreData: true,
              page: that.data.page + 1
            })
          }
        } else {
          wx.showToast({
            title: '错误信息',
          })
        }
        var result = that.data.gaffers.map(ele => {
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
          } else {

          }
          return ele;
        })
        that.setData({
          gaffers: result
        })
      }
    })
  
  },
  //获取推荐下面的数据
  getRecommendListInfo: function() {
    var that = this;
    console.log('最新');
    let data = {
      pageNum: that.data.page,
      pageSize: that.data.pageSize,
      technologyOccupation: that.data.nowType,
      isRecommend: 1
    };
    WXAPI.getRecommendList(data).then(res => {
      if (res.code == 200) {
        var contentlistTem = that.data.gaffers //总的数据列表
        if (res) {
          if (that.data.page == 1) {
            contentlistTem = []
          }
          // console.log(globalData.activitynum);
          var gaffers = res.data //contentlist每次返回的个数
          if (gaffers.length > that.data.pageSize) {
            that.setData({
              gaffers: contentlistTem.concat(gaffers),
              hasMoreData: false
            })
          } else {
            that.setData({
              gaffers: contentlistTem.concat(gaffers),
              hasMoreData: true,
              page: that.data.page + 1
            })
          }
        } else {
          wx.showToast({
            title: '错误信息',
          })
        }
        var result = that.data.gaffers.map(ele => {
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
          gaffers: result
        })
      }
    })
    // wx.request({
    //   url: 'http://10.20.11.126:8080/wumei-server/technology/getTechnologyList',
    //   data: {
    //     pageNum: that.data.page,
    //     pageSize: that.data.pageSize,
    //     technologyOccupation: that.data.nowType,
    //     isRecommend: 1
    //   },
    //   success: function(res) {
    //     var contentlistTem = that.data.gaffers //总的数据列表
    //     if (res) {
    //       if (that.data.page == 1) {
    //         contentlistTem = []
    //       }
    //       // console.log(globalData.activitynum);
    //       var gaffers = res.data.data //contentlist每次返回的个数
    //       if (gaffers.length > that.data.pageSize) {
    //         that.setData({
    //           gaffers: contentlistTem.concat(gaffers),
    //           hasMoreData: false
    //         })
    //       } else {
    //         that.setData({
    //           gaffers: contentlistTem.concat(gaffers),
    //           hasMoreData: true,
    //           page: that.data.page + 1
    //         })
    //       }
    //     } else {
    //       wx.showToast({
    //         title: '错误信息',
    //       })
    //     }
    //     var result = that.data.gaffers.map(ele => {
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
    //     that.setData({
    //       gaffers: result
    //     })
    //     console.log(that.data.gaffers);


    //   }

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
    this.data.page = 1
    this.getMusicInfo()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log(this.data.hasMoreData);
    if (this.data.hasMoreData) {
      this.getMusicInfo()
    } else {
      wx.showToast({
        title: '没有更多数据',
        icon: 'none'
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})