var app = getApp();
Page({
  data: {
    id: 'id号',
    images: '图片',
    title: '标题',
    grouplist: [],
    showModel:false
  },


  onLoad: function(event) {
    console.log('this is 分享获取参数',event)
    var that=this
    this.getgrouplist()
    wx.request({
      url: app.globalData.g_ip +'/ketuan/applet/users/islogin',
      data:{
        sessionid:wx.getStorageSync('sessionid')
      },
      success:function(res){
        console.log('this is islogin',res)
        if(res.data.data.isLogin=='false'){
          that.setData({
            showModel:true
          })
          console.log('isLogin为false',that.data.showModel)
        }else{
          that.setData({
            showModel: false
          })
          console.log('isLogin为true', that.data.showModel)
        }
      }
    })

  },
  getgrouplist: function () {
    var that = this
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/groups/getgroup?page=1&state=1',
      success: function (res) {
        that.setData({
          grouplist: res.data.data.groups
        })
      }
    })
  },
  
  onbindblur: function(event) {
    this.setData({
      text: event.detail.value
    })
    console.log(this.data.text)
  },

  onsearch: function(e) {
    var that = this
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/groups/search',
      data: {
        keyword: this.data.text
      },
      success: function(res) {
        that.setData({
          // showshuju: res.data.data.groups,
          grouplist: res.data.data.groups
        })
        console.log(that.data.grouplist)
        if(that.data.grouplist.length==0){
          that.setData({
            is_null:true
          })          
        }
        else{
          that.setData({
            is_null: false
          })  
        }
      }
    })
  },

  tapgoods: function(e) {
    wx.navigateTo({
      url: 'groupgoods/goods?productid=' + e.currentTarget.dataset.productid + '&groupid=' + e.currentTarget.dataset.groupid
    })
  },
  onShareAppMessage: function () {
    console.log('+++++++转发++++++++++')
  },


  bindGetuserinfo: function (e) {       //登陆授权
    var that = this
    console.log(e.detail)
    wx.login({
      success: function (res1) {
        if (res1.code) {
          wx.request({
            url: app.globalData.g_ip + '/ketuan/applet/users/login',
            data: {
              code: res1.code,
              rawData: e.detail.rawData,
              encryptedData: e.detail.encryptedData,
              iv: e.detail.iv,
              signature: e.detail.signature,
              userInfo: e.detail.userInfo,
              parentid:'0'
            },
            success: function (res) {
              wx.setStorageSync('sessionid', res.data.data.sessionId)
              wx.setStorageSync('userid', res.data.data.userId)
              app.globalData.g_sessionid = wx.getStorageSync('sessionid')
              app.globalData.g_userid = wx.getStorageSync('userid')
              console.log('this is sessionid:')
              console.log(app.globalData.g_sessionid)
              console.log('this is userid')
              console.log(app.globalData.g_userid)
              
              wx.showToast({
                title: '登陆成功',
                icon: 'success'
              })
              that.setData({
                is_hidden: true,
                showModel:false
              })
              that.listenmsg()
              wx.onSocketClose(function (res) {
                console.log('++++++++++++WebSocket 已关闭！++++++++++++')
                that.listenmsg()
              })
            }

          })
        }
      }
    })
  },
  listenmsg: function () {            //监听消息传入
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
})
