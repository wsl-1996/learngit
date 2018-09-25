// pages/my/myback/backmore/backmore.js
var util = require('../../../../utils/util.js')
var stadata = require('../../../../staticdata/data.js')
var app = getApp()
var realname = '',
  bankcard = '',
  netpoint = '',
  cashnow = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidenview: false,
    showModelcash: false,
    cashback: [{
      cashbackmonth: 8,
      cashbackmoney: 30
    }, {
      cashbackmonth: 7,
      cashbackmoney: 10
    }],


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      // backrule: stadata.data.backrule,
      usergrade: options.usergrade,
      userBalance: util.getnum(options.userBalance) 
    })
    var that = this
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/bills/getcashback',
      header: {
        'content-type': 'application/json',
        'sessionid': wx.getStorageSync('sessionid')
      },
      success: function(res) {
        console.log('返现返回参数：',res.data.data.cashback)

        // that.setData({        
        //   cashback: res.data.data.cashback

        // })
      }
    })

    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/explains/getexplain',
      data:{
        key:'backrule'
      },
      success:function(res){
        that.setData({
          backrule: res.data.data.explain.explainInfo
        })
      }
      
    })
  },
  checkdetail: function() {
    this.setData({
      hidenview: !this.data.hidenview
    })
    console.log(this.data.hidenview)
  },

  namechange: function(e) {
    realname = e.detail.value
  },

  bankcardchange: function(e) {
    bankcard = e.detail.value
  },

  netpointchange: function(e) {
    netpoint = e.detail.value
  },

  cashchange: function(e) {
    cashnow = e.detail.value
  },
  confirmcash: function() {
    var that = this
    var messagecontent = {
      realname: realname,
      bankcard: bankcard,
      netpoint: netpoint,
      cashnow: cashnow
    }
    if (realname == '' || bankcard == '' || netpoint == '' || cashnow == '') {
      wx.showToast({
        title: '正确填写必填字段',
        icon: 'none'
      })
    } else if (Number(cashnow) >= Number(this.data.userBalance)) {
      wx.showToast({
        title: '超出提现范围',
        icon: 'none'
      })
    } else {
      console.log('content', messagecontent)
      messagecontent = JSON.stringify(messagecontent)

      var tempres = {
        messageFrom: wx.getStorageSync('userid'),
        messageTo: '00000000000000000000000000000000',
        messageContent: messagecontent,
        messageType: '3',
        contentType: '0'
      }
      tempres = JSON.stringify(tempres)
      wx.request({
        url: app.globalData.g_ip + '/ketuan/applet/message/sendMessage',
        data: {
          data: tempres
        },
        success: function(res) {
          console.log('提现申请成功', res)
          wx.showToast({
            title: '申请已提交,请等待审核',
          })
          that.setData({
            showModelcash: false
          })
        }
      })
    }
  },

  showcashmodel: function() {
    // if(this.data.usergrade==0){
    //   wx.showModal({
    //     title: '提示',
    //     content: '会员用户暂无提现权利，请在购物时进行抵扣，或者升级成为合伙人',
    //   })
    // }else{
      this.setData({
        showModelcash: true
      })
    // }
    
  },

  closecashmodel: function() {
    console.log('111111111111')
    this.setData({
      showModelcash: false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/users/getusergrade',
      header: {
        'content-type': 'application/json',
        'sessionid': wx.getStorageSync('sessionid')
      },
      success: function (res) {

        that.setData({
          userBalance: util.getnum(res.data.data.userBalance) 
        })
        console.log('用户余额：', that.data.userBalance)
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})