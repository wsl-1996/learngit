var app=getApp();
Page({
  data:{
      id:'id号',
      images:'图片',
      title:'标题',
      array:[
        {
          shopimg:"../../images/ad3.jpg",
          shopitem:"[新平上市啦！]",
          shopprice:"$10.11",
          shoptime:"剩余时间",
          shoptimeout:"1:30:56",
          shoptype:"自营",
          shopcomment:"97%好评"
        } ,
        {
          shopimg: "../../images/sls.jpg",
          shopitem: "[新平上市啦！]",
          shopprice: "$10.11",
          shoptime: "剩余时间",
          shoptimeout: "1:30:56",
          shoptype: "自营",
          shopcomment: "97%好评"
        },
        {
          shopimg: "../../images/ad3.jpg",
          shopitem: "[新平上市啦！]",
          shopprice: "$10.11",
          shoptime: "剩余时间",
          shoptimeout: "1:30:56",
          shoptype: "自营",
          shopcomment: "97%好评"
        },
        {
          shopimg: "../../images/sls.jpg",
          shopitem: "[新平上市啦！]",
          shopprice: "$10.11",
          shoptime: "剩余时间",
          shoptimeout: "1:30:56",
          shoptype: "自营",
          shopcomment: "97%好评"
        }    
      ]
  },
  

onLoad:function(event){
  var that = this


  wx.request({
    url: 'http://172.16.2.90:8080/ketuan/applet/groups/getgroup?page=1&state=1',
    method:'GET',
      header:{
        'Content-Type':'application/json'
      },
      success:function(res1){
        that.setData({
          testshuju: res1.data.data.groups
          })
        console.log(res1.data.data.groups)
      }
  })
  wx.request({
    data: {

    },
    url: 'http://news-at.zhihu.com/api/4/news/latest?',
    method: 'GET',
    header: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      that.setData({
        zhihu: res.data.stories
      })
    }
  })
},
onbindblur:function (event) {
  var that=this;
  that.setData({
    text: event.detail.value
  })
  console.log(event.detail.value)
},
suo:function(event){

},

  tapgoods:function(e){
    
    app.globalData.proid = e.currentTarget.dataset.productid
    console.log(app.globalData.proid+"yes")
    wx.navigateTo({
      url: 'groupgoods/goods',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    wx.request({
      
      url: 'http://172.16.2.90:8080/ketuan/applet/products/getproductinfo?productid=' + app.globalData.proid,
      success:function(res){
        console.log('传参数成功,商品号为：' + app.globalData.proid)
      }
      // data: post_key({ id: gid }),

    })
}

})