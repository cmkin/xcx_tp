// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    navHeight:0,
    addFlag:false,
    lists:[],
    keyWord:''
  },

  onReady(){
	  this.setData({
	    navHeight: app.globalData.navHeight,
		
	  })
  },
  onLoad() {
    app.post({
      url:'category/list',
      data:{
        keyWord:this.data.keyWord
      },
      success:(res)=>{
        this.setData({
          lists:res.datas
        })
      }
    })
  },
  
})
