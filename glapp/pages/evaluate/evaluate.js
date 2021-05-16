// pages/evaluate/evaluate.js
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		navHeight: 0,
		navTitleTop: 0,
		rateTitle: ['吐槽', '较差', '一般', '满意', '超赞'],
		rateValue: 3,

		formData: {
			input: '',
			category_id: {
				title: '请选择',
				id: ''
			},
			dishes_id: {
				title: '请选择',
				id: ''
			},
			order_by: {
				title: "按时间倒序",
				id: 1
			},
			display:{
				title: '显示中',
				id: 1
			},
			current_id: ''
		},

		meunList: [],
		caiList: [],


		categoryFlag: false,
		categoryType: 0,
		categoryData: [],
		
		plList:[]

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

		app.post({
			url: "category/list",
			data: {},
			method: "GET",
			success: (res) => {
				this.setData({
					meunList: res.datas.map(item => {
						item.active = false
						return item
					}),
					//meunActive: res.datas[0]
				})
				//this.getCai(res.datas[0].id)
				console.log(this.data.meunList)
			}
		})

		this.getList()
		this.setData({
			navHeight: app.globalData.navHeight,
			navTitleTop: app.globalData.navTitleTop
		})
	},

	getCai(id) {
		app.post({
			url: "menu/table",
			data: {
				category_id: id
			},
			method: "GET",
			success: (res) => {
				res.datas = res.datas.map(item => {
					item.active = false
					return item
				})
				this.setData({
					caiList: res.datas
				})
			}
		})
	},

	showcategoryFlag(e) {
		if (e == 5) {
			this.setData({
				categoryFlag: !this.data.categoryFlag,
			})
			return
		}
		let categoryType = Number(e.currentTarget.dataset.type)
		let categoryData = []
		switch (categoryType) {
			case 0:
				categoryData = this.data.meunList.map(item => {
					return {
						title: item.category_name,
						id: item.id
					}
				})
				break;
			case 1:
				if (this.data.caiList.length) {
					categoryData = this.data.caiList.map(item => {
						return {
							title: item.dishes_name,
							id: item.dishes_id
						}
					})
				}
				break;
			case 2:
				categoryData = [{
						title: "按时间倒序",
						id: 1
					},
					{
						title: "按时间升序",
						id: 2
					},
					{
						title: "按评分升序",
						id: 3
					},
					{
						title: "按评分倒序",
						id: 3
					},
				]
				break;
			case 3:
				categoryData=[
					{
						title:"显示中",
						id:1
					},
					{
						title:"隐藏中",
						id:0
					}
				]
				break;
		}
		console.log(categoryData)
		this.setData({
			categoryFlag: !this.data.categoryFlag,
			categoryType,
			categoryData
		})
	},
	changeXz(e) {
		let item = e.currentTarget.dataset.item
		if (this.data.categoryType == 0) {

			this.setData({
				'formData.category_id': item,
				'formData.dishes_id': {
					title: "请选择",
					id: ''
				}
			})
			this.getCai(item.id)

			this.showcategoryFlag(5)

		}
		if (this.data.categoryType == 1) {
			this.setData({
				'formData.dishes_id': item,
			})
			this.showcategoryFlag(5)
		}
		if(this.data.categoryType == 2){
			this.setData({
				'formData.order_by': item,
			})
			this.showcategoryFlag(5)
		}
		if(this.data.categoryType == 3){
			this.setData({
				'formData.display': item,
			})
			this.showcategoryFlag(5)
		}
		
		this.getList()
		console.log(item)
	},
	inputChange(e){
		this.setData({
			'formData.input':e.detail.value
		})
	},
	getList(){
		let json = {
			input:this.data.formData.input,
			category_id:this.data.formData.category_id.id,
			dishes_id:this.data.formData.dishes_id.id,
			order_by:this.data.formData.order_by.id,
			display:this.data.formData.display.id,
			current_id:''
		}
		app.post({
			url:"/comment/filter",
			
			data:json,
			success:(res)=>{
				res.data = res.datas.result.map(item=>{
					//item.show = false
					
					return item
				})
				this.setData({
					plList:res.data
				})
			},
			errorF:()=>{
				this.setData({
					plList:[]
				})
			}
		})
	},
	showHide(e){
		let id = e.currentTarget.dataset.id
		let display = e.currentTarget.dataset.display
		
		
			
		
		app.post({
			url:"/comment/toggle",
			method:"POST",
			data:{
				comment_id:id,
				display:display==1?0:1
			},
			success:()=>{
				let datas = [...this.data.plList]
				this.setData({
					plList:datas.map(item=>{
						if(item.comment_id == id){
							item.display = display==1?0:1
						}
						return item
					})
				})
				
				this.getList()
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
