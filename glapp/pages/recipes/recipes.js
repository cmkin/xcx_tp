// pages/recipes/recipes.js
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		date: '2021-03-07',
		date2: '2021-03-07',
		array: ['早餐', '午餐', '晚餐'],
		index: 0,
		titleArr:[],
		
		readList:[],
		recipes_name:'',
		ysnamet:null,
		
		navTitle:"食谱录入",
		pageType:4
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		function dateFormat(fmt, date) {
			let ret;
			const opt = {
				"Y+": date.getFullYear().toString(), // 年
				"m+": (date.getMonth() + 1).toString(), // 月
				"d+": date.getDate().toString(), // 日
				"H+": date.getHours().toString(), // 时
				"M+": date.getMinutes().toString(), // 分
				"S+": date.getSeconds().toString() // 秒
				// 有其他格式化字符需求可以继续添加，必须转化成字符串
			};
			for (let k in opt) {
				ret = new RegExp("(" + k + ")").exec(fmt);
				if (ret) {
					fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1]
						.length, "0")))
				};
			};
			return fmt;
		}
		let date = new Date()
		
		console.log(options)
		
		let titleArr = []
		switch(Number(options.type)){
			case 1:
			case 2:
			case 3:
				titleArr=['菜品']
			break;
			default:
				titleArr=['早餐','午餐','晚餐']
			break;
		}
		
		this.setData({
			date: dateFormat("YYYY-mm-dd", date),
			date2: dateFormat("YYYY-mm-dd", date),
			pageType:Number(options.type) || 4,
			navTitle:options.title,
			titleArr
		})
		this.getData()
	},
	getData(){
		if(this.data.pageType == 4){
			app.post({
				url:"DailyRecipes/getRecipesList",
				data:{
					date:this.data.date,
					source:'back'
				},
				success:(res)=>{
					let datas = res.datas
					let arr = [
						datas.breakfast || [],
						datas.lunch || [],
						datas.dinner || []
					]
					console.log(arr)
					this.setData({
						readList:arr
						//recipes_name:datas.recipes_name
					})
					console.log(res)
				}
				
			})
		}else{
			app.post({
				url:"DishesMode/modeList",
				method:"GET",
				data:{
					mode:this.data.pageType
				},
				success:(res)=>{
					let datas = res.datas
					let arr = [
						{
							dishes:datas.length? datas : null
						}
					]
					console.log(arr)
					this.setData({
						readList:arr
						//recipes_name:datas.recipes_name
					})
					console.log(res)
				}
				
			})
		}
		
	},
	changeTj(e){
		return
			const obj = e.currentTarget.dataset
			
			wx.showLoading()
			app.post({
				url:"DailyRecipes/recommend",
				method:"POST",
				data:{
					dishes_id:obj.id,
					recipe_date:this.data.date,
					recipe_type:obj.index+1,
					//recipes_id:obj.recipes_id,
					//recipes_type:Number(this.data.index) + 1,
					is_recommend : obj.is_recommend == 0? 1 : 0
				},
				success:(res)=>{
					wx.hideLoading()
					
					this.setData({
						readList:this.data.readList.map((item,index)=>{
							if(index == obj.index){
								item.dishes = item.dishes.map((tt)=>{
									if(tt.id == obj.id){
										tt.is_recommend = tt.is_recommend == 0? 1 : 0
									}
									return tt
								})
							}
							
							return item
						})
					})
					
				}
			})
			
			
			
			
			
	},
	submit(){
		//theme 主题 date日期 dishes_id：菜ID   recipes_type (1:早 2：中 3:晚）
		let json = {
			theme:this.data.recipes_name,
			date:this.data.date,
			recipes_type:Number(this.data.index) + 1,
			main_course:JSON.stringify({
				recipes_id:this.data.readList[0].recipes_id,
				dishes_id:this.data.readList[0].dishes.filter(item=>item.is_recommend==1).map(item=>item.id).join(","),
			}),
			side_dish:JSON.stringify({
				recipes_id:this.data.readList[1].recipes_id,
				dishes_id:this.data.readList[1].dishes.filter(item=>item.is_recommend==1).map(item=>item.id).join(","),
			}),
			staple_food:JSON.stringify({
				recipes_id:this.data.readList[2].recipes_id,
				dishes_id:this.data.readList[2].dishes.filter(item=>item.is_recommend==1).map(item=>item.id).join(","),
			}) ,
			salad:JSON.stringify({
				recipes_id:this.data.readList[3].recipes_id,
				dishes_id:this.data.readList[3].dishes.filter(item=>item.is_recommend==1).map(item=>item.id).join(","),
			})
		/* 	side_dish:this.data.readList[1].dishes.map(item=>item.id).join(","),
			staple_food:this.data.readList[2].dishes.map(item=>item.id).join(","),
			salad:this.data.readList[3].dishes.map(item=>item.id).join(","), */
		}
		
		app.post({
			url:"recipes/addRecommend",
			data:json,
			method:"POST",
			success:(res)=>{
				wx.showToast({
					title:"保存成功",
					icon:"success"
				})
			},
			errorF:()=>{
				wx.showToast({
					title:"保存失败",
					icon:"none"
				})
			}
		})
	},
	recipes_nameChange(e){
		clearTimeout(this.data.ysnamet)
		var ysnamet = setTimeout(()=>{
			//调接口
			console.log(1)
			app.post({
				url:"recipes/theme",
				data:{
					date:this.data.date,
					theme:e.detail.value
				},
				method:"POST"
			})
		},500)
		
		
		this.setData({
			recipes_name: e.detail.value,
			ysnamet
		})
		
	},
	bindPickerChange: function(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			index: e.detail.value
		})
		this.getData()
	},
	bindDateChange(e){
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			date: e.detail.value
		})
		this.getData()
	},
	goEdit(e){
		wx.navigateTo({
			url:"./addRec/addRec?title="+e.currentTarget.dataset.title + "&index="+ Number(e.currentTarget.dataset.index) + "&date="+this.data.date + "&recipes_type="+this.data.index + "&pageType=" +this.data.pageType
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
		this.getData()
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
