var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:'商品',
    detail: '详情',
    comment: '评价',
    chosen:'已选',
    groupprice:"团购价",
    originalprice: "原价",
    tmprice: "天猫价",
    jdprice: "京东价",
    shareicon:"../../../images/share.png",

    showModal: false,
    ischecked:true,
    idx:0,
    index:0,
    num:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (event) {
    var proid=event.productid
    console.log("this is proid" + proid)
    var that = this
    wx.request({
      url: 'http://172.16.2.85:8080/ketuan/applet/products/getproductinfo?productid=' + proid+'&sessionid=001' ,
      success: function (res) {
        that.setData({
          productdetails: res.data.data,
          productinfo:res.data.data.product.productInfo
        })
        console.log(that.data.productdetails)
        console.log(res.data.data.product.productInfo)
      }
    })
    
  },
  ondetail:function(){
    wx.navigateTo({
      url: '../groupdetail/detail',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  oncomment:function(){
    wx.redirectTo({
      url: '../groupcomment/comment',
    })
  },

  gotoorder:function(res){
    
  },

  joingroup: function () {
    this.setData({
      showModal: true
    })
    var that=this
    wx.request({
      url: 'http://172.16.2.85:8080/ketuan/applet/products/getproductstyle?productid=01&sessionid=001',
      success:function(res){
        console.log(res.data.data)
        that.setData({
          firstimg: res.data.data.FistImg,
          productStyle: res.data.data.Style.productStyle,
          stylePrice: res.data.data.Style.stylePrice,
        })
        console.log(that.data.stylePrice)
      }
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function (e) {
    this.hideModal();
    console.log(e.currentTarget.dataset.goodsimg)
    wx.navigateTo({
      url: '../../commitorder/commitorder?num=' + this.data.num + '&style=' + this.data.goodsstyle + '&firstimg=' + this.data.firstimg + '&productinfo=' + this.data.productinfo + '&pricenow=' + this.data.pricenow
    })
  },

  onchosen:function(e){
    // var chosen = this.data.ischecked
    var index=e.currentTarget.dataset.idx
    var goodsstyle=e.currentTarget.dataset.style
    this.setData({
      ischecked: true,
      idx:index,
      goodsstyle: goodsstyle,
      pricenow:this.data.stylePrice[index]
    })
    console.log(this.data.ischecked)
    console.log(this.data.idx)
    console.log(this.data.goodsstyle)
  },

  onplus:function(res){
    var num=this.data.num
    this.setData({
      num:num+1
    })
    console.log(this.data.num)
  },

  onminus: function (res) {
    var num = this.data.num
    if(num>1){
    this.setData({
      num: num - 1
    })
    console.log(this.data.num)
  }},
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