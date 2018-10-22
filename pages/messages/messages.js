// pages/message/messages.js
var util = require('/pages/utils/util.js')
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msglist:[],
    animationdata:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  var is_haveoffical=false
    var templist=wx.getStorageSync('msglist')
    for(let i=0;i<templist.length;i++){
      if (templist[i].userid =='00000000000000000000000000000000')
      is_haveoffical=true
    }
    if(is_haveoffical==false){
      this.setmsglist()
    }
    
     setInterval(this.getmsglist,1500)
  },
  customser: function (e) {
    wx.navigateTo({
      url: 'customservice/customservice',
    })
  },

  setmsglist:function(){
    console.log(app.globalData.g_arr)
    var temparr=wx.getStorageSync('msglist')
    if(temparr==''){
      temparr=[]
    }
    var tempobj={
      "avatar": '/images/icon/officaltalkicon.svg',
      "nickname": '官方客服',
      "message": '',
      "userid": '00000000000000000000000000000000'
    }
    temparr.push(tempobj)
    wx.setStorageSync("msglist", temparr)
  },

  getmsglist:function(){
    var arr = wx.getStorageSync("msglist")
    this.setData({
      msglist:arr
    })
    for(var i=0;i<this.data.msglist.length;i++){
      if (this.data.msglist[i].userid == app.globalData.g_msgfromid && app.globalData.g_newmsg==true){
        this.data.msglist[i].is_new=true
        this.setData({
          msglist: this.data.msglist
        })   
        
      }    
    }
  },


  gototalk:function(e){
    var userid = e.currentTarget.dataset.userid
    var idx=e.currentTarget.dataset.idx
    console.log(idx)
    this.data.msglist[idx].is_new=false
    this.setData({
      msglist:this.data.msglist
    })
    app.globalData.g_newmsg = false  //这是是否有新消息为false
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
    util.socketlink()
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