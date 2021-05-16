// pages/recipes/addRec/addRec.js
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	
	data: {
		title: "主菜录入",
		navHeight: 0,
		navTitleTop: 0,
		meunList: [],
		meunActive: null,
		caiList:[],
		caiListlenght:0,
		caiListAvtive:[],
		lastJt:false,
		nextJt:true,
		alertFlag:false,
		index:0,
		date:null,
		recipes_type:null
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
				res.datas = res.datas.map(item=>{
					item.caiList = []
					return item
				})
				this.setData({
					meunList: res.datas,
					meunActive: res.datas[0]
				})
				this.getCai(res.datas[0].id)
			}
		})

		this.setData({
			index:options.index,
			date:options.date,
			recipes_type:options.recipes_type,
			pageType:options.pageType,
			title: options.title + '录入',
			navHeight: app.globalData.navHeight,
			navTitleTop: app.globalData.navTitleTop
		})
	},
	
	
	
	getCai(id,callBack=function(){}) {
		if(this.data.meunList.some(item=> item.id == id && item.caiList.length == 0)){
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
						meunList:this.data.meunList.map(item=>{
							if(item.id == id){
								item.caiList = res.datas
							}
							return item
						}),
						caiList: res.datas
					})
					
					callBack (res.datas)
				}
			})
		}else{
			this.setData({
				caiList: this.data.meunList.filter(item.category_id == id)[0].caiList
			})
		}
		
		
	},
	changeCai(e){
	
		const {dishes_id,category_id} = e.currentTarget.dataset
		
		this.setData({
			caiList:this.data.caiList.map(item=>{
				if(item.dishes_id == dishes_id){
					item.active = !item.active
				}
				return item
			}),
			caiListlenght:this.getCaiListlenght().num,
			caiListAvtive:this.getCaiListlenght().arr
		})
		
	},
	getCaiListlenght(){
		let num = 0
		let arr = []
		this.data.meunList.map(item=>{
			item.caiList.length && item.caiList.map(tt=>{
				if(tt.active){
					arr.push(tt)
					num ++
				}
			})
		})
		return {
			num,
			arr
		} 
	},
	delCaiListAvtive(e){
		const {dishes_id,category_id} = e.currentTarget.dataset
		
		this.changeCai(e)
		
	},
	nextMeun(e){
		const {type} = e.currentTarget.dataset
		let  obj = null
		let lastJt = false
		let nextJt = false
			this.data.meunList.forEach((item,index)=>{
				if(item.id==this.data.meunActive.id){	
					obj = type==0? this.data.meunList[index-1] : this.data.meunList[index+1]  
				}
			})
		if(obj){
			if(obj.caiList.length){
				this.setData({
					meunActive:obj,
					caiList:obj.caiList
				})
			}else{
				this.getCai(obj.id,(datas)=>{
					this.setData({
						meunActive:obj,
						caiList:datas
					})
				})
			}
			
		}
		
		this.data.meunList.forEach((item,index)=>{
			if(item.id==this.data.meunActive.id){	
				lastJt = index == 0  ? false : true
				nextJt = index+1 >= this.data.meunList.length ? false : true
			}
		})
		
		this.setData({
			lastJt,
			nextJt
		})
		
	},
	
	
	showAlert(){
		this.setData({
			alertFlag:!this.data.alertFlag
		})
	},
	
	submit(){
		let json = {
			//date:this.data.date,
			recipe_date:this.data.date,
			//item_type:this.data.index,
			recipe_type:Number(this.data.index),
			
		}
		const str = this.data.caiListAvtive.map(item=>item.dishes_id).join(",")
		json.dishes_id = str
		/* switch(Number(this.data.index)){
			case 1:
				
			break;
			case 2:
				json.dishes_id = str
			break;
			case 3:
				json.dishes_id = str
			break;
			case 4:
				json.dishes_id = str
			break;
		} */
		
		if(this.data.pageType == 4){
			app.post({
				url:"/DailyRecipes/addRecipe",
				method:"POST",
				data:json,
				success:()=>{
					wx.showToast({
						title:"添加成功",
						icon:"success"
					})
				}
			})
		}else{
			app.post({
				url:"/DishesMode/addToMode",
				method:"POST",
				data:{
					mode:this.data.pageType,
					dishes_id:json.dishes_id
				},
				success:()=>{
					wx.showToast({
						title:"添加成功",
						icon:"success"
					})
				}
			})
		}
		
		
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
