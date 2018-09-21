// pages/canvastest/canvastest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    redshow:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const ctx = wx.createCanvasContext('myCanvas')
    const ctx1 = wx.createCanvasContext("myCanvas1")
    const ctx2 = wx.createCanvasContext('myCanvas2')

    ctx2.beginPath()
    ctx2.moveTo(0, 0)
    ctx2.lineTo(0, 10)
    ctx2.quadraticCurveTo(150, 130, 300, 10)
    ctx2.lineTo(300, 0)
    ctx2.lineWidth = 3
    ctx2.fillStyle = '#E89688'
    ctx2.fill()
    ctx2.draw()

    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(0, 20)
    ctx.quadraticCurveTo(150, 150, 300, 20)
    ctx.lineTo(300, 0)
    ctx.setStrokeStyle('red')
    ctx.setFillStyle('red')
    ctx.fill()
    ctx.draw()

    ctx1.beginPath()
    ctx1.arc(150, 70, 30, 0, 2 * Math.PI)
    ctx1.setFillStyle('yellow')
    ctx1.fill()
    ctx1.beginPath()
    ctx1.setFontSize(20)
    ctx1.setFillStyle('#000')
    ctx1.fillText('拆', 140, 75)
    ctx1.fill()
    ctx1.draw()
  },

  touchcanvas:function(){
    this.setData({
      istouched:true
    })
  },

  closemodel:function(){
    this.setData({
      redshow: false
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