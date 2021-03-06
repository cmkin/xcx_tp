// pages/menu/menu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	menu:[
		{
			img:"../../images/p1.png",
			text:"菜品管理",
			url:"/pages/index/index"
		},
		{
			img:"../../images/p2.png",
			text:"食谱录入",
			url:"/pages/recipes/recipes?type=4&title=食谱录入"
		},
		{
			img:"../../images/p3.png",
			text:"分类管理",
			url:"/pages/classification/classification"
		},
		{
			img:"../../images/p4.png",
			text:"餐厅资料",
			url:"/pages/restaurant/restaurant"
		},
		{
			img:"../../images/p5.png",
			text:"厨师信息",
			url:"/pages/cook/cook"
		},
		{
			img:"../../images/p6.png",
			text:"点餐统计",
			url:"/pages/statistics/statistics"
		},
		{
			img:"../../images/p7.png",
			text:"评价管理",
			url:"/pages/evaluate/evaluate"
		},
		{
			img:"../../images/111.png",
			text:"明天想吃食谱",
			url:"/pages/recipes/recipes?type=1&title=明天想吃食谱"
		},
		{
			img:"../../images/12.png",
			text:"下周想吃食谱",
			url:"/pages/recipes/recipes?type=2&title=下周想吃食谱"
		},
		{
			img:"../../images/13.png",
			text:"外场想吃食谱",
			url:"/pages/recipes/recipes?type=3&title=外场想吃食谱"
		},
		
	]
  },
  goPage(e){
	  wx.navigateTo({
		  url:e.currentTarget.dataset.url
	  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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