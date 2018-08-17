//app.js
var app = getApp()
App({
  onLaunch: function() {
    console.log('onlaunch test')
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    var that = this
    // wx.login({
    //   success: function (res1) {
    //     if (res1.code) {

    //       // that.setData({
    //       //   code: res.code
    //       // })

    //       wx.getUserInfo({
    //         success: function (res) {
    //           console.log("this is getuserinfores")
    //           console.log(res)
    //           // that.setData({
    //           //   rawData: res.rawData,
    //           //   encryptedData: res.encryptedData,
    //           //   iv: res.iv,
    //           //   signature: res.signature,
    //           //   userInfo: res.userInfo
    //           // })
    //           wx.request({
    //             url: that.globalData.g_ip+'/ketuan/applet/users/login',
    //             data: {
    //               code: res1.code,
    //               rawData: res.rawData,
    //               encryptedData: res.encryptedData,
    //               iv: res.iv,
    //               signature: res.signature,
    //               userInfo: res.userInfo
    //             },
    //             success: function (res) {
    //               that.globalData.g_sessionid = res.data.data.sessionId
    //               that.globalData.g_userid=res.data.data.userId

    //               console.log('this is sessionid:')
    //               console.log(that.globalData.g_sessionid)
    //               console.log('this is userid')
    //               console.log(that.globalData.g_userid)
    //             },
    //             complete:function(){
    //               console.log('登录ok,this is code: ' + res1.code)
    //             }
    //           })
    //         }
    //       })
    //     } else {
    //       console.log('登录失败' + res.errMsg)
    //     }
    //   },
    //   fail: function (res) {
    //     console.log('this is error')
    //     console.log(res)
    //   }
    // })


    // // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: null,
    g_sessionid: null,
    g_userid: '',
    g_hbhuserid: 'f1fc85a46ee64058b8529143ac0c1f70',
    g_ip: "http://121.196.202.96:8080",
    g_socket: 'ws://121.196.202.96:8080',
    g_arr: [],
    g_tempdata:[],
    g_tempmsgfrom: '',
    // g_Register: g_Register(function register(){})
  }
})