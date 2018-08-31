var app = getApp()

var i = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {

    goods: '商品',
    detail: '详情',
    comment: '评价',
    mainkey: [],
    subkey: [],
    subvalue: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getdetail()
    this.setData({
      productid: options.productid
    })
    console.log(this.data.productid)
  },
  getdetail: function() {
    var that = this
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/products/getproductparameter?productid=01',
      success: function(res) {
        console.log(Object.keys(res.data.data))
        that.setData({
          guige: res.data.data
        })
        var mainarr = Object.keys(res.data.data)
        var subarr = []
        var minarr = []
        for (var item in res.data.data) {
          console.log(res.data.data[item])
          console.log(Object.keys(res.data.data[item]))
          subarr.push(Object.keys(res.data.data[item]))
        }
        console.log(subarr)
        that.setData({
          mainarr: mainarr,
          subarr: subarr,
          minarr: res.data.data
        })

      }
    })
  },
  ongoods: function() {
    wx.redirectTo({
      url: '../groupgoods/goods?productid=' + this.data.productid,
    })
  },

  oncomment: function() {
    wx.redirectTo({
      url: '../groupcomment/comment?productid=' + this.data.productid,
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