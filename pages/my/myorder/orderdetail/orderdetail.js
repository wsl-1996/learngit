// pages/my/myorder/orderdetail/orderdetail.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderid:options.myorderid
    })
    console.log('okoko')
    console.log(this.data.orderid)
    this.getorderdetail()
  },

  getorderdetail:function(){
    var that = this
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/orders/getorderdetails',
      data: {
        orderid: this.data.orderid,
      },
      header: {
        'content-type': 'application/json',
        'sessionid': wx.getStorageSync('sessionid')
      },
      success: function (res) {
        console.log(res.data.data.orderDetails)
        that.setData({
          orderdetails: res.data.data.orderDetails
        })
        that.handleorder(that.data.orderdetails)
      }
    })
  },

  handleorder: function (orderdetails){
    if (orderdetails.deliverTime==null){
      this.setData({
        deliverTimehiden:true
      })
    }
    if (orderdetails.payTime == null) {
      this.setData({
        payTimehiden: true
      })
    }
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