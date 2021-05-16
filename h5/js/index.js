var baseurl = 'http://139.224.247.43/'

axios.defaults.baseURL = baseurl;
//axios.defaults.headers.common['Authorization'] = '';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';







var _this = null
window.appMain = {
	init: function() {
		var vm = new Vue({
			el: "#app",
			data: {
				fllist: [],
				flActive: null,
				cailist: [],
				activeCai: [],
				loading: false,
				tx: false,
				text: '投票成功',
				dianping_alert: false,
				dianpingInfos: {},
				tabActive: 1,
				rateTitle: ['吐槽', '较差', '一般', '满意', '超赞'],
				rateValue: 5,
				pltextarea: '',

				dcActive: false,
				dcList: [{
						title: "明天想吃",
						img: "img/11.png"
					},
					{
						title: "下周想吃",
						img: "img/13.png"
					},
					{
						title: "外场想吃",
						img: "img/12.png"
					},
				],

				cook: [],
				cushiAlert: false,
				cushiItem: {},

				canteen: {},

				datetimeShow: false,
				minDate: new Date(2020, 0, 1),
				maxDate: new Date(2025, 10, 1),
				currentDate: new Date(),

				xcShow: false,
				xcList: ['明天想吃', '下周想吃', '外场想吃'],
				xcIndex: 0,
				csShow: false,
				csIndex: 1,
				columns: [{
						title: "早餐",
						id: 1
					},
					{
						title: "中餐",
						id: 2
					},
					{
						title: "晚餐",
						id: 3
					}
				],
				readList: [],
				recipes_name: '',

				pjList: [],



				//5-16 新增

				zspList: [{
						title: "周一",
						id: 1
					},
					{
						title: "周二",
						id: 2
					},
					{
						title: "周三",
						id: 3
					},
					{
						title: "周四",
						id: 4
					},
					{
						title: "周五",
						id: 5
					},
					{
						title: "周六",
						id: 6
					},
					{
						title: "周日",
						id: 7
					},
				],
				zspActive: 0,
				zspListCai: [],
				
				pagesIndex:1,
				
				
				
				
				biaotiActive:0,
				
				//菜肴库点餐
				
				cykList:[],
				cykActive:0,
				sc_showmo:false,
				
				//周士普点餐
				
				zspListTwo: [{
						title: "周一",
						id: 1
					},
					{
						title: "周二",
						id: 2
					},
					{
						title: "周三",
						id: 3
					},
					{
						title: "周四",
						id: 4
					},
					{
						title: "周五",
						id: 5
					},
					{
						title: "周六",
						id: 6
					},
					{
						title: "周日",
						id: 7
					},
				],
				zspActiveTwo: 0,
				zspListCaiTwo: [],
				
				
				//历史食谱
				
				lishiList:[],
				
				CaiActiveItem:[]
				
				
				
			},
			watch:{
				currentDate:function(){
					this.getliList()
				}
			},
			mounted() {
				_this = this
				this.getDatas()
				this.getCyk()
				this.getliList()
			},
			filters: {
				dateFormat: function(date) {
					let ret;
					let fmt = "YYYY-mm-dd"
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
							fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k]
								.padStart(ret[1]
									.length, "0")))
						};
					};
					return fmt;
				}
			},
			methods: {
				
				delshowMore:function(item){
					console.log(item)
					var hasindex = this.CaiActiveItem.findIndex(function(tt){
						return item.dishes_category == tt.dishes_category
					})
					this.CaiActiveItem[hasindex].dishes.splice(this.CaiActiveItem[hasindex].dishes.findIndex(function(tt){
						return tt.id == item.id
					}),1)
				},
				
				changeCaiActiveItem:function(item){
					console.log(item)
					var has = this.CaiActiveItem.some(function(tt){ return tt.dishes_category == item.dishes_category })
						if(has){
							var hasIndex = this.CaiActiveItem.findIndex(function(tt){ return tt.dishes_category == item.dishes_category })
							var hasdas = this.CaiActiveItem[hasIndex].dishes.some(function(tt){ return tt.id == item.id })
								if(hasdas){
									var ttindex = this.CaiActiveItem[hasIndex].dishes.findIndex(function(tt){ return tt.id == item.id })
									this.CaiActiveItem[hasIndex].dishes.splice(ttindex,1)
								}else{
									this.CaiActiveItem[hasIndex].dishes.push(item)
								}
						}else{
							this.CaiActiveItem.push({
								dishes_category:item.dishes_category,
								dishes:[item]
							})
						}				
				},
				getCyk:function(){
					axios.get("DishesMode/modeList?mode="+this.pagesIndex).then(function(res) {
						console.log(res)
						var datas = res.data.datas
							
							var arr = []
							for(var i in datas){
								var has = arr.some(function(item){return item.dishes_category == datas[i].dishes_category })
									if(has){
									  var index = arr.findIndex(function(item){return item.dishes_category == datas[i].dishes_category})
										arr[index].dishes.push(datas[i])
									}else{
										arr.push({
											dishes_category:datas[i].dishes_category,
											dishes:[datas[i]],
											category_name:datas[i].category_name
										})
									}
							}
						
						_this.cykList = arr
						_this.cykActive = _this.cykList[0].dishes_category || 0
						console.log(_this.cykList)
					})
				},
				
				getliList:function(){
					axios.get("DailyRecipes/getRecipesList?date="+ this.dateFormat(this.currentDate)  + "&source=h5").then(function(res) {
						console.log(res)
						
						var datas = res.data.datas
						var arr = [
							datas.breakfast || [],
							datas.lunch || [],
							datas.dinner || []
						]
						
						var arr2 = []
						
						arr.map(function(item){
							item.dishes && item.dishes.map(function(tt){
								//tt.tag = 
								arr2.push(tt)
							})
						})
						_this.lishiList = arr2
						return 
						
					})
				},
				last:function(){
					if(this.biaotiActive==0){
						this.biaotiActive = 2
					}else{
						this.biaotiActive --
					}
					
				},
				next:function(){
					if(this.biaotiActive==2){
						this.biaotiActive = 0
					}else{
						this.biaotiActive ++
					}
				},
				getACtiveClass: function(item) {
				
					return this.CaiActiveItem.some(function(tt) {
						return item.category_id == tt.category_id && tt.dishes.some(function(ii){return ii.id == item.id }) 
					}) ? 'active' : ''
				},
				
				
				changePages:function(index){
					this.dcActive = !this.dcActive
					this.pagesIndex = index+1
					this.biaotiActive = 0
					this.CaiActiveItem = []
					this.getCyk()
				},
				
				xcOk: function(index) {
					console.log(index)
					this.xcIndex = index
					this.xcShow = false
				},
				dateFormat: function(date) {
					let ret;
					let fmt = "YYYY-mm-dd"
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
							fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k]
								.padStart(ret[1]
									.length, "0")))
						};
					};
					return fmt;
				},
				getDatas: function() {

					axios.get("category/list").then(function(res) {
						console.log(res)
						_this.fllist = res.data.datas
						_this.flActive = _this.fllist[0].id
						_this.changeFl(_this.flActive)
					})

					axios.get("cook/get").then(function(res) {
						_this.cook = res.data.datas.result
					})

					axios.get("comment/filter?source=h5").then(function(res) {
						_this.pjList = res.data.datas.result
					})

					axios.get("canteen/get").then(function(res) {
						_this.canteen = res.data.datas

						setTimeout(function() {
							//跑马灯初始化
							$(function() {
								$('.jq22').liMarquee();
							});
						}, 500)

					})

					this.getReadList()

					this.changeFlZsp(1)
				},
				getReadList: function() {
					axios.get("recipes/read?date=" + this.dateFormat(this.currentDate) +
						"&recipes_type=" + this.csIndex).then(function(res) {
						var datas = res.data.datas
						var arr = [
							datas.main_course || [],
							datas.side_dish || [],
							datas.staple_food || [],
							datas.salad || []
						]


						arr = arr.map(function(item) {
							if (item.hasOwnProperty("dishes")) {
								item.dishes = item.dishes.map(function(tt) {
									tt.active = false
									tt.tag = tt.taste_label && tt
										.taste_label.split(",") || []
									return tt
								})
							}

							return item
						})
						console.log(arr)
						_this.readList = arr
						_this.recipes_name = datas.recipes_name
						setTimeout(function() {
							//点餐滑动
							var mySwiper = new Swiper('.swiper-container', {
								//direction: 'vertical', // 垂直切换选项
								//loop: true, // 循环模式选项
								slidesPerView: 'auto'
							})
						}, 500)

					})
				},
				chushiChange: function(item) {
					this.cushiAlert = true
					this.cushiItem = item
				},
				datetimeOk: function(value) {
					console.log(value)
				},
				csOk: function(item) {
					console.log(item)
					this.csIndex = item.id
					this.csShow = false
					this.getReadList()
				},
				timeOk: function() {
					this.datetimeShow = false
					this.getReadList()
				},
				changeTab: function(index) {
					console.log(index)
					/* if(index>=2){
						this.text = "敬请期待!"
						this.tx = true
						setTimeout(function(){
							_this.tx = false
						},2000)
						return
					} */
					this.tabActive = index
					this.dcActive = false
				},
				showDianping: function(item) {
					console.log(item)
					let obj = {
						...item
					}
					if (obj.hasOwnProperty("id")) {
						obj.category_id = obj.dishes_category
						obj.dishes_id = obj.id
						obj.tag = obj.taste_label.map(tt => {
								return {
									value: tt,
									active: false
								}
							})
					}
					obj.tag = obj.tag.map(tt => {
						tt.active = false
						return tt
					})
					this.dianpingInfos = obj
					this.pltextarea = ''
					this.rateValue = 5

					this.dianping_alert = true

					console.log(this.dianpingInfos)


				},

				fbpj: function() {
					/* if(!this.pltextarea){
						_this.text = "请输入评价内容"
						_this.tx = true
						setTimeout(function() {
							_this.tx = false
						}, 2000)
						return
					} */
					axios.post("comment/publish", Qs.stringify({
						dishes_id: this.dianpingInfos.dishes_id,
						dishes_name: this.dianpingInfos.dishes_name,
						category_id: this.dianpingInfos.category_id,
						star: this.rateValue,
						tag: this.dianpingInfos.tag.filter(item => item.active).map(
							item =>
							item.value).join(","),
						content: this.pltextarea
					})).then(function() {
						_this.text = "评价成功"
						_this.tx = true
						setTimeout(function() {
							_this.tx = false
						}, 2000)
						_this.dianping_alert = false
					})

				},
				changeFl: function(id) {
					this.loading = true
					this.flActive = id
					axios.get("menu/table?category_id=" + id).then(function(res) {
						for (var i in res.data.datas) {
							res.data.datas[i].active = false
							res.data.datas[i].tag = res.data.datas[i].comment_label ? res
								.data.datas[i].taste_label.split(",").map((item,
									index) => {
									return {
										active: false,
										value: item
									}
								}) : []
						}
						_this.cailist = res.data.datas
						_this.loading = false

					})
				},
				changeFlZsp: function(id) {
					this.loading = true
					this.zspActive = id
					axios.get("DailyRecipes/weeklyRecipes?dayOfWeek=" + id).then(function(res) {
						_this.zspListCai = [
							res.data.datas.breakfast || {
								dishes: []
							},
							res.data.datas.lunch || {
								dishes: []
							},
							res.data.datas.dinner || {
								dishes: []
							}
						].map((item, index) => {
							if(item.taste_label && item.taste_label.length){
								item.taste_label = item.taste_label.map((tt,
									ti) => {
									return {
										active: false,
										value: tt
									}
								})
							}else{
								item.taste_label = []
							}
							
							
							return  item

						})
						_this.loading = false
						console.log(_this.zspListCai)
						return
						for (var i in res.data.datas) {
							res.data.datas[i].active = false
							res.data.datas[i].tag = res.data.datas[i].comment_label ? res
								.data.datas[i].taste_label.split(",").map((item,
									index) => {
									return {
										active: false,
										value: item
									}
								}) : []
						}
						_this.cailist = res.data.datas
						_this.loading = false

					})
				},
				delChange: function(item) {
					item.active = false
				},
				delChange2: function(item) {
					console.log(item)
					this.changeCai(item)
				},
				
				changeCai: function(item) {
					
					
					
					
					return
					
					
					console.log(item)
					item.dishes_id = item.id
					var ishas = this.activeCai.some(function(tt) {
						return item.category_id == tt.category_id && item.dishes_id == tt
							.dishes_id
					})
					if (ishas) {
						this.activeCai.splice(this.activeCai.findIndex(function(tt) {
							return item.category_id == tt.category_id && item
								.dishes_id == tt.dishes_id
						}), 1)
					} else {
						var arrs = this.activeCai
						arrs.push(item)

						this.activeCai = []
						this.activeCai = arrs

						this.$forceUpdate()
					}








				},
				submit: function() {

					var fingerprint = new Fingerprint().get();

					console.log(this.getIsActive)

					var votes = []
					
					
					votes = this.CaiActiveItem.map(function(item){
						return {
							category_id: item.dishes_category,
							dishes: item.dishes.map(function(tt){
								return tt.id
							})
						}
					})
					
					/* this.getIsActive.forEach(function(item, index) {

						var has = votes.some(function(tt) {
							return tt.category_id == item.dishes_category
						})
						if (has) {
							//有id
							var ti = votes.findIndex(function(t2) {
								return t2.category_id == item.dishes_category
							})
							votes[ti].dishes.push(item.id)
						} else {
							//无id
							votes.push({
								category_id: item.dishes_category,
								dishes: [item.id]
							})
						}
					}) */



					/* for (let i in this.activeCai) {
						
						if (votes.some(function(tt) {
								return tt.category_id == _this.activeCai[i].category_id
							})) {
							votes = votes.map(function(t2) {
								if (t2.category_id == _this.activeCai[i].category_id) {
									t2.dishes.push(_this.activeCai[i].dishes_id)
								}
								return t2

							})
						} else {
							votes.push({
								category_id: this.activeCai[i].category_id,
								dishes: [this.activeCai[i].dishes_id]
							})
						}
					} */

					this.loading = true
					//Qs.stringify()
					axios.post("votes/send", {
						votes, //:JSON.stringify(votes),
						deviceId: fingerprint
					}).then(function(res) {
						_this.loading = false
						if (res.data.code == 200) {
							_this.tx = true
							_this.text = "投票成功"
							setTimeout(function() {
								_this.tx = false

							}, 2000)

						} else {
							_this.tx = true
							_this.text = "今天已投票，请明日再来"
							setTimeout(function() {
								_this.tx = false

							}, 2000)
						}
					})
				},
				submit2: function() {
					var fingerprint = new Fingerprint().get();
					var votes = []

					for (let i in this.activeCai) {

						if (votes.some(function(tt) {
								return tt.category_id == _this.activeCai[i].category_id
							})) {
							votes = votes.map(function(t2) {
								if (t2.category_id == _this.activeCai[i].category_id) {
									t2.dishes.push(_this.activeCai[i].dishes_id)
								}
								return t2

							})
						} else {
							votes.push({
								category_id: this.activeCai[i].category_id,
								dishes: [this.activeCai[i].dishes_id]
							})
						}
					}


					this.loading = true
					//Qs.stringify()
					axios.post("votes/send", {
						votes, //:JSON.stringify(votes),
						deviceId: fingerprint
					}).then(function(res) {
						_this.loading = false
						if (res.data.code == 200) {
							_this.tx = true
							_this.text = "投票成功"
							setTimeout(function() {
								_this.tx = false

							}, 2000)

						} else {
							_this.tx = true
							_this.text = "今天已投票，请明日再来"
							setTimeout(function() {
								_this.tx = false

							}, 2000)
						}
					})


				},
			},
			computed: {
				getCaiyaoActive:function(){
					
					var obj = this.cykList.filter(function(item){
						return item.dishes_category == _this.cykActive
					})
					return obj.length && obj[0]
				},
				getCaiShows:function(){
					var arr2 = []
					
					this.CaiActiveItem.map(function(item){
						item.dishes && item.dishes.map(function(tt){
							//tt.tag = 
							arr2.push(tt)
						})
					})
					
					return arr2
				},
				
				getCactiveCai: function() {
					return this.activeCai
				},
				getIsActive: function() {
					var arr = this.readList.map(function(item) {
						if (item.hasOwnProperty("dishes")) {
							return item.dishes.filter(function(tt) {
								return tt.active
							})
						}

						return item
					})
					var arr2 = []
					arr.forEach(function(item) {
						if (item.length) {
							item.forEach(function(tt) {
								arr2.push(tt)
							})
						}

					})
					return arr2
				}
			}
		})
	},

}
