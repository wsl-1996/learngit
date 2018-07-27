// pages/my/myback/backmore/backmore.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidenview: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.request({
      url: 'http://172.16.2.33:8080/ketuan/applet/bills/getcashback?userid=01',
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
      hidenview:false
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