// pages/message/messages.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msglist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  customser: function (e) {
    wx.navigateTo({
      url: 'customservice/customservice',
    })
  },

  setmsglist:function(){
    //  var   temp={}g 
    //   "avatar": "/images/avatar/1.png",
    //   "nickname":"往事随风了把",
    //   "message":"上一条消息上一条消息上一条消息"
    // }
    // app.globalData.g_arr.push(temp)
    // temp = {
    //   "avatar": "/images/avatar/2.png",
    //   "nickname": "易王义",
    //   "message": "图形sdfsdfsdfsd夏天"
    // }
    // app.globalData.g_arr.push(temp)
    console.log(app.globalData.g_arr)
    wx.setStorageSync("msglist", app.globalData.g_arr)
  },

  getmsglist:function(){
    var arr = wx.getStorageSync("msglist")
    this.setData({
      msglist:arr
    })
    console.log('this is mmsglist')
    console.log(this.data.msglist)
  },

  express:function(){
    wx.navigateTo({
      url: '../my/express/express',
    })
  },

  gototalk:function(e){
    var userid = e.currentTarget.dataset.userid
    console.log(userid) 
    wx.navigateTo({
      url: 'customservice/customservice?userid='+userid,
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
   
    this.getmsglist()
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