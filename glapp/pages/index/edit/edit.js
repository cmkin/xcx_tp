// pages/index/edit/edit.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
	winHeightTab:0,
	id:null,
	item:{
		dishesName:'',
		categoryId:'',
		dishesPic:''
	}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		console.log(options.item)
		if(options.id){
			this.setData({
				id:options.id
			})
		}else{
			let item = JSON.parse(decodeURIComponent(options.item))
			this.setData({
				item: {
					dishesName:item.dishes_name,
					categoryId:item.dishes_id,
					dishesPic:item.dishes_thumb
				}
			})
		}
		console.log(JSON.parse(decodeURIComponent(options.item)))
		
  },
  delimg(){
	  this.setData({
		  'item.dishesPic':''
	  })
  },
  back(){
	  wx.navigateBack()
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