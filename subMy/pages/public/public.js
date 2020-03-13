// subMy/pages/public/public.js



// subMy/pages/myPublic/myPublic.js
const WXAPI = require('../../wxapi/main')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    pageSize: 6,
    contentlist: null,
    modalName: "",
    deleteId: '',
    orderType: ["我申请的", "我发布的"],
    myPublic: true, //设置编辑分享这些按钮是否显示
    currentId: 0,
  },
  tabItem(e) {
    console.log(e.detail.index); //子组件中设置的index为传递数值的参数，父组件的接收方式
    let index = e.detail.index;
    this.setData({
      currentId: index
    })
    switch (index) {
      case 0:
        this.setData({
          myPublic: true,
          page: 1
        })
        this.getApply();
        break;
      case 1:
        this.setData({
          myPublic: false,
          page: 1
        })
        this.getPublic();
        break;
    }
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target,
      deleteId: e.currentTarget.dataset.id
    })
  },

  submitDelete(e) {
    let that = this;
    let data = {
      demandId: that.data.deleteId
    }
    WXAPI.deleteDemand(data).then(res => {
      if (res.code == 200) {
        that.data.contentlist.splice(e.currentTarget.dataset.index, 1);
        that.setData({
          modalName: null
        })
      }
    })
  },
  toEditer(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/subMy/pages/editorRemad/editorRemad?id=' + id,
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  // 获取我申请的数据列表
  getApply: function () {
    var that = this;
    let data = {
      pageNum: this.data.page,
      pageSize: this.data.pageSize,
      userId: wx.getStorageSync('token').userId
    }
    WXAPI.getMyApply(data).then(res => {
      if (res.code == 200) {
        var contentlistTem = that.data.contentlist //总的数据列表
        if (res.data) {
          if (that.data.page == 1) {
            contentlistTem = []
          }
          var contentlist = res.data //contentlist每次返回的个数,这个判断重要就是最后一次数据获取的判断
          contentlist.forEach(ele => {
            if (ele.activated == 0) {
              return ele.activated = "待审核"
            } else if (ele.activated == 1) {
              return ele.activated ="等待接单"
            } else if (ele.activated == 2) {
              return  ele.activated = "已有人申请"
            } else if (ele.activated == 3) {
              return ele.activated = "已接单"
            } else if (ele.activated == 4) {
              return ele.activated ="进行中"
            } else if (ele.activated == 5) {
              return ele.activated = "已完成"
            } else if (ele.activated == 6) {
              return ele.activated ="已评价"
            } else if (ele.activated == 7) {
              return ele.activated = "无人接单自动关闭"
            }
          })
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
  // 获取我发布的数据列表
  getPublic: function () {
    var that = this;
    let data = {
      pageNum: this.data.page,
      pageSize: this.data.pageSize,
      userId: wx.getStorageSync('token').userId
    }
    WXAPI.getMyDemand(data).then(res => {
      if (res.code == 200) {
        var contentlistTem = that.data.contentlist //总的数据列表
        if (res.data) {
          if (that.data.page == 1) {
            contentlistTem = []
          }
         
          var contentlist = res.data //contentlist每次返回的个数,这个判断重要就是最后一次数据获取的判断
          contentlist.forEach(ele => {
            if (ele.activated == 0) {
              return ele.activated = "待审核"
            } else if (ele.activated == 1) {
              return ele.activated ="等待接单"
            } else if (ele.activated == 2) {
              return  ele.activated = "已有人申请"
            } else if (ele.activated == 3) {
              return ele.activated = "已接单"
            } else if (ele.activated == 4) {
              return ele.activated ="进行中"
            } else if (ele.activated == 5) {
              return ele.activated = "已完成"
            } else if (ele.activated == 6) {
              return ele.activated ="已评价"
            } else if (ele.activated == 7) {
              return ele.activated = "无人接单自动关闭"
            }
          })
          console.log(contentlist);
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
  // 点击进入需求详情
  goDemandDetail(e){
   let id=e.currentTarget.dataset.id;
   if(this.data.currentId==0){
     wx.navigateTo({
       url: 'subMy/pages/myApplyDetail/myApplyDetail?id='+id,
     })
   }else{
    wx.navigateTo({
      url: 'subMy/pages/myPublicDetail/myPublicDetail?id='+id,
    })
   }
   console.log(id);
   console.log(e)
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
    if (this.data.currentId == 0) {
      this.getApply();
    } else if (this.data.currentId == 1) {
      this.getPublic();
    }
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.data.page = 1
    if (this.data.currentId == 0) {
      this.getApply();
    } else if (this.data.currentId == 1) {
      this.getPublic();
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(this.data.hasMoreData);
    if (this.data.hasMoreData) {
      if (this.data.currentId == 0) {
        this.getApply();
      } else if (this.data.currentId == 1) {
        this.getPublic();
      }
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
  onShareAppMessage: function () {

  }
})