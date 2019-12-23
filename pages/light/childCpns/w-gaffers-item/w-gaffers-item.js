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
    itemClick: function (e) {
      wx.navigateTo({
        url: '/pages/technology/technology?id=' + e.currentTarget.dataset.id,
      })
    }
    
  }
})