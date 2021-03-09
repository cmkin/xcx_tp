// pages/index/edit/edit.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
	winHeightTab:0,
	id:null,
	item:{
		dishesName:'',
		categoryId:'',
		dishesPic:''
  },
  name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		console.log(options)
		if(options.id){
			this.setData({
        id:options.id,
        name:options.name
			})
		}else{
			let item = JSON.parse(decodeURIComponent(options.item))
			this.setData({
				item: {
					dishesName:item.dishes_name,
					dishes_id:item.dishes_id,
          dishesPic:item.dishes_thumb,
          category_id:item.category_id
				}
			})
      
      console.log(JSON.parse(decodeURIComponent(options.item)))

    }
	
		
  },
  inputChange(e){
     console.log(e)
     this.setData({
       'item.dishesName':e.detail.value
     })
  },
  delimg(){
	  this.setData({
		  'item.dishesPic':''
	  })
  },
  changeImg(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success :(res)=> {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths,app.globalData.baseurl)
        wx.showLoading()
        wx.uploadFile({
          url:app.globalData.baseurl+'menu/pic', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'dishesPic',
          formData: {
           
          },
          success: (res2)=>{
            wx.hideLoading()
            console.log(JSON.parse(res2.data) )
            this.setData({
              'item.dishesPic':JSON.parse(res2.data).datas.imgUrl
            })
          }
        })
      }
    })
  },
  saveEdit(){
    app.post({
      url:"menu/edit",
      method:'POST',
      data:{
        dishesName:this.data.item.dishesName,
        categoryId:this.data.item.category_id,
        id:this.data.item.dishes_id,
        dishesThumb:this.data.item.dishesPic
      },
      error:'菜品名称不能重复',
      success(res){
        console.log(res)
        wx.showToast({
          title: '编辑成功',
          icon:"success"
        })
       
        setTimeout(() => {
          wx.navigateBack({
            delta: 2,
          })
        }, 1000);
       
      }
    })
  },
  addcai(){
    app.post({
      url:'menu/add',
      data:{
        dishesName:this.data.item.dishesName,
        categoryId:this.data.id,
        dishesThumb:this.data.item.dishesPic
      },
      method:"POST",
      error:'菜品名称不能重复',
      success(res){
        console.log(res)
        wx.showToast({
          title: '添加成功',
          icon:"success"
        })
       
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })
        }, 1000);
       
      }
    })
  },
  back(){
	  wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady(){
  	  this.setData({
  	    winHeightTab: app.globalData.winHeightTab
  	  })
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