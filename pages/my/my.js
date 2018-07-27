var app = getApp()
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    iconimg: [
      "../../images/icon/pay.png",
      "../../images/icon/getgoods.png",
      "../../images/icon/onroad.png",
      "../../images/icon/comment.png",
      "../../images/icon/getback.png",
    ]
  },
  onLoad: function() {
  var that=this
  wx.login({
    success:function(res){
      if(res.code){
        wx.request({
          url: 'url',
          data:{
            code:res.code
          }
        })
        console.log('登录ok,this is code: ' + res.code)
      }
      else{
        console.log('登录失败'+res.errMsg)
      }
    }
  })
  wx.request({
    url: 'http://localhost:8080/ketuan/applet/users/getdefaultaddress?userid=01',
    method: 'GET',
    header: {
      'Content-Type': 'application/json'
    },
    success:function(res){
      that.setData({
        defaultaddress: res.data.data
      })
      console.log(that.data.defaultaddress)

    }
  })
  wx.request({
    url: 'http://172.16.2.33:8080/ketuan/applet/bills/getcashback?userid=01',
    success:function(res){
      console.log(res.data.data.cashback)
    
      that.setData({
        cashback:res.data.data.cashback

      })
    }
  })
    wx.request({
      url: 'http://172.16.2.33:8080/ketuan/applet/users/getusergrade?userid=02',
      success: function (res) {
        console.log(res.data.data.userGrade)

        that.setData({
          userGrade: res.data.data.userGrade

        })
      }
    })

    // wx.request({       //获取用户头像
    //   url: 'http://172.16.2.33:8080/ketuan/applet/users/getchildren?userid=01',
    //   success: function (res) {
    //     console.log(res.data.data.childrenInfo)//[0].headImg)

    //     that.setData({
    //       childrenInfo: res.data.data.childrenInfo

    //     })
    //   }
    // })

  },
  addressmanage: function () {
    wx.navigateTo({
      url: 'myaddress/myaddress',
    })
  },
  getinmyorder:function(){
    wx.navigateTo({
      url: 'myorder/myorder?currentyp=0',
    })
  },

  gotoback:function(){
    wx.navigateTo({
      url: 'myorder/backgoods/backgoods',
    })
  },

  gotopay:function() {
    wx.navigateTo({
      url: 'myorder/myorder?currentyp=1',
    })
  },

  gotoDeliver: function () {
    wx.navigateTo({
      url: 'myorder/myorder?currentyp=2',
    })
  },

  gotoCollect: function () {
    wx.navigateTo({
      url: 'myorder/myorder?currentyp=3',
    })
  },

  gotocomment: function() {
    wx.navigateTo({
      url: 'myorder/myorder?currentyp=4',
    })
  },
  gotobackmore: function () {
    wx.navigateTo({
      url: 'myback/backmore/backmore',
    })
  },
  gotorecmore: function () {
    wx.navigateTo({
      url: 'myback/recmore/recmore',
    })
  },
})