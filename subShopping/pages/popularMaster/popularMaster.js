// pages/popularMaster/popularMaster.js
//var cityData = require('../../../utils/city.js'); //引入自己定义的深圳地铁区域及号线数据信息
const WXAPI = require('../../wxapi/main');
const params={
  pageNum:1,
  pageSize:20
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
   technologyTypeList: [],
   list:[],
    qyopen: false, //点击地铁区域筛选滑动弹窗显示效果，默认不显示
    qyshow: true, //用户点击闭关区域的弹窗设置，默认不显示
    
    reimenflag:true,
    cityleft: {}, //获取地铁区域的下拉框筛选项内容
    citycenter: {}, //选择地铁区域左边筛选框后的显示的中间内容部分
    cityright: {}, //选择地铁区域的中间内容部分后显示的右边内容
    select1: '', //地铁区域选中后的第二个子菜单，默认显示地铁下的子菜单
    select2: '', //地铁区域选择部分的中间
    select3: '', //地铁区域选择部分的右边
    selectName1: '', //technologyType
    selectName2: '', //地铁区域选择部分的中间
    selectName3: '', //地铁区域选择部分的右边
    shownavindex: '',//选中哪个筛选条件

    showSalaryVal:false,
    showTechnologyTypeVal:false,
    selectedTechnologyId:null,
    selectedTechnologyName:'',//职业筛选选中后在nav显示的值
    pxIndex: 0, //排序内容下拉框，默认第一个
    haveData:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
 onLoad: function (options) {
    let data={
      level:2
    }
    WXAPI.getPronceCity(data).then(res=>{
      this.setData({
        cityleft: res.data,
        select1:-1
      })  
    });

     WXAPI.getTechnologyTypeList({pageNum:1,pageSize:100}).then(res=>{
      res.data.splice(0,0,{typeId:0,typeName:'全部'})
      this.setData({
         technologyTypeList:res.data
      })
     })

   
  },
  //弹出薪资窗口
  showSalary(e){
    let a=!this.data.showSalaryVal;
    this.setData({
        showSalaryVal:a,
         qyshow:true,
          showTechnologyTypeVal:false
    })
  
  },
  //弹出地区窗口
  listqy: function (e) {
    
    if (this.data.qyopen) {
      this.setData({
        qyopen: false,
        qyshow: true,
        showSalaryVal:false,
        showTechnologyTypeVal:false,
        shownavindex: 0
      })
    } else {
      this.setData({
        qyopen: true,
        qyshow: false,
        showSalaryVal:false,
        showTechnologyTypeVal:false,
        shownavindex: e.currentTarget.dataset.nav
      })
    }

  },
  //弹出工种窗口
  showTechnologyType(){
   let a =!this.data.showTechnologyTypeVal;
    this.setData({
      showTechnologyTypeVal:a,
      showSalaryVal:false,
      qyshow:true,
    })
  },

    // 点击灰色背景隐藏所有的筛选内容
  hidebg: function (e) {
    this.setData({
      qyopen: false,
      qyshow: true,
      shownavindex: 0,
    })
  },
 
  // 地铁区域第一栏选择内容
  selectleft: function (e) {
    let data={
      level:3,
      parentCode: e.target.dataset.code
    }
    this.setData({
      reimenflag: false,
      cityright: {},
      select1: e.target.dataset.city,
      selectName1: e.target.dataset.name,
      select2: '-1'
    });
    WXAPI.getPronceCity(data).then(res => {

      this.setData({
        citycenter:res.data,
      })
    })
  
  },
  // 地铁区域中间栏选择的内容
  selectcenter: function (e) {
    let data = {
      level: 4,
      parentCode: e.target.dataset.code
    }
    this.setData({
      select2: e.target.dataset.city,
      select3: '-1',
      selectName2: e.target.dataset.name,
    });
    WXAPI.getPronceCity(data).then(res => {
      let a={
        name:"全市"
      }
      res.data.splice(0,0,a)
      this.setData({
        cityright: res.data
      })
    })
  },
  // 地铁区域右边栏选择的内容
  selectright: function (e) {
     
    if(e.currentTarget.dataset.city!=0){
         this.setData({
            select3: e.currentTarget.dataset.city,
            selectName3: e.currentTarget.dataset.name,
          });
         params.city= this.data.selectName3 
     }else{
        this.setData({
            select3:'',
            selectName3:'',
          });
         params.city= this.data.selectName2 
        
     }
      this.getHotTechnologyList();
      this.listqy();
  },
  /*从高到底筛选*/
  fromHightoLow(){
    
    params.salary=1;
     this.getHotTechnologyList();
     this.showSalary();
  },
  fromLowtoHigh(){
  params.salary=0;
     this.getHotTechnologyList();
       this.showSalary();
  },
  /*筛选职业*/
  technologyOccupation(e){
     if(e.currentTarget.dataset.id!==0){
      this.setData({
      selectedTechnologyId:e.currentTarget.dataset.id,
      selectedTechnologyName:e.currentTarget.dataset.typename
      })
     params.technologyOccupation=e.currentTarget.dataset.id;
    
     }else{
      this.setData({
      selectedTechnologyId:e.currentTarget.dataset.id,
      selectedTechnologyName:'工种'
      })
      params.technologyOccupation="";
     }
    this.getHotTechnologyList();
   this.showTechnologyType();//关闭工种弹窗
  },
  /*替换*/
  replaceFun(a){
     a.forEach(ele => {
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
    }  
    })
    
    
  },
  //获取大师列表
  getHotTechnologyList(){
    WXAPI.getHotTechnologyList(params).then(res=>{
           
       this.replaceFun(res.data)
          if(res.code==200){
            this.setData({
              list: res.data
            })
          }
          if (res.total==0) {
            this.setData({
              haveData:false
            })
          }else{
            this.setData({
              haveData:true
            })
          }
          
    })    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  this.getHotTechnologyList();
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})