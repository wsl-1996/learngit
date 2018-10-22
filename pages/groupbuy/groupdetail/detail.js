var app = getApp()
var i = 0
var time = 0;
var touchDot = 0;//触摸时的原点
var interval = "";
var flag_hd = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {

    goods: '商品',
    detail: '详情',
    comment: '评价',
    mainkey: [],
    subkey: [],
    subvalue: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
    this.setData({
      productid: options.productid,
      groupid:options.groupid
    })
    console.log(this.data.productid)
    this.getdetail()
  },
  getdetail: function() {
    var that = this
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/products/getproductparameter?productid='+this.data.productid,
      // data:{
      //   productid: this.data.productid
      // },
      success: function(res) {
        console.log(res.data)
        var parametername = Object.keys(res.data.data)
        console.log(parametername)
        that.setData({
          parameter:res.data.data,
          parametername: parametername
        })
        

        // for (var item in res.data.data) {
        //   console.log(res.data.data[item])
        //   console.log(Object.keys(res.data.data[item]))
        //   subarr.push(Object.keys(res.data.data[item]))
        // }
        // console.log(subarr)
        // that.setData({
        //   mainarr: mainarr,
        //   subarr: subarr,
        //   minarr: res.data.data
        // })

      }
    })
  },
  ongoods: function() {
    wx.redirectTo({
      url: '../groupgoods/goods?productid=' + this.data.productid + '&groupid=' + this.data.groupid,
    })
  },

  oncomment: function() {
    wx.redirectTo({
      url: '../groupcomment/comment?productid=' + this.data.productid + '&groupid=' + this.data.groupid,
    })
  },

  // 触摸开始事件
  touchStart: function (e) {
    touchDot = e.touches[0].pageX; // 获取触摸时的原点
    // 使用js计时器记录时间    
    interval = setInterval(function () {
      time++;
    }, 100);
  },
  // 触摸结束事件
  touchEnd: function (e) {
    var touchMove = e.changedTouches[0].pageX;
    // 向右滑动   
    if (touchMove - touchDot <= -140 && time < 10 && flag_hd == true) {
      flag_hd = false;
      //执行切换页面的方法
      console.log("向右滑动");
      wx.redirectTo({
        url: '../groupcomment/comment?productid=' + this.data.productid + '&groupid=' + this.data.groupid,
      })
    }
    // 向左滑动   
    if (touchMove - touchDot >= 140 && time < 10 && flag_hd == true) {
      flag_hd = false;
      //执行切换页面的方法
      console.log("向左滑动");
      wx.redirectTo({
        url: '../groupgoods/goods?productid=' + this.data.productid + '&groupid=' + this.data.groupid,
      })
    }
    clearInterval(interval); // 清除setInterval
    time = 0;
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
    flag_hd = true;    //重新进入页面之后，可以再次执行滑动切换页面代码
    clearInterval(interval); // 清除setInterval
    time = 0;
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