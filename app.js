//app.js
var app = getApp()
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log('onLanch执行')

  },

  globalData: {
    userInfo: null,
    g_sessionid: wx.getStorageSync('sessionid'),
    g_userid: '',
    g_hbhuserid: 'f1fc85a46ee64058b8529143ac0c1f70',
    // g_ip: "http://192.168.0.103:8080",
    // g_socket: 'ws://192.168.0.103:8080',
    g_ip: "https://www.skqtec.com:8443",
    g_socket: 'wss://www.skqtec.com:8443',
    g_arr: [],
    g_tempdata:[],
    g_tempmsgfrom: '',
    g_msgfromid:null,
    g_newmsg:false
  }
})