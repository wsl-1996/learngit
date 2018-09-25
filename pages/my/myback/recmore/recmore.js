// pages/my/myback/recmore/recmore.js

var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     fanslist:[
       {
         avatar:'/images/avatar/1.png',
         contuibution:'146',
         contuibutiontotal:'668'
       },
       {
         avatar: '/images/avatar/2.png',
         contuibution: '146',
         contuibutiontotal: '628'
       }, {
         avatar: '/images/avatar/3.png',
         contuibution: '546',
         contuibutiontotal: '1098'
       }
    
     ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/users/getchildren',
      header: {
        'content-type': 'application/json',
        'session': wx.getStorageSync('sessionid')
      },
      success:function(res){
        that.setData({
          childrenInfo:res.data.data.childrenInfo
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