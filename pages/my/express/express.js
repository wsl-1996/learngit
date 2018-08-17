// pages/my/express/express.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    expressDetail: [{ "AcceptStation": "【深圳市】  【福田新福星】（0755-83269390、0755-83387020） 的 赵海斌 （13164712226） 已揽收", "AcceptTime": "2018-07-30 14:51:10" }, { "AcceptStation": "【深圳市】  快件离开 【福田新福星】 发往 【南京江宁区】", "AcceptTime": "2018-07-30 21:56:26" }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var reversedata = this.data.expressDetail.reverse()
    reversedata[0].is_now=true
    this.setData({
      expressDetail: reversedata
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