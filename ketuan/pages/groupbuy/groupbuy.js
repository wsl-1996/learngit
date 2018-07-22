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
    url: 'http://news-at.zhihu.com/api/4/news/latest',
    method:'GET',
    header: {
      'Content-Type': 'application/json' 
    },
    success: function (res) {
      that.setData({
        zhihu:res.data.stories
      })
      console.log(res.data)
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

tapgoods:function(){
  wx:wx.navigateTo({
    url: 'groupgoods/goods',
    success: function(res) {},
    fail: function(res) {},
    complete: function(res) {},
  })
}

})