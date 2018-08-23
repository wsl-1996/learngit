var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: '商品',
    detail: '详情',
    comment: '评价',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/products/getproductinfo?productid=01&sessionid=001',
      success:function(res){
        that.setData({
          guige: res.data.data.product.typeSpecification
        })
        console.log(that.data.guige)
      }
    })
  },
  ongoods: function () {
    wx.navigateTo({
      url: '../groupgoods/goods?productid=' + this.data.productid,
    })
  },

  oncomment: function () {
    wx.navigateTo({
      url: '../groupcomment/comment?productid=' + this.data.productid,
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