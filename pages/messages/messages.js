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
    console.log(app.globalData.g_arr)
    wx.setStorageSync("msglist", app.globalData.g_arr)
  },

  getmsglist:function(){
    var arr = wx.getStorageSync("msglist")
    this.setData({
      msglist:arr
    })
    for(var i=0;i<this.data.msglist.length;i++){
      if (this.data.msglist[i].userid == app.globalData.g_msgfromid){
        this.data.msglist[i].is_new=true
        this.setData({
          msglist: this.data.msglist
        })   
      }    
    }
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