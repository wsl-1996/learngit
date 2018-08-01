// pages/commitorder/commitorder.js
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
    var that=this
    wx.request({
      url: 'http://172.16.2.85:8080/ketuan/applet/sendaddress/getdefaultaddress?userid=01',
      success:function(res){
        that.setData({
              addressinfo:res.data.data.addressinfo
        })
      }
    })
    this.setData({
      num:options.num,
      style:options.style,
      firstimg:options.firstimg,
      productinfo: options.productinfo,
      pricenow:options.pricenow
    })
    console.log("this is thsada0")
    console.log(this.data.style)
    console.log(this.data.productinfo)
    this.data.totalprice=this.data.num*this.data.pricenow
  },
  onplus: function (res) {
    var num = this.data.num
    this.setData({
      num: num + 1
    })
    console.log(this.data.num)
  },

  onminus: function (res) {
    var num = this.data.num
    if (num > 1) {
      this.setData({
        num: num - 1
      })
      console.log(this.data.num)
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