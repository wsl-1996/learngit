// pages/my/tobevip/tobevip.js
var app=getApp()
var stadata=require('../../../staticdata/data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // vip:stadata.data.vip
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/explains/getexplain',
      data: {
        key: 'vip'
      },
      success: function (res) {
        that.setData({
          vip: JSON.parse(JSON.parse(res.data.data.explain.explainInfo))
        })
        console.log('规则', JSON.parse(JSON.parse(res.data.data.explain.explainInfo)) )
      }

    })
  },


  toup: function () {
    var messagecontent = {
      reason: '请求升级'
    }
    messagecontent = JSON.stringify(messagecontent)
    var tempres = {
      messageFrom: wx.getStorageSync('userid'),
      messageTo: '00000000000000000000000000000000',
      messageContent: messagecontent,
      messageType: '1',
      contentType: '0'
    }
    tempres = JSON.stringify(tempres)
    console.log('tempres:', tempres)
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/message/sendMessage',
      data: {
        data: tempres
      },
      success: function (res) {
        console.log('申请成功', res)
        wx.showToast({
          title: '申请已提交,请等待审核',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})