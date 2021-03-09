

var  baseurl = 'http://23.91.96.119/'

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
				text:'投票成功'
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
				delChange(item){
					this.activeCai.splice(this.activeCai.findIndex(function(tt){
						return item.category_id  == tt.category_id && item.dishes_id == tt.dishes_id
					}),1)
				},
				getACtiveClass(item){
					
					return this.activeCai.some(function(tt){
					   return item.category_id  == tt.category_id && item.dishes_id == tt.dishes_id
					}) ? 'active' :'' 
				},
				changeCai(item){
					var ishas = this.activeCai.some(function(tt){
					   return item.category_id  == tt.category_id && item.dishes_id == tt.dishes_id
					})
					if(ishas){
						this.activeCai.splice(this.activeCai.findIndex(function(tt){
							return item.category_id  == tt.category_id && item.dishes_id == tt.dishes_id
						}),1)
					}else{
						this.activeCai.push(item)
					}
					
					
				},
				submit(){
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
				getTitles:function(){
				 var titles = []
					for(var i in this.cailist){
						if(_this.cailist[i].active){
							titles.push(_this.cailist[i])
						}
					}
				  return titles
				}
			}
		})
	},
	
}