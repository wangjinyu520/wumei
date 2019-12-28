// // components/myComponent.js
// Component({
//   data: {
//     upload_picture_list: []
//   },
//   methods: {
//     // 点击上传图片
//     uploadimage: function() {
//       // console.log(this.data.upload_picture_list.length);
//       var that = this;
//       for (let i = 0; i < this.data.upload_picture_list.length; i++) {
//         // return new Promise((resolve, reject) => {
//           wx.uploadFile({
//             url: 'http://10.20.11.126:8080/wumei-server/file/imageUpload',
//             header: {
//               'content-type': 'multipart/form-data'
//             },
//             filePath: this.data.upload_picture_list[i].path,
//             formData: {
//               "filterName": new Date().getTime()
//             },
//             name: 'file', //name是后台接收到字段
//             success: function(res) {
//               resolve(res.data)
//             },
//             fail: function(res) {
//               reject()
//             }
//           })
//         // })

//       }

//     },
//   }
// })