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
    name:'',
    id:null
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
    let item = e.currentTarget.dataset.item
     console.log(item)

    this.setData({
      addFlag:true,
      name:type==1?'':item.category_name,
      type:type,
      id:type==1?'':item.id
    })

  },
  delFl(e){
    let item = e.currentTarget.dataset.item
    wx.showModal({
      title: '提示',
      content: '是否确认删除?',
      success: (res) =>{
        if (res.confirm) {
          console.log('用户点击确定')

          app.post({
            url:"category/delete",
            data:{
              id:item.id
            },
            method:"post",
            success:(res2)=>{
              setTimeout(()=>{
                wx.showToast({
                  title:"删除成功"
                })
              },500)
               
                this.getlist()
            }
          })


        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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
  serachKey(e){
    let value  = e.detail.value
    this.setData({
      keyWord:value
    })
  },
  addName(){
    app.post({
      url:'category/add',
      data:{
        name:this.data.name
      },
      success:(res)=>{
        setTimeout(()=>{
          wx.showToast({
            title: '添加成功'
          })
        },500)
        
        this.setData({
          addFlag:false
        })
        this.getlist()
      }
    })
  },
  saveName(){
    app.post({
      url:'category/edit',
      data:{
        name:this.data.name,
        id:this.data.id
      },
      success:(res)=>{
        setTimeout(()=>{
          wx.showToast({
            title: '修改成功'
          })
        },500)
        
        this.setData({
          addFlag:false
        })
        this.getlist()
      }
    })
  }
  
})
