// pages/cook/cook.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
	addFlag:false,
	formData:{
		cook_img:'',
		cook_name:"",
		info:""
	},
	list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	this.getList()
  },
  delItem(e){
	  console.log(e)
	  wx.showModal({
	    title: '提示',
	    content: '是否确认删除？',
	    success: (res) =>{
	      if (res.confirm) {
			app.post({
				url:"/cook/delete",
				method:"POST",
				data:{
					cook_id:e.currentTarget.dataset.id
				},
				success:(res)=>{
					wx.showToast({
						title:"删除成功",
						icon:"success"
					})
					this.getList()
				}
			})
	      } else if (res.cancel) {
	        
	      }
	    }
	  })
  },
  addItem(){
	  this.setData({
		  formData:{
		  	cook_img:'',
		  	cook_name:"",
		  	info:""
		  }
	  })
	  this.changeFlag()
  },
  getList(){
	  app.post({
	  	url:"/cook/get",
	  	success:(res)=>{
			console.log(res)
			this.setData({
				list:res.datas.result
			})
	  	},
		errorF:()=>{
			this.setData({
				list:[]
			})
		}
	  })
  },
  changeFlag(){
	  this.setData({
		  addFlag:!this.data.addFlag
	  })
  },
  
  changeImg() {
  	wx.chooseImage({
  		count: 1,
  		sizeType: ['original', 'compressed'],
  		sourceType: ['album', 'camera'],
  		success: (res) => {
  			// tempFilePath可以作为img标签的src属性显示图片
  			const tempFilePaths = res.tempFilePaths
  			console.log(tempFilePaths, app.globalData.baseurl)
  			wx.showLoading()
  			
  			wx.uploadFile({
  				url: app.globalData.baseurl + '/common/picture', //仅为示例，非真实的接口地址
  				filePath: tempFilePaths[0],
  				name: 'pic',
  				formData: {
  					module:"cook"
  				},
  				success: (res2) => {
  					wx.hideLoading()
  					console.log(JSON.parse(res2.data))
  						this.setData({
  							'formData.cook_img': JSON.parse(res2.data).datas
  						})	
  				}
  			})
  		}
  	})
  },
  delimg(){
	  this.setData({
	  	'formData.cook_img': ''
	  })	
  },
	formSubmit(e){
		console.log(e)
		let json = {
			...this.data.formData,
			...e.detail.value
		}
		app.post({
			url:this.data.formData.id?"/cook/edit": "/cook/add",
			data:json,
			method:"POST",
			success:(res)=>{
				wx.showToast({
					title: "添加成功",
					icon: "success"
				})
				this.changeFlag()
				this.getList()
			}
		})
	},
  
  editItem(e){
	  this.setData({
		  formData:{
			  cook_img:e.currentTarget.dataset.item.imgurl,
			  ...e.currentTarget.dataset.item
		  }
	  })
	  
	  this.changeFlag()
  },
  
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})