// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    navHeight:0
  },

  onReady(){
	  this.setData({
	    navHeight: app.globalData.navHeight,
		
	  })
  },
  onLoad() {
    
  },
  
})
