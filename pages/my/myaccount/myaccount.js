// pages/my/myaccount/myaccount.js
var app = getApp()
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

  },

  listenerinput: function(e) {
    console.log(e.detail.value)
    this.setData({
      inputphone: e.detail.value
    })
  },

  sendphonecode: function(e) {
    var that = this
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/users/sendverficationcode',
      data: {
        phone: that.data.inputphone,
        // sessionid: app.globalData.g_sessionid
      },
      header: {
        'content-type': 'application/json',
        'session': wx.getStorageSync('sessionid')
      },
      success: function() {
        console.log('发送手机号成功：')
        console.log(that.data.inputphone)
      }
    })
  },

  lintenercode: function(e) {
    this.setData({
      inputcode: e.detail.value
    })
  },

  checkphonecode: function(e) {
    console.log('this is 校验按钮')
    var that = this
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/users/checkverficationcode',
      data: {
        verficationcode: that.data.inputcode,
        // sessionid: app.globalData.g_sessionid
      },
      header: {
        'content-type': 'application/json',
        'session': wx.getStorageSync('sessionid')
      },
      success: function(res) {
        console.log(res)
        console.log('绑定ok')
        console.log(that.data.inputcode)
        wx.showToast({
          title: '绑定成功',
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