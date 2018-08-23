// pages/my/myorder/tocomment/tocomment.js
var app = getApp()
var message = ''
var tempFilePaths
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_light: false,
    starnum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      orderid: options.orderid
    })
  },


  setstarlv1: function() {
    this.setData({
      is_light: true,
      starnum: 1
    })
  },

  setstarlv2: function() {
    this.setData({
      is_light: true,
      starnum: 2
    })
  },

  setstarlv3: function() {
    this.setData({
      is_light: true,
      starnum: 3
    })
  },

  setstarlv4: function() {
    this.setData({
      is_light: true,
      starnum: 4
    })
  },

  setstarlv5: function() {
    this.setData({
      is_light: true,
      starnum: 5
    })
  },

  inputdone: function(e) {
    message = e.detail.value
  },

  addimg: function() {
    var that = this
    wx.chooseImage({
      count:5,
      success: function(res) {
        console.log('这是选择的图片', res)
        tempFilePaths = res.tempFilePaths
        that.setData({
          tempFilePaths: tempFilePaths
        })
      },
    })

  },
  commitimg: function() {
    var that=this
    for (let i = 0; i < tempFilePaths.length; i++) {
      wx.uploadFile({
        url: app.globalData.g_ip + '/ketuan/applet/images/sendcommentimage?orderid=' + that.data.orderid,
        filePath: tempFilePaths[i],
        name: 'file',
        header: {
          "Content-Type": "multipart/form-data"
        },

        success: function(res) {
          console.log('评价第' + i + '张图片上传ok', res)
        },
        fail: function() {
          console.log('评价图片上传失败')
        }
      })
    }
  },
  tocommit: function() {
    var that = this
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/comments/sendcomment',
      data: {
        orderid: that.data.orderid,
        starlevel: that.data.starnum,
        commentcontent: message,
        evaluateLabel: '暂时为空'
      },
      success: function(res) {
        console.log('提交返回：', res)
        that.commitimg()
        wx.showToast({
          title: '评价成功',     
        })
        setTimeout(function callback() { wx.navigateBack()} ,1500)
      }
    })
  },

  previewimg:function(e){           //图片预览
    var idx=e.currentTarget.dataset.idx
    wx.previewImage({
      current: this.data.tempFilePaths[idx],
      urls: this.data.tempFilePaths
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