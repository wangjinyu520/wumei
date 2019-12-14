// pages/light/childCpns/w-gaffers-item/w-gaffers-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    gaffersitem: {
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
    itemClick(e) {
      // 1.获取iid
      const iid = this.data.gaffersitem.iid;
      // 2.跳转到对应的路径
      wx.navigateTo({
        url: '/pages/detail/detail?iid=' + iid,
      })
    }
  }
})