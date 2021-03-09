

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
				loading:false
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
					axios.post()
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