var app = getApp()
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的 初始数据
   */
  data: {
    comments: {}
  },

  /**gg
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      productid: options.proid
    })
    console.log('conment页面pid'+this.data.productid)
    this.getcommentlist()
  },

  getcommentlist: function() {
    var that = this
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/comments/getcommentlist?page=1&productid=' + this.data.productid,
      success: function(res) {
        that.setData({
          commentlist: res.data.data.commentList
        })
        that.processcommentData(res.data.data)
        // console.log(res.data.data)
      }
    })
  },

  processcommentData: function(commentdata) {
    var comments = []
    for (var idx in commentdata.commentList) {
      var onecomment = commentdata.commentList[idx]
      // console.log(onecomment)
      var temp = {
        headImg: onecomment.headImg,
        userName: onecomment.userName,
        commentTime: onecomment.commentTime,
        commentContent: onecomment.commentContent,
        starLevel: util.convertToStarsArray(onecomment.starLevel),
        productStyle: onecomment.productStyle,
        commentImg: onecomment.commentImg
      }
      comments.push(temp)
      console.log('this is comments')
      console.log(comments)
      console.log('this is stars' + comments[0].starLevel)

    }
    console.log('this is comments')
    this.setData({
      comments: comments
    })

  },
  ongoods: function() {
    wx.navigateTo({
      url: '../groupgoods/goods?productid='+this.data.productid,
    })
  },

  ondetail:function(){
    wx.navigateTo({
      url: '../groupdetail/detail?productid=' + this.data.productid,
    })
  },

  imgYu: function(event) {
    var imgList = event.currentTarget.dataset.list; //获取data-list
    //图片预览
    wx.previewImage({
      urls: imgList // 需要预览的图片http链接列表
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