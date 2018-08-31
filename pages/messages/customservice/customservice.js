// pages/messages/customservice/customservice.js
var util = require('../../../utils/util.js');
var app = getApp();
var message = '';
var tempmsg = '';
var socketMsgQueue = [];
Page({

  /**
   * 页面的初始数据
   */

  data: {
    centendata: [],
    scrollTop: '3000rpx'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      receiverid: options.userid
    })
    console.log('this is receiverid:' + this.data.receiverid)
    this.getdatalist()
    var that = this
    wx.getUserInfo({
      success: function(res) {
        that.setData({
          headOwner: JSON.parse(res.rawData).avatarUrl
        })
      }
    })
    this.setData({
      toView: wx.getStorageSync('ToView')
    })
    this.acceptmsg()
    setInterval(this.acceptmsg, 500)
    setInterval(this.getdatalist, 500)
  },



  getdatalist: function() {
    var centendata = []
    centendata = wx.getStorageSync("centendata" + this.data.receiverid)
    if (centendata == '') {
      centendata = []
    }
    this.setData({
      centendata: centendata
    })
    // console.log(this.data.centendata)
    // util.Register()
  },

  bindChange: function(event) {
    message = event.detail.value
    console.log('length:' + message.length, '消息', message)

  },

  add: function(e) {
    var that = this
    if (message.trim().length != 0 && wx.getStorageSync('userid') != '') {
      var temp = {
        is_show_right: 1,
        messageFrom: wx.getStorageSync('userid'),
        messageTo: this.data.receiverid,
        messageContent: message,
        toView: util.RndNum(),
        createtime: util.formatTime(new Date()),
        contentType: '0',
        is_img: false,
        headOwner: this.data.headOwner
      }
      this.data.centendata.push(temp)
      console.log(this.data.centendata)
      console.log(temp)
      console.log('this is centendata即传到本地的数据')
      console.log(that.data.centendata)
      that.setData({
        centendata: that.data.centendata
      })
      wx.setStorageSync('ToView', temp.toView)
      that.setData({
        toView: temp.toView
      })

      wx.setStorageSync('centendata' + this.data.receiverid, this.data.centendata) //消息存入缓存
      tempmsg = JSON.stringify(temp)
      console.log('this is tempmsg')
      console.log(tempmsg)

      this.sendmsg();
    } else {
      console.log('发送内容不能为空或您还没有登陆')
      if (wx.getStorageSync('userid') == '') {
        wx.showToast({
          title: '您还没有登陆',
          icon: 'none'
        })
      }
    }
    this.setData({
      news_input_val: ''
    })
  },

  sendmsg: function() {

    console.log('执行sendmsg')

    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/message/sendMessage',
      data: {
        data: tempmsg
      },
      success: function(res) {
        console.log('发送成功')
        console.log()
      }
    })
  },

  acceptmsg: function() {
    if (app.globalData.g_tempmsgfrom == this.data.receiverid) { //如果接收到的messagefrom等于当前客服id就显示
      var lastlength = this.data.centendata.length
      this.setData({
        centendata: wx.getStorageSync('centendata' + app.globalData.g_tempmsgfrom)
      })
      if (lastlength != this.data.centendata.length) {
        this.setData({
          toView: wx.getStorageSync('ToView')
        })

        console.log(this.data.toView)
      }
    }


  },

  upimg1: function() {
    var that = this;
    wx.chooseImage({
      count: 5, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        console.log(res)
        var tempFilePaths = res.tempFilePaths
        for (let i = 0; i < tempFilePaths.length; i++) {
          var temp = {
            is_show_right: 1,
            is_img: true,
            messageContent: tempFilePaths[i],
            messageFrom: wx.getStorageSync('userid'),
            messageTo: that.data.receiverid,
            toView: util.RndNum(),
            contentType: '1',
            createtime: util.formatTime(new Date()),
            headOwner: that.data.headOwner
          }
          that.data.centendata.push(temp)
          that.setData({
            centendata: that.data.centendata
          })
          wx.setStorageSync('ToView', temp.toView)
          that.setData({
            toView: temp.toView
          })
          console.log("this is toView ")
          console.log(that.data.toView)
          wx.setStorageSync('centendata' + that.data.receiverid, that.data.centendata) //消息存入缓存
          console.log(that.data.centendata)


          wx.uploadFile({
            url: app.globalData.g_ip + '/ketuan/applet/images/getimage?messageFrom=' + wx.getStorageSync('userid') + '&messageTo=' + that.data.receiverid + '&headOwner=' + that.data.headOwner,
            filePath: tempFilePaths[i],
            name: 'file',
            header: {
              "Content-Type": "multipart/form-data"
            },

            success: function(res) {
              console.log('上传第' + i + '张图片ok')
              console.log(that.data.headOwner)
            },
            fail: function() {
              console.log('上传失败')
            }
          })
        }

      }
    })
  },

  previewimg: function(e) {
    var prearr = []
    prearr.push(e.currentTarget.dataset.preimg)
    wx.previewImage({
      urls: prearr,
    })
  },

  onroll: function() {
    this.setData({
      toView: ''
    })
    console.log(this.data.toView)
  },
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