var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: '商品',
    detail: '详情',
    comment: '评价',
    goodcomment:"好评度",
    commentnum:"商品评价92份",
    username:"我想改个名",
    commentdate: "2018/7/18",
    goodsstyle: "红白横条",
    buyyingtime: "2018/7/16",
    rate:"97%",
    Avatar:"../../../images/avatar/1.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
   wx.request({
     url: 'http://localhost:8080/ketuan/applet/comments/getcommentlist?page=1&productid=03',
     success:function(res){
       that.setData({
         commentlist:res.data.data.commentList
       })
       console.log(res.data.data.commentList)
       console.log(that.data.commentlist)
     }
   })
    

  },
  ongoods:function(){
    wx.navigateTo({
      url: '../groupgoods/goods',
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