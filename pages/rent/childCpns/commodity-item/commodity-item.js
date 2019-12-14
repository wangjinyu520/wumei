// pages/rent/childCpns/commodity-item/commodity-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    commodityitem: {
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
      console.log(e);
      // 1.获取iid
      //const iid = this.data.commodityitem.iid;
      // 2.跳转到对应的路径
      wx.navigateTo({
        url: 'pages/product/product?id=' + e.currentTarget.dataset.id,
      })
    }
  }
})
