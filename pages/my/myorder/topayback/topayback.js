// pages/my/myorder/topayback/topayback.js
var app = getApp()
var message = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      orderid: options.orderid
    })
  },
  applycontent: function(e) {
    message = e.detail.value
  },
  toapply: function() {
    var msgcontent = {
      orderid: this.data.orderid,
      reason: message
    }
    msgcontent=JSON.stringify(msgcontent)
    var temp = {
      messageFrom: wx.getStorageSync('userid'),
      messageTo: '00000000000000000000000000000000',
      messageContent: msgcontent ,
      messageType: '2',
      contentType: '0'
    }
    temp=JSON.stringify(temp)
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/message/sendMessage',
      data: {
        data: temp
      },

      header: {
        'content-type': 'application/json',
        'sessionid': wx.getStorageSync('sessionid')
      },
      success:function(){
        wx.showToast({
          title: '等待处理',
          success:function(){
            setTimeout(function(){
              wx.switchTab({
                url: '/pages/my/my',
              })
            },1500)
            
          }
        })
      }
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