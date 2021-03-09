// pages/statistics/statistics.js
const app =getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		date: '2021-03-07',
		date2: '2021-03-07',
		lists:[]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

		function dateFormat(fmt, date) {
			let ret;
			const opt = {
					"Y+": date.getFullYear().toString(),        // 年
					"m+": (date.getMonth() + 1).toString(),     // 月
					"d+": date.getDate().toString(),            // 日
					"H+": date.getHours().toString(),           // 时
					"M+": date.getMinutes().toString(),         // 分
					"S+": date.getSeconds().toString()          // 秒
					// 有其他格式化字符需求可以继续添加，必须转化成字符串
			};
			for (let k in opt) {
					ret = new RegExp("(" + k + ")").exec(fmt);
					if (ret) {
							fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
					};
			};
			return fmt;
	}

		let date = new Date()
			this.setData({
				date:dateFormat("YYYY-mm-dd", date),
				date2:dateFormat("YYYY-mm-dd", date)
			})
		this.getlist()
	},
	getlist(){
		app.post({
			url:"votes/stat",
			data:{
				startDate:this.data.date,
				endDate:this.data.date2
			},
			success:(res)=>{
				let allNums = 0
					for(let i in res.datas){
						allNums+=Number(res.datas[i].hit) 
					}
					for(let i in res.datas){
						res.datas[i].pro =Number(res.datas[i].hit)  / allNums * 100 +'%'
					}
					console.log(allNums)

				this.setData({
					lists:res.datas
				})
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
