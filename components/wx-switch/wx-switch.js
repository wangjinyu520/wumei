Component({
  /**
   * 组件的属性列表
   */
  properties: {
    orderType: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentType:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabClick(e){
       // 1.根据当前的点击赋值最新的currentType
    const curType = e.currentTarget.dataset.index;
    this.setData({
      currentType: curType
    })
    this.triggerEvent('Tabevent', {index:curType});//子组件给父组件传值
  }
  }
})