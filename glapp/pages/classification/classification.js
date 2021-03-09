// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    navHeight:0,
    addFlag:false,
    lists:[],
    keyWord:'',
    type:null,
    name:''
  },

  onReady(){
	  this.setData({
	    navHeight: app.globalData.navHeight,
		
	  })
  },
  onLoad() {
   this.getlist()
  },
  getlist(){
    app.post({
      url:'category/list',
      data:{
        keyWord:this.data.keyWord
      },
      success:(res)=>{
        this.setData({
          lists:res.datas
        })
      }
    })
  },
  edit(e){
    let type = e.currentTarget.dataset.type
     console.log(e)

    this.setData({
      addFlag:true,
      name:type==1?'':'',
      type:type
    })

  },
  cancel(){
    this.setData({
      addFlag:false
    })
  },
  inputChange(e){
    let value  = e.detail.value
      this.setData({
        name:value
      })
  },
  addName(){
    app.post({
      url:'category/add',
      data:{
        name:this.data.name
      },
      method:'POST',
      success:(res)=>{
        wx.showToast({
          title: '添加成功'
        })
        this.getlist()
      }
    })
  }
  
})
