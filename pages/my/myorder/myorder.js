// pages/my/myorder/myorder.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusType: ["全部", "待支付","待发货", "待收货", "待评价"],
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
    this.getorderlist(curType)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getorderlist: function (currentType){
    var that = this
    console.log('订单状态',currentType)
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/orders/getorder?orderstate=' + currentType,
      header: {
        'content-type': 'application/json',
        'sessionid': wx.getStorageSync('sessionid')
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          orderlist: res.data.data.searchResult
        })
        that.handlestate()
        console.log('这是订单列表',that.data.orderlist)
      }
    })
  },

  handlestate: function (){
    for (let i = 0; i < this.data.orderlist.length;i++){
      switch (this.data.orderlist[i].orderState){
        case '1':
          this.data.orderlist[i].orderStateText='待支付'
          break;
        case '2':
          this.data.orderlist[i].orderStateText = '待发货'
          break;
        case '3':
          this.data.orderlist[i].orderStateText = '待收货'
          break;
        case '4':
          this.data.orderlist[i].orderStateText = '待评价'
          break;
        case '5':
          this.data.orderlist[i].orderStateText = '已评价'
          break;
        case '6':
          this.data.orderlist[i].orderStateText = '已取消'
          break;
      }
    }
    this.setData({
      orderlist:this.data.orderlist
    })
  },
  onLoad: function (options) {
  
  this.setData({
    currentType: options.currentyp
  });
  console.log('this is current type:',this.data.currentType)
    this.getorderlist(this.data.currentType)
  },


  deleteorder:function(e){
    var that=this
    var orderid= e.currentTarget.dataset.orderid
    wx.showModal({
      title: '确定要删除此订单么？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: app.globalData.g_ip + '/ketuan/applet/orders/removeorder',
            data:{
              orderid:orderid,
              // sessionid:app.globalData.g_sessionid
            },
            header: {
              'content-type': 'application/json',
              'sessionid': wx.getStorageSync('sessionid')
            },
            success:function(res){
              console.log("这里是返回订单编号",res)
              that.getorderlist(that.data.currentType)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  orderdetail:function(e){
    console.log('这是订单号：',e.currentTarget.dataset.orderid)
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
  toSearch: function () {         //查找订单
    var that=this
    this.setData({
      currentType:0
    })
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/orders/searchorders?sessionid=' + app.globalData.g_sessionid+'&key=%E8%A1%AC%E8%A1%AB',
      data: {
        userid: "01",
        key: this.data.searchInput
      },
      header: {
        'content-type': 'application/json',
        'sessionid': wx.getStorageSync('sessionid')
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          orderlist:res.data.data.searchResult
        })
        that.handlestate()
      }
    })
  },
  gotopay:function(e){
    var that = this
    var orderid = e.currentTarget.dataset.orderid
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/orders/orderpay',
      data:{
        orderid: orderid,
        // sessionid: app.globalData.g_sessionid
      },
      header: {
        'content-type': 'application/json',
        'sessionid': wx.getStorageSync('sessionid')
      },
      success:function(res){
        var data = res.data.data
        wx.requestPayment({
          'timeStamp': data.timeStamp,
          'nonceStr': data.nonceStr,
          'package': data.package,
          'signType': data.signType,
          'paySign': data.paySign,
          'appId': 'wx5733cafea467c980',
          'success': function (res) {
            console.log('调用待支付success')
          },
          'fail': function (res) {
            console.log(res)
            console.log('调用待支付failed' + JSON.stringify(data.nonceStr))
          }
        })
      }
    })
  },

  gotocomment:function(e){
    wx.navigateTo({
      url: 'tocomment/tocomment?orderid='+e.currentTarget.dataset.orderid,
    })
  },

  gotoexpress:function(e){
    wx.navigateTo({
      url: '../express/express?orderid=' + e.currentTarget.dataset.orderid + '&productimg=' + e.currentTarget.dataset.productimg,
    })
  },

  topayback:function(e){
    wx.navigateTo({
      url: 'topayback/topayback?orderid='+e.currentTarget.dataset.orderid,
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