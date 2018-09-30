var app = getApp();
var percentage = []
var intervalid1 = null
var intervalid2 = null
var intervalid = null
var util = require('../../utils/util.js')
Page({
  data: {
    id: 'id号',
    images: '图片',
    title: '标题',
    grouplist: [],
    showModel: false,
    testbanner:[
      {
        key:'fdf',
        imgurl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537246720866&di=ed71bdeedbc46bbbbc5862a0b95f8bf7&imgtype=0&src=http%3A%2F%2Fpic2.52pk.com%2Ffiles%2F160216%2F5329500_160443_1.png',
        groupid:'53a6d042164d4325a69c7f9b64cc879c',
        conenttype:true
      }
    ]
  },

  // progress: function (joingroup, maxgroup) {
  //   this.setData({
  //     percentage: util.topercent((joingroup / maxgroup))
  //   })
  // },
  onLoad: function(event) {
   

    console.log('this is 分享获取参数', event)
    var that = this
    this.getgrouplist()
    this.getbanner()
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/users/islogin',
      // data: {
      //   sessionid: wx.getStorageSync('sessionid')
      // },
      header: {
        'content-type': 'application/json',
        'sessionid': wx.getStorageSync('sessionid')
      },
      success: function(res) {
        console.log('this is islogin', res)
        if (res.data.data.isLogin == 'false') {
          that.setData({
            showModel: true
          })
          console.log('isLogin为false', that.data.showModel)
        } else {
          that.setData({
            showModel: false
          })
          console.log('isLogin为true', that.data.showModel)
          that.listenmsg()
        }
      }
    })

  },
  getgrouplist: function() {
    var that = this
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/groups/getgroup?page=1&state=1',
      success: function(res) {
        var groups = res.data.data.groups

        for (let i = 0; i < groups.length; i++) {
          var timestamp = Date.parse(new Date());
          console.log("当前时间戳为：" + timestamp);  
          var lasttime = groups[i].last_time
          var percent = util.tohot(groups[i].offered_count / groups[i].group_count)
          groups[i].percent = percent
          groups[i].percentnum = groups[i].offered_count / groups[i].group_count
          if (groups[i].percentnum < 0.25) { // 把团购情况转换为百分比
            groups[i].is_showhot = true
          }
          console.log(util.countdown(lasttime).d)
          console.log(groups[i].group_count)
          console.log(groups[i].percentnum)
          var weight = that.getweight(groups[i].group_count, util.countdown(lasttime).d, groups[i].percentnum)
          groups[i].weight = weight
          console.log('this is weight', weight)
          if (timestamp > lasttime){
            groups[i].endtype=true
          }
          intervalid1 = setInterval(function() { //时间戳转化为倒计时
            lasttime = groups[i].last_time
            groups[i].countDown = {}
            groups[i].countDown.d = util.countdown(lasttime).d
            groups[i].countDown.h = util.countdown(lasttime).h
            groups[i].countDown.m = util.countdown(lasttime).m
            groups[i].countDown.s = util.countdown(lasttime).s
          }, 1000)
        }

        var compare = function(obj1, obj2) { //根据权值排序
          var val1 = obj1.weight;
          var val2 = obj2.weight;
          if (val1 < val2) {
            return 1;
          } else if (val1 > val2) {
            return -1;
          } else {
            return 0;
          }
        }
        console.log(groups.sort(compare));

        intervalid2 = setInterval(function() {
          that.setData({
            grouplist: groups
          })
        }, 1000)
        that.setData({
          grouplist: groups
        })
        console.log("团购列表", res.data)
      }
    })
  },

  getbanner:function(){
    var that=this
      wx.request({
        url: app.globalData.g_ip + '/ketuan/applet/banners/getbanner',
        success:function(res){
          that.setData({
            banners:res.data.data.banners
          })
        }
      })
  },

  getweight: function(count, d, hot) {
    var countweight, dayweight, hotweight, totalweight
    countweight = count / 5
    dayweight = (10 - d) * 5
    hotweight = hot * 50
    totalweight = dayweight + countweight + hotweight
    console.log('总权重', totalweight)
    return totalweight
  },

  onbindblur: function(event) {
    this.setData({
      text: event.detail.value
    })
    console.log(this.data.text)
  },



  onsearch: function(e) {
    clearInterval(intervalid1) //清除定时器
    clearInterval(intervalid2)
    var that = this
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/groups/search?state=1',
      data: {
        keyword: this.data.text
      },
      success: function(res) {
        var groups = res.data.data.groups
        for (let i = 0; i < groups.length; i++) {
          
          var percent = util.tohot(groups[i].offered_count / groups[i].group_count)
          groups[i].percentnum = groups[i].offered_count / groups[i].group_count
          groups[i].percent = percent
          if (groups[i].percentnum < 0.25) {
            groups[i].is_showhot = true
          } // 把团购情况转换为百分比



          intervalid1 = setInterval(function() {
            var lasttime = groups[i].last_time //时间戳转化为倒计时
            groups[i].countDown = {}
            groups[i].countDown.d = util.countdown(lasttime).d
            groups[i].countDown.h = util.countdown(lasttime).h
            groups[i].countDown.m = util.countdown(lasttime).m
            groups[i].countDown.s = util.countdown(lasttime).s
          }, 1000)
        }
        that.setData({
          grouplist:groups
        })
        intervalid2 = setInterval(function() {
          that.setData({
            grouplist: groups
          })
        }, 1000)
        console.log('搜索列表', that.data.grouplist)
        if (that.data.grouplist.length == 0) {
          that.setData({
            is_null: true
          })
        } else {
          that.setData({
            is_null: false
          })
        }
      }
    })
  },

  tapgoods: function(e) {
    wx.navigateTo({
      url: 'groupgoods/goods?productid=' + e.currentTarget.dataset.productid + '&groupid=' + e.currentTarget.dataset.groupid + '&lasttime=' + e.currentTarget.dataset.lasttime
    })
  },
  onShareAppMessage: function() {
    console.log('+++++++转发++++++++++')
  },


  bindGetuserinfo: function(e) { //登陆授权
    var that = this
    console.log(e.detail)
    wx.login({
      success: function(res1) {
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
              parentid: '00000000000000000000000000000000'
            },
            success: function(res) {
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
                showModel: false
              })
              that.listenmsg()
              wx.onSocketClose(function(res) {
                console.log('++++++++++++WebSocket 已关闭！++++++++++++')
                that.listenmsg()
              })
            }

          })
        }
      }
    })
  },
  listenmsg: function() { //监听消息传入
    var that = this
    var msg = "{ messageFrom:" + "'" + wx.getStorageSync('userid') + "'" + ",messageContent:'connect',messageType: '-1'}"
    wx.connectSocket({
      url: app.globalData.g_socket + '/ketuan/websocket'
    })
    wx.onSocketOpen(function(res) {
      sendSocketMessage(msg)
      console.log("+++++++++++++开始监听+++++++++++++")
    })

    function sendSocketMessage(msg) {
      wx.sendSocketMessage({
        data: msg,
      })
    }

    wx.onSocketMessage(function(res) {  //监听消息传入

      console.log(res)
      // res.data.replace("{\"", "{'");
      // res.data.replace("\":", "':");
      // res.data.replace(",\"", ",'");
      console.log('this is res.data')
      console.log(res.data)
      var tempres = JSON.parse(res.data)
      console.log('this is tempres', tempres)
      console.log(tempres.messageContent)
      app.globalData.g_tempmsgfrom = tempres.messageFrom
      if(tempres.messageType=='4'){
        var redpacketContent = JSON.parse(tempres.messageContent)
      }
      var temp = {
        is_show_right: 0,
        messageContent: tempres.messageType == '4' ? redpacketContent.explain: tempres.messageContent,
        redpacketsum: tempres.messageType == '4' ? redpacketContent.sum :null,
        messageFrom: tempres.messageFrom,
        messageto: app.globalData.userid,
        toView: util.RndNum(),
        contentType: parseInt(tempres.contentType),
        messageType: parseInt(tempres.messageType),
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

        that.setmsglist(temp.headOwner, temp.messageContent, temp.messageContent, temp.messageFrom)
      app.globalData.g_newmsg = true
      console.log('+++++++++++++++您有新的消息了+++++++++++++++')

    })
  },

  setmsglist: function(Headimg, Nickname, message, userid) {
    var temp = {}
    var is_have = false
    temp = {
      "avatar": Headimg,
      "nickname": Nickname,
      "message": message,
      "userid": userid
    }
    app.globalData.g_arr = wx.getStorageSync('msglist')
    for (var i = 0; i < app.globalData.g_arr.length; i++) {
      if (app.globalData.g_arr[i].userid == temp.userid) {
        is_have = true
        app.globalData.g_arr[i].message = temp.message
        wx.setStorageSync("msglist", app.globalData.g_arr)
      }
    }
    if (app.globalData.g_arr == '') {
      app.globalData.g_arr = []
    }

    if (is_have == false) {
      app.globalData.g_arr.push(temp)
      console.log(app.globalData.g_arr)
      wx.setStorageSync("msglist", app.globalData.g_arr)
    }

  },

  tobannergroup:function(e){
    var cantab=e.currentTarget.dataset.cantab
    var groupid=e.currentTarget.dataset.groupid
    if(cantab==1){
      wx.navigateTo({
        url: 'groupgoods/goods?groupid=' + groupid,
      })
    }
   
  }
})