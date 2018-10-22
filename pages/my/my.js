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
  onLoad: function() {
   
  },
  showaddress: function() {
    var that = this
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/sendaddress/getdefaultaddress',
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'sessionid': wx.getStorageSync('sessionid')
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
      url: app.globalData.g_ip + '/ketuan/applet/users/getusergrade',
      header: {
        'content-type': 'application/json',
        'sessionid': wx.getStorageSync('sessionid')
      },
      success: function(res) {

        that.setData({
          userGrade: res.data.data.userGrade,
          userBalance: res.data.data.userBalance


        })
        console.log('用户余额：', that.data.userBalance)
        console.log('用户等级：', that.data.userGrade)
      }
    })
  },

  showcashback: function() {
    var that = this
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/bills/getcashback',
      header: {
        'content-type': 'application/json',
        'sessionid': wx.getStorageSync('sessionid')
      },
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
      url: 'tobevip/tobevip?usergrade=' + this.data.userGrade,
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
    var that=this
    this.setData({
      redshow: false,
      istouched: false
    })
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/users/setbalance',
      header: {
        'content-type': 'application/json',
        'sessionid': wx.getStorageSync('sessionid')
      },
      data: {
        addbalance: this.data.sum
      },
      success: function (res) {
        console.log('添加余额', res)
        that.showusergrade()
      }
    })
  },

  gotoredpacket: function() {
    this.setredamount()
    var dt=new Date()
    var that=this
    if (wx.getStorageSync('reddate')!=dt.getDate()) {
      wx.showModal({
        title: '温馨提示',
        content: '每天均可免费领取一次随机金额红包',
        confirmText: '领取',
        success: function(res) {
          if (res.confirm) {
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

  setredamount:function(){
    var sum = util.getnum(util.tworandom(0.1,0))
    this.setData({
      sum:sum
    })
    console.log(sum)
  },
  
  onShow: function () {
    util.socketlink()
  },
})