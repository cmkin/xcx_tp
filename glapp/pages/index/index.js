// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    winHeightTab:0
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onReady(){
	  this.setData({
	    winHeightTab: app.globalData.winHeightTab
	  })
  },
  onLoad() {
    
  },
  
})
