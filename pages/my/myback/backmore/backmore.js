// pages/my/myback/backmore/backmore.js
var stadata=require('../../../../staticdata/data.js')
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidenview: true,
    cashback:[{ cashbackmonth:8,
      cashbackmoney:30
    }, {
      cashbackmonth: 7,
        cashbackmoney: 10
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      backrule:stadata.data.backrule,
      vip: stadata.data.vip
    })
    var that=this
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/bills/getcashback?sessionid=' + app.globalData.g_sessionid,
      success: function (res) {
        console.log(res.data.data.cashback)

        that.setData({
          cashback: res.data.data.cashback

        })
      }
    })
  },
  checkdetail:function(){
    this.setData({
      hidenview: !this.data.hidenview
    })
    console.log(this.data.hidenview)
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