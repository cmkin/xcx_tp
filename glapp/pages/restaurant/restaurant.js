// pages/restaurant/restaurant.js
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		formData:{
			main_pic: '../../images/add2.png',
			logo:"../../images/add1.png",
			summary:'',
			score:'',
			name:'',
			bulletin:''
		}
	},


	

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		app.post({
			url:"/canteen/get",
			success:(res)=>{
				this.setData({
					formData:{
						...res.datas
					}
				})
				console.log(res.datas)
			}
		})
	},
	
	
	changeImg(e) {
		wx.chooseImage({
			count: 1,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success: (res) => {
				// tempFilePath可以作为img标签的src属性显示图片
				const tempFilePaths = res.tempFilePaths
				console.log(tempFilePaths, app.globalData.baseurl)
				wx.showLoading()
				console.log(e)
				const type = e.currentTarget.dataset.type
				wx.uploadFile({
					url: app.globalData.baseurl + '/common/picture', //仅为示例，非真实的接口地址
					filePath: tempFilePaths[0],
					name: 'pic',
					formData: {
						module:"dishes"
					},
					success: (res2) => {
						wx.hideLoading()
						console.log(JSON.parse(res2.data))
						
						if(type==1){
							this.setData({
								'formData.main_pic': JSON.parse(res2.data).datas
							})
						}else{
							this.setData({
								'formData.logo': JSON.parse(res2.data).datas
							})
						}
						
						
					}
				})
			}
		})
	},
	
	formSubmit(e){
		console.log(e)
		let json = {
			...this.data.formData,
			...e.detail.value
		}
		app.post({
			url:"/canteen/add",
			data:json,
			method:"POST",
			success:(res)=>{
				wx.showToast({
					title: "保存成功",
					icon: "success"
				})
			}
		})
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
