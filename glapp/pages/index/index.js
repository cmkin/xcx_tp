// index.js
// 获取应用实例
const app = getApp()

Page({
	data: {
		winHeightTab: 0,
		meunList: [],
		meunActive: null,
		caiList: [],
		isdel: false,
		caiListLength: 0
	},
	// addCai
	bindViewTap() {
		wx.navigateTo({
			url: '../logs/logs'
		})
	},
	onReady() {
		this.setData({
			winHeightTab: app.globalData.winHeightTab
		})
	},
	onLoad() {
		app.post({
			url: "category/list",
			data: {},
			method: "GET",
			success: (res) => {
				this.setData({
					meunList: res.datas,
					meunActive: res.datas[0].id
				})
				this.getCai(res.datas[0].id)
			}
		})
	},
	onShow(){
		if(this.data.meunActive){}
			app.post({
				url: "category/list",
				data: {},
				method: "GET",
				success: (res) => {
					this.setData({
						meunList: res.datas
					})
					this.getCai(this.data.meunActive)
				}
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
					item.tag = item.taste_label ? item.taste_label.split(",") : []
					return item
				})
				this.setData({
					caiList: res.datas
				})
			}
		})
	},
	changeCai(e) {
		console.log(e)
		let id = e.currentTarget.dataset.id
		this.setData({
			meunActive: id
		})
		this.getCai(id)
	},
	addCai() {
		let name = this.data.meunList.filter(tt=>tt.id == this.data.meunActive)[0].category_name
		wx.navigateTo({
			url: './edit/edit?id=' + this.data.meunActive +"&name="+name
		})
	},
	isdelM() {
		if (this.data.isdel) {
			if (this.data.caiList.filter(item => item.active).length) {

				wx.showModal({
					title: '提示',
					content: '您是否确定删除？',
					success: (res) => {
						if (res.confirm) {
							app.post({
								url: "menu/delPatch",
								data: {
									ids: this.data.caiList.filter(item => item.active).map(item => item.dishes_id).join(",")
								},
								method: "POST",
								success: (res2) => {
									this.getCai(this.data.meunActive)
								}
							})

						} else if (res.cancel) {

						}

						this.setData({
							isdel: false,
							caiList: this.data.caiList.map(item => {
								item.active = false
								return item
							})
						})
						this.getCaiListLength()

					}
				})

			} else {
				this.setData({
					isdel: false
				})
			}


		} else {
			this.setData({
				isdel: true
			})
		}
		this.getCaiListLength()
	},
	changeCaiItem(e) {
		let id = e.currentTarget.dataset.item.dishes_id
		let item = e.currentTarget.dataset.item
		if (this.data.isdel) {
			this.setData({
				caiList: this.data.caiList.map(item => {
					if (item.dishes_id == id) {
						item.active = !item.active
					}
					return item
				})
			})
			this.getCaiListLength()
		}else{
			wx.navigateTo({
				url: './detail/detail?item=' + encodeURIComponent(JSON.stringify(item))
			})
		}
	},
	getCaiListLength() {
		this.setData({
			caiListLength: this.data.caiList.filter(item => item.active).length
		})
	}

})
