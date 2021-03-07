// pages/index/edit/edit.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
	winHeightTab:0,
	item:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  this.setData({
		  item:JSON.parse(decodeURIComponent(options.item))
	  })
		console.log(  )
  },
  del(){
	  wx.showModal({
	  	title: '提示',
	  	content: '您是否确定删除？',
	  	success: (res) => {
	  		if (res.confirm) {
	  			app.post({
	  				url: "menu/delPatch",
	  				data: {
	  					ids: this.data.item.dishes_id
	  				},
	  				method: "POST",
	  				success: (res2) => {
	  					wx.navigateBack()
	  				}
	  			})
	  
	  		} else if (res.cancel) {
	  
	  		}
	  	}
	  })
  },
  edit(){
	 wx.navigateTo({
	 	url: '../edit/edit?item=' + encodeURIComponent(JSON.stringify(this.data.item)) 
	 }) 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady(){
  	  this.setData({
  	    winHeightTab: app.globalData.winHeightTab
  	  })
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