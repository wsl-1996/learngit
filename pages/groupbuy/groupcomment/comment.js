var app = getApp()
var util = require('../../../utils/util.js')
var time = 0;
var touchDot = 0;//触摸时的原点
var interval = "";
var flag_hd = true;

Page({

  /**
   * 页面的 初始数据
   */
  data: {
    comments: {},
    is_nocomment:false
  },

  /**gg
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      productid: options.productid,
      groupid:options.groupid
    })
    console.log('conment页面pid'+this.data.productid)
    this.getcommentlist()
  },

  getcommentlist: function() {
    var that = this
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/comments/getcommentlist?page=1&productid=' + this.data.productid,
      success: function(res) {
        if (res.data.data.commentList.length==0) {
          that.setData({
            is_nocomment: true
          })
        }else{
          that.setData({
            commentlist: res.data.data.commentList,
            favorableNums: res.data.data.favorableInfo.favorableNums,
            favorableRate: res.data.data.favorableInfo.favorableRate,
          })
        }

      
        that.processcommentData(res.data.data)
        console.log("评价信息",res.data)
        console.log("评价信息", res.data.data.commentList)
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
    wx.redirectTo({
      url: '../groupgoods/goods?productid=' + this.data.productid + '&groupid=' + this.data.groupid,
    })
  },

  ondetail:function(){
    wx.redirectTo({
      url: '../groupdetail/detail?productid=' + this.data.productid + '&groupid=' + this.data.groupid,
    })
  },

  imgYu: function(event) {
    var imgList = event.currentTarget.dataset.list; //获取data-list
    //图片预览
    wx.previewImage({
      urls: imgList // 需要预览的图片http链接列表
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

    // 向左滑动   
    if (touchMove - touchDot >= 40 && time < 10 && flag_hd == true) {
      flag_hd = false;
      //执行切换页面的方法
      console.log("向左滑动");
      wx.redirectTo({
        url: '../groupdetail/detail?productid=' + this.data.productid + '&groupid=' + this.data.groupid,
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