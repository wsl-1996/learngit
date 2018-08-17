// pages/my/myorder/myorder.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusType: ["已完成", "待付款","待发货", "待收货", "待评价"],
    currentType: '0',
    tabClass: ["", "", "", "", ""],
    myorder:[],
    searchInput:[],
    orderlist:[]
  },
  statusTap: function (e) {    //状态切换
    var curType = e.currentTarget.dataset.index;
    this.data.currentType = curType
    this.setData({
      currentType: curType
    });
    this.onShow();
    this.getorderlist()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getorderlist: function (){
    var that = this
    console.log(that.data.currentType)
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/orders/getorder?sessionid=' + app.globalData.g_sessionid+'&orderstate=' + this.data.currentType,
      success: function (res) {
        console.log(res.data)
        that.setData({
          orderlist: res.data.data.searchResult
        })
        console.log(that.data.orderlist)
      }
    })
  },
  onLoad: function (options) {
  
  this.setData({
    currentType: options.currentyp
  });
  this.getorderlist()
  },


  deleteorder:function(){
    console.log('deleteorder test')
    wx.showModal({
      title: '确定要删除此订单么？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: 'url',
            data:{
              order_id:"orderid"
            },
            header:{
              'content-type':'application/json'
            },
            method:"POST",
            success:function(){
              console.log("这里是返回订单编号")
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  orderdetail:function(e){
    console.log(e.currentTarget.dataset.orderid)
    wx.navigateTo({
      url: 'orderdetail/orderdetail?myorderid='+e.currentTarget.dataset.orderid,
    })
  },

  onShareAppMessage: function () {

  },

  listenerSearchInput: function (e) {
    this.setData({
      searchInput: e.detail.value
    })
    console.log(e.detail.value)
  },
  toSearch: function () {
    var that=this
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/orders/searchorders?sessionid=' + app.globalData.g_sessionid+'&key=%E8%A1%AC%E8%A1%AB',
      data: {
        userid: "01",
        key: this.data.searchInput
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          orderlist:res.data.data.searchResult
        })
      }
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

})