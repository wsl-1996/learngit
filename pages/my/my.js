var app = getApp()
var util=require('../../utils/util.js')
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    iconimg: [
      "../../images/icon/pay.svg",
      "../../images/icon/getgoods.svg",
      "../../images/icon/onroad.svg",
      "../../images/icon/comment.svg",
    ],
    is_hidden:false
  },
  onLoad: function() {
    
  },
  showaddress:function(){
    var that = this
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/sendaddress/getdefaultaddress?sessionid=' + wx.getStorageSync('sessionid'),
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          defaultaddress: res.data.data
        })

      }
    })
  },

  showusergrade:function(){
    var that = this
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/users/getusergrade?sessionid=' + app.globalData.g_sessionid,
      success: function (res) {

        that.setData({
          userGrade: res.data.data.userGrade

        })
        console.log('用户等级：',res.data)
      }
    })
  },

  showcashback:function(){
    var that = this
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/bills/getcashback?sessionid=' + app.globalData.g_sessionid,
      success: function (res) {

        that.setData({
          cashback: res.data.data.cashback

        })
      }
    })
  },
  
  // bindGetuserinfo: function(e) {
  //   var that = this
  //   console.log(e.detail)
  //   wx.login({
  //     success: function(res1) {
  //       if (res1.code) {
  //         wx.request({
  //           url: app.globalData.g_ip + '/ketuan/applet/users/login',
  //           data: {
  //             code: res1.code,
  //             rawData: e.detail.rawData,
  //             encryptedData: e.detail.encryptedData,
  //             iv: e.detail.iv,
  //             signature: e.detail.signature,
  //             userInfo: e.detail.userInfo
  //           },
  //           success: function(res) {
  //             app.globalData.g_sessionid = res.data.data.sessionId
  //             app.globalData.g_userid = res.data.data.userId

  //             console.log('this is sessionid:')
  //             console.log(app.globalData.g_sessionid)
  //             console.log('this is userid')
  //             console.log(app.globalData.g_userid)
  //             wx.showToast({
  //               title: '登陆成功',
  //               icon:'success'
  //             })
  //             that.setData({
  //               is_hidden:true
  //             })
  //             that.listenmsg()
  //             wx.onSocketClose(function (res) {
  //               console.log('++++++++++++WebSocket 已关闭！++++++++++++')
  //               that.listenmsg()
  //             })
  //           }

  //         })
  //       }
  //     }
  //   })
  // },
  addressmanage: function() {
    wx.navigateTo({
      url: 'myaddress/myaddress',
    })
  },
  getinmyorder: function() {
    wx.navigateTo({
      url: 'myorder/myorder?currentyp=0',
    })
  },

  gotoback: function() {
    wx.navigateTo({
      url: 'myorder/backgoods/backgoods',
    })
  },

  gotopay: function() {
    wx.navigateTo({
      url: 'myorder/myorder?currentyp=1',
    })
  },

  gotoDeliver: function() {
    wx.navigateTo({
      url: 'myorder/myorder?currentyp=2',
    })
  },

  gotoCollect: function() {
    wx.navigateTo({
      url: 'myorder/myorder?currentyp=3',
    })
  },

  gotocomment: function() {
    wx.navigateTo({
      url: 'myorder/myorder?currentyp=4',
    })
  },
  gotobackmore: function() {
    wx.navigateTo({
      url: 'myback/backmore/backmore',
    })
  },
  gotorecmore: function() {
    wx.navigateTo({
      url: 'myback/recmore/recmore',
    })
  },
  accountmanger: function() {
    wx.navigateTo({
      url: 'myaccount/myaccount',
    })
  },
  listenmsg:function(){
    var that = this
    var msg = "{ messageFrom:" + "'" + app.globalData.g_userid + "'" + ",messageContent:'connect',contentType: '-1'}"
    wx.connectSocket({
      url: app.globalData.g_socket + '/ketuan/websocket'
    })
    wx.onSocketOpen(function (res) {
      sendSocketMessage(msg)
      console.log("+++++++++++++开始监听+++++++++++++")
    })

    function sendSocketMessage(msg) {
      wx.sendSocketMessage({
        data: msg,
      })
    }

    wx.onSocketMessage(function (res) {
      
      console.log(res)
      // res.data.replace("{\"", "{'");
      // res.data.replace("\":", "':");
      // res.data.replace(",\"", ",'");
      console.log('this is res.data')
      console.log(res.data)
      var tempres = JSON.parse(res.data)
      console.log('this is tempres')
      console.log(tempres)
      console.log(tempres.messageContent)
      app.globalData.g_tempmsgfrom = tempres.messageContent
      var temp = {
        is_show_right: 0,
        messageContent: tempres.messageContent,
        messageFrom: tempres.messageFrom,
        messageto: app.globalData.userid,
        toView: util.RndNum(),
        contentType: parseInt(tempres.contentType),
        createtime: util.formatTime(new Date()),
        headOwner: tempres.headOwner,
      }
      var tampstorage = wx.getStorageSync('centendata' + tempres.messageFrom) //从缓存中把对应ID的数组取出来
      if (tampstorage == '') {
        tampstorage = []
      }
      tampstorage.push(temp)
      wx.setStorageSync('centendata' + tempres.messageFrom, tampstorage) //接收的消息存入缓存
      app.globalData.g_msgfromid = tempres.messageFrom,

      console.log('+++++++++++++++您有新的消息了+++++++++++++++')
     
    })
  },
  clearstorage:function(){
    wx.showModal({
      title: '是否要清除缓存',
      content: '',
      success:function(res){
        if(res.confirm){
          try {
            wx.clearStorageSync()
          } catch (e) {
            console.log('清除失败')
          }
        }
      }
    })
  },
  tobevip:function(){
    wx.navigateTo({
      url: 'tobevip/tobevip',
    })
  },
  onShow:function(){
    this.showaddress()
    this.showcashback()
    this.showusergrade()
  }
})