// pages/statistics/statistics.js
const app =getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		date: '2021-03-07',
		date2: '2021-03-07'
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		this.getlist()
	},
	getlist(){
		app.post({
			url:"votes/stat",
			data:{
				startDate:this.data.date,
				endDate:this.data.date2
			},
			success(res){
				console.log(res)
			}
		})
	},
	bindDateChange: function(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			date: e.detail.value
		})
		this.getlist()
	},
	bindDateChange2: function(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			date2: e.detail.value
		})
		this.getlist()
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
