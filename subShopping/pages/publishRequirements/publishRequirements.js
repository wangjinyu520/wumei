// pages/publishRequirements/publishRequirements.js
const WXAPI = require('../../wxapi/main')
const app = getApp()
let data={}
let mulImage=[];
Page({

  /**
   * 页面的初始数据
   */
  data: {
     nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    region
      title: '发布需求', //导航栏 中间的标题
    },
     height: app.globalData.statusBarHeight * 2 + 20,
     imgs: [],
    upload_picture_list: [],
    region: ['请选择地址', '', ''],
    startDate: '请选择开始日期',
    endDate:'请选择结束日期',
    technologyTypeList:[ ],
    selectedType:'',
    canSubmit:false
  },
  //提交
  fromSubmit(e){
    console.log(e)
     
        let userId=wx.getStorageSync('token').userId
  if(e.detail.value.activityTheme!=""&&e.detail.value.caseCity.length!=0&&
    e.detail.value.startTime!=""&&e.detail.value.endTime!=""&&
    e.detail.value.contactPerson!=""&&e.detail.value.contactPhone!=""&&
    e.detail.value.salary!=""&&e.detail.value.technologyTypeId!=""){
     
     if (new Date().getTime() > new Date(e.detail.value.endTime).getTime()) {
      wx.showModal({
        title: '结束时间应当在当前时间之后',
      })
      return;
    }else if(e.detail.value.contactPhone.length!=11||!/^1[3456789]\d{9}$/.test(e.detail.value.contactPhone)){
       wx.showModal({
        title: '请填写正确的手机号',
      })
      return
    }else{
       let a=e.detail.value.caseCity.join('');
       data={
        userId:userId,
        demandTitle:e.detail.value.activityTheme,
        demandLocation:a,
        startTime:e.detail.value.startTime,
        endTime:e.detail.value.endTime,
        technologyType:e.detail.value.technologyTypeId,
        salary:e.detail.value.salary,
        contacts:e.detail.value.contactPerson,
        contact:e.detail.value.contactPhone
       }
     if (mulImage.length!=0&&e.detail.value.required!="") {
       data.demandImage = mulImage.join(',');
       data.detail=e.detail.value.required;
       console.log(data)
    }else if(mulImage.length!=0){
       data.demandImage = mulImage.join(',');
    }else if(e.detail.value.required!=""){
       data.detail=e.detail.value.required;
    } 
    console.log(data)
   this.submitFun(data);
     } 

  }else{
     wx.showToast({
        title: '请填完每一项',
        icon: 'none',
        duration: 1000
      })
      return false;
  }
  },
  //提交表单
  submitFun(a){
    WXAPI.addDemand(a).then(res=>{
        if(res.code==200){
            wx.showToast({
              title: '提交成功',
              icon: 'none',
              duration: 1000
            })
        }
      })
    },
  //选择城市
    RegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  //选择日期
    DateChange(e) {
      console.log(e)
    this.setData({
      startDate: e.detail.value
    })
  },
  endDateChange(e){
   this.setData({
    endDate:e.detail.value
   })
  },
  //选择工种
  bindPickerChange(e){
    console.log(e)
    this.setData({
      selectedType:e.detail.value
    })
  },
    //选择图片方法
  uploadpic: function(e) {
    let that = this //获取上下文
    let upload_picture_list = that.data.upload_picture_list
    //选择图片
    wx.chooseImage({
      count: 8, // 默认9，这里显示一次选择相册的图片数量 
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) { // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
        let tempFiles = res.tempFiles
        //把选择的图片 添加到集合里
        for (let i in tempFiles) {
          upload_picture_list.push(tempFiles[i])
        }
        //显示
        that.setData({
          upload_picture_list: upload_picture_list,
        });
        that.uploadimage();
      }
    })
  },
  // 点击上传图片
  uploadimage: function() {
    // console.log(this.data.upload_picture_list.length);
    var that = this;
    for (let i = 0; i < this.data.upload_picture_list.length; i++) {
      that.uploadFile(i).then(res => {
        mulImage.push(res.data);
      });
    }

  },
    uploadFile: function(i) {
    return new Promise((resolve, reject) => {
      const app = getApp();
      let filterName = {
        "filterName": "company"
      }
      wx.uploadFile({
        url: 'http://10.20.11.252:8080/wumei-server/file/imageUpload',
        header: {
          'content-type': 'multipart/form-data'
        },
        filePath: this.data.upload_picture_list[i].path,
        formData: filterName,
        name: 'file', //name是后台接收到字段
        success: function(result) {
          console.log(result);
          const res = JSON.parse(result.data);
          res.status === -1 ? reject(res) : resolve(res);
        },
        fail: function(res) {}
      })
    });
  },
  // 点击删除图片
  deleteImg(e) {
    let upload_picture_list = this.data.upload_picture_list;
    let index = e.currentTarget.dataset.index;
    upload_picture_list.splice(index, 1);
    this.setData({
      upload_picture_list: upload_picture_list
    });
  },
  // 预览图片
  previewImg(e) {
    //获取当前图片的下标
    console.log(e)
    let index = e.currentTarget.dataset.index;
    //所有图片
    let imgs = this.data.imgs;
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  },
  //获取工种
  getTechnologyTypeList(){
   
    WXAPI.getTechnologyTypeList({pageNum:1,pageSize:40}).then(res=>{
      if(res.code==200){
         this.setData({
           technologyTypeList:res.data
         });
         // res.data.forEach(item=>{
         //   this.data.technologyTypeList.push(item)
         // })
        
         
      }
    })
  },
  onLoad: function() {
    this.getTechnologyTypeList();
  },

})