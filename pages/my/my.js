var app = getApp()
var util = require('../../utils/util.js')
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    iconimg: [
      "../../images/icon/pay.svg",
      "../../images/icon/getgoods.svg",
      "../../images/icon/onroad.svg",
      "../../images/icon/comment.svg",
    ],
    is_hidden: false,
    todayred:false
  },
  onLoad: function() {},
  showaddress: function() {
    var that = this
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/sendaddress/getdefaultaddress?sessionid=' + wx.getStorageSync('sessionid'),
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        var data = res.data.data.addressinfo
        that.setData({
          userProvince: data.userProvince,
          userCity: data.userCity,
          userDistricts: data.userDistricts,
          userAddressDetails: data.userAddressDetails,
          defaultaddressid: data.addressId
        })
        console.log('默认地址：', data)
      }
    })
  },

  showusergrade: function() {
    var that = this
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/users/getusergrade?sessionid=' + app.globalData.g_sessionid,
      success: function(res) {

        that.setData({
          userGrade: res.data.data.userGrade,
          userBalance: res.data.data.userBalance


        })
        console.log('用户信息：', res.data)
        console.log('用户等级：', that.data.userGrade)
      }
    })
  },

  showcashback: function() {
    var that = this
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/bills/getcashback?sessionid=' + app.globalData.g_sessionid,
      success: function(res) {

        that.setData({
          cashback: res.data.data.cashback

        })
      }
    })
  },


  addressmanage: function() {
    wx.navigateTo({
      url: 'myaddress/myaddress?defaultaddress=' + this.data.defaultaddressid,
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
      url: 'myback/backmore/backmore?usergrade=' + this.data.userGrade + '&userBalance=' + this.data.userBalance,
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

  clearstorage: function() {
    wx.showModal({
      title: '是否要清除缓存',
      content: '',
      success: function(res) {
        if (res.confirm) {
          try {
            wx.clearStorageSync()
          } catch (e) {
            console.log('清除失败')
          }
        }
      }
    })
  },
  tobevip: function() {
    wx.navigateTo({
      url: 'tobevip/tobevip',
    })
  },
  onShow: function() {
    this.showaddress()
    this.showcashback()
    this.showusergrade()
    console.log('this is onshow')
  },
  touchcanvas: function() {
    this.setData({
      istouched: true
    })
  },

  closemodel: function() {
    this.setData({
      redshow: false,
      istouched: false
    })
  },

  gotoredpacket: function() {
    var dt=new Date()
    var that=this
    if (wx.getStorageSync('reddate')!=dt.getDate()) {
      wx.showModal({
        title: '温馨提示',
        content: '每天均可免费领取一次随机金额红包',
        confirmText: '领取',
        success: function(res) {
          if (res.confirm) {
            Math.random()
            that.setData({
              redshow: true,
            })
            wx.setStorageSync('reddate', dt.getDate())
          }
        }
      })
  } else {
      wx.showToast({
        title: '您今天已经领取过了',
      })
    }
  },
  // drawcanvas:function(){
  //   const ctx = wx.createCanvasContext('myCanvas')
  //   const ctx1 = wx.createCanvasContext("myCanvas1")
  //   const ctx2 = wx.createCanvasContext('myCanvas2')

  //   ctx2.beginPath()
  //   ctx2.moveTo(0, 0)
  //   ctx2.lineTo(0, 10)
  //   ctx2.quadraticCurveTo(150, 130, 300, 10)
  //   ctx2.lineTo(300, 0)
  //   ctx2.closePath()
  //   ctx2.lineWidth = 3
  //   ctx2.fillStyle = '#E89688'
  //   ctx2.fill()
  //   ctx2.draw()

  //   ctx.beginPath()
  //   ctx.moveTo(0, 0)
  //   ctx.lineTo(0, 20)
  //   ctx.quadraticCurveTo(150, 150, 300, 20)
  //   ctx.lineTo(300, 0)
  //   ctx2.closePath()
  //   ctx.setStrokeStyle('red')
  //   ctx.setFillStyle('red')
  //   ctx.fill()
  //   ctx.draw()

  //   ctx1.beginPath()
  //   ctx1.arc(150, 70, 30, 0, 2 * Math.PI)
  //   ctx1.setFillStyle('yellow')
  //   ctx1.fill()
  //   ctx1.beginPath()
  //   ctx1.setFontSize(20)
  //   ctx1.setFillStyle('#000')
  //   ctx1.fillText('拆', 140, 75)
  //   ctx1.fill()
  //   ctx1.draw()

  //   console.log('绘制！！！！！')
  // }
})