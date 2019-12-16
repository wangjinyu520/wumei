
const app = getApp()
let globalData = app.globalData;// pages/joinfrom/joinfrom.js
Page({
  data: {
    showModalStatus: false,
    checkboxArr: [{
      name: '微信',
      id: 0,
      status: 0
    }, {
      name: '公司',
      id: 1,
      status: 0
    }, {
      name: '职位',
      id: 2,
      status: 0
    }, {
      name: '手机号',
      id: 3,
      status: 0
    }, {
      name: '性别',
      id: 4,
      status: 0
    }, {
      name: '邮箱',
      id: 5,
      status: 0
    }, {
      name: '附件',
      id: 6,
      status: 0
    }],
    commonselectform: [],
    definedform: [],
    currentId: -1,
    inputvalue: null,
    concatlist: []
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数


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
        wx.showToast({
          title: '添加成功',
          icon: 'succes',
          duration: 1000,
          mask: true
        })
      }
    }.bind(this), 200)
    // 显示  
    if (currentStatu == "open") {
      this.setData({
        showModalStatus: true
      });
    }
  },

  // 添加表单项
  checkbox: function(e) {
    var index = e.currentTarget.dataset.item.id; //获取当前点击的下标
    // console.log(index);
    let name = e.currentTarget.dataset.item.name;
    let commonselectform = this.data.commonselectform;
    let newselect = commonselectform.map(ele => {
      return ele.id;
    })
    if (newselect.indexOf(index) === -1) {
      this.data.commonselectform.push({
        'id': index,
        'name': name,
        'zstatus': 0
      });
    } else {
      let sindex = newselect.indexOf(index);
      console.log(this.data.commonselectform);
      this.data.commonselectform.splice(sindex, 1);
    }
    var checkboxArr = this.data.checkboxArr; //选项集合
    checkboxArr[index].status = !checkboxArr[index].status; //改变当前选中的checked值
    this.setData({
      checkboxArr: checkboxArr
    });
    // console.log(newselect);
    // console.log(this.data.commonselectform);
  },
  checkboxChange: function(e) {
    var checkValue = e.detail.value;
    this.setData({
      checkValue: checkValue
    });
  },
  //添加自定义项
  additem: function(e) {
    let i = 0;
    if (e.detail.value) {
      this.data.definedform.push({
        'id': i,
        'name': e.detail.value,
        'zstatus': 0
      })

      i++;
    }

  },
  //获取焦点的时候内容为空
  setnull: function(e) {
    this.data.inputvalue = null;
  },
  //点击合并两种表单
  saveinput: function(e) {
    let newArr = this.data.commonselectform.concat(this.data.definedform);
    this.setData({
      concatlist: newArr
    })
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu);
    // console.log(this.data.commonselectform);
    // console.log(this.data.definedform);
    // console.log(this.data.concatlist);
    // console.log(newArr);

    
  },
  checkboxChangeList: function(e) {
 
    let id=e.currentTarget.dataset.id;
    this.data.concatlist[id].zstatus = !this.data.concatlist[id].zstatus;
    // console.log(this.data.concatlist);
  },
  // 保存
  savesubmit:function(e){
    this.data.concatlist.unshift({ 'id': -1, 'name': '姓名', 'zstatus': 1});
    globalData.concatlist = this.data.concatlist;
    wx.switchTab({
      url: '/pages/publish/publish',
    })
   
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