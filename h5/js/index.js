

var  baseurl = 'http://139.224.247.43/'

axios.defaults.baseURL = baseurl;
//axios.defaults.headers.common['Authorization'] = '';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';







var _this = null
window.appMain={
	init:function(){
		var vm = new Vue({
			el:"#app",
			data:{
				fllist:[],
				flActive:null,
				cailist:[],
				activeCai:[],
				loading:false,
				tx:false,
				text:'投票成功',
				dianping_alert:false,
				dianpingInfos:{},
				tabActive:3,
				rateTitle:['吐槽','较差','一般','满意','超赞'],
				rateValue:3
			},
			mounted() {
				_this = this
				axios.get("category/list").then(function(res){
					console.log(res)
					_this.fllist = res.data.datas
					_this.flActive = _this.fllist[0].id
					_this.changeFl(_this.flActive)
				})
			},
			methods:{
				changeTab:function(index){
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
				},
				showDianping:function(item){
					this.dianpingInfos = item
					this.dianping_alert = true
					
					
					
					
				},
				
				fbpj:function(){
					this.text = "评价成功"
					this.tx = true
					setTimeout(function(){
						_this.tx = false
					},2000)
					this.dianping_alert = false
				},
				changeFl:function(id){
					this.loading = true
					this.flActive = id
					axios.get("menu/table?category_id="+id).then(function(res){
						for(var i in res.data.datas){
							res.data.datas[i].active = false
						}
						_this.cailist = res.data.datas
						_this.loading = false
						
					})
				},
				delChange:function(item){
					this.activeCai.splice(this.activeCai.findIndex(function(tt){
						return item.category_id  == tt.category_id && item.dishes_id == tt.dishes_id
					}),1)
				},
				getACtiveClass:function(item){
					
					return this.activeCai.some(function(tt){
					   return item.category_id  == tt.category_id && item.dishes_id == tt.dishes_id
					}) ? 'active' :'' 
				},
				changeCai:function(item){
					var ishas = this.activeCai.some(function(tt){
					   return item.category_id  == tt.category_id && item.dishes_id == tt.dishes_id
					})
					if(ishas){
						this.activeCai.splice(this.activeCai.findIndex(function(tt){
							return item.category_id  == tt.category_id && item.dishes_id == tt.dishes_id
						}),1)
					}else{
						var arrs = this.activeCai
							arrs.push(item)
						
						this.activeCai = []
						this.activeCai = arrs

						this.$forceUpdate()
					}
					
					
					
					
					
					
					
					
				},
				submit:function(){
					let votes = [
						
					]
					
					var fingerprint = new Fingerprint().get();
					
					
					for(let i in this.activeCai){
						console.log(this.activeCai[i])
						if(votes.some(function(tt){ return tt.category_id == _this.activeCai[i].category_id })){
							votes = votes.map(function(t2){
								if(t2.category_id == _this.activeCai[i].category_id){
									t2.dishes.push(_this.activeCai[i].dishes_id)
								}
								return t2
								
							})
						}else{
							votes.push({
								category_id:this.activeCai[i].category_id,
								dishes:[this.activeCai[i].dishes_id]
							})
						}
					}
				
					this.loading = true
					axios.post("votes/send",JSON.stringify( {
						votes,
						deviceId:fingerprint
					}) ).then(function(res){
						_this.loading = false
						if(res.data.code==200){
							_this.tx = true
							_this.text="投票成功"
							setTimeout(function(){
								_this.tx = false
								
							},2000)
							
						}else{
							_this.tx = true
							_this.text="今天已投票，请明日再来"
							setTimeout(function(){
								_this.tx = false
								
							},2000)
						}
					})
				}
			},
			computed:{
				getCactiveCai:function(){
					return  this.activeCai
				}
			}
		})
	},
	
}