// pages/home/childCpns/w-masters-item/w-masters-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mastersitem: {
      type: Object,
      value: {}
    }

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //itemClick(e) {
      // 1.获取iid
      //const iid = this.data.mastersitem.iid;
      // 2.跳转到对应的路径
      //wx.navigateTo({
       // url: '/pages/detail/detail?iid=' + iid,
      //})
    //}
  //},
  toDetailsMaster: function (e) {
    //const iId = this.data.mastersitem.iid;
    console.log(e);
    wx.navigateTo({
      url: '/pages/technology/technology?id=' + e.currentTarget.dataset.id,
    })
  }
  },
})