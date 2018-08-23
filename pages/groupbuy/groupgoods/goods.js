var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: '商品',
    detail: '详情',
    comment: '评价',
    chosen: '已选：',
    groupprice: "团购价",
    originalprice: "原价",
    cashback: '返现比例：',
    cashrule: '返现规则',
    tmprice: "天猫价",
    jdprice: "京东价",
    shareicon: "../../../images/share.png",
    showModellogin: false,
    showModal: false,
    ischecked: true,
    idx: 0,
    index: 0,
    num: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(event) {
    this.setData({
      groupid: event.groupid,
      productid: event.productid,
      parentid: event.parentid,
      showModellogin: event.showModellogin
    })
    console.log("this is parentid", this.data.parentid)
    console.log("this is productid" + this.data.groupid)
    console.log("this is groupid" + this.data.groupid)

    var that = this
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/products/getproductinfo?productid=' + this.data.productid + '&sessionid=' + app.globalData.g_sessionid,
      success: function(res) {
        that.setData({
          productdetails: res.data.data,
          productinfo: res.data.data.product.productInfo,
          userid: res.data.data.product.userId,
          serviceHeadimg: res.data.data.product.serviceHeadimg,
          serviceNickname: res.data.data.product.serviceNickname
        })
        console.log('客服ID' + that.data.userid)
        console.log(that.data.productdetails)
        console.log(res.data.data.product.productInfo)
      }
    })

  },
  ondetail: function() {
    wx.navigateTo({
      url: '../groupdetail/detail',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  oncomment: function() {
    wx.redirectTo({
      url: '../groupcomment/comment?proid=' + this.data.productid,
    })
    console.log('goods页面pid' + this.data.productid)
  },

  gotoorder: function(res) {

  },

  joingroup: function() {
    this.setData({
      showModal: true
    })
    var that = this
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/products/getproductstyle?productid=01&sessionid=001',
      success: function(res) {
        console.log(res.data.data)
        that.setData({
          firstimg: res.data.data.FistImg,
          productStyle: res.data.data.Style.productStyle,
          stylePrice: res.data.data.Style.stylePrice,
        })
        console.log(that.data.stylePrice)
        that.setData({
          goodsstyle: that.data.productStyle[0],
          pricenow: that.data.stylePrice[0]
        })
        console.log('这是默认款式：' + that.data.productStyle[0])
      }
    })

  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function() {},
  /**
   * 隐藏模态对话框
   */
  hideModal: function() {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function() {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function(e) {
    this.hideModal();
    console.log(e.currentTarget.dataset.goodsimg)
    wx.navigateTo({
      url: '../../commitorder/commitorder?num=' + this.data.num + '&style=' + this.data.goodsstyle + '&firstimg=' + this.data.firstimg + '&productinfo=' + this.data.productinfo + '&pricenow=' + this.data.pricenow + '&productid=' + this.data.productid + '&groupid=' + this.data.groupid
    })
    console.log("this is productidokok" + this.data.groupid)
    console.log("this is groupidokok" + this.data.groupid)
  },

  onchosen: function(e) {
    // var chosen = this.data.ischecked
    var index = e.currentTarget.dataset.idx
    var goodsstyle = e.currentTarget.dataset.style
    this.setData({
      ischecked: true,
      idx: index,
      goodsstyle: goodsstyle,
      pricenow: this.data.stylePrice[index]
    })
    console.log(this.data.ischecked)
    console.log(this.data.idx)
    console.log(this.data.goodsstyle)
  },

  onplus: function(res) {
    var num = this.data.num
    this.setData({
      num: num + 1
    })
    console.log(this.data.num)
  },

  onminus: function(res) {
    var num = this.data.num
    if (num > 1) {
      this.setData({
        num: num - 1
      })
      console.log(this.data.num)
    }
  },

  ontalk: function() {
    this.setmsglist()
    wx.navigateTo({
      url: '../../messages/customservice/customservice?userid=' + this.data.userid,
    })
  },

  setmsglist: function() {
    var temp = {}
    var is_have = false
    temp = {
      "avatar": this.data.serviceHeadimg,
      "nickname": this.data.serviceNickname,
      "message": "kokokoko",
      "userid": this.data.userid
    }
    app.globalData.g_arr = wx.getStorageSync('msglist')
    for (var i = 0; i < app.globalData.g_arr.length; i++) {
      if (app.globalData.g_arr[i].userid == temp.userid) {
        is_have = true
      }
    }
    if (app.globalData.g_arr == '') {
      app.globalData.g_arr = []
    }

    if (is_have == false) {
      app.globalData.g_arr.push(temp)
      console.log(app.globalData.g_arr)
      wx.setStorageSync("msglist", app.globalData.g_arr)
    }

  },
  previewimg: function(e) { //图片预览
    var list = e.currentTarget.dataset.list
    var currentimg = e.currentTarget.dataset.currentimg
    console.log('this is list ', list)
    wx.previewImage({
      current: currentimg,
      urls: list
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
  onShareAppMessage: function(res) {
    console.log('this is share', res)
    return {
      title: 'this is share',
      path: '/pages/groupbuy/groupgoods/goods?productid=' + this.data.productid + '&parentid=' + wx.getStorageSync('userid') + '&showModellogin=' + true,
    }
  },
  bindGetuserinfo: function(e) { //登陆授权
    var that = this
    console.log(e.detail)
    wx.login({
      success: function(res1) {
        if (res1.code) {
          wx.request({
            url: app.globalData.g_ip + '/ketuan/applet/users/login',
            data: {
              code: res1.code,
              rawData: e.detail.rawData,
              encryptedData: e.detail.encryptedData,
              iv: e.detail.iv,
              signature: e.detail.signature,
              userInfo: e.detail.userInfo,
              parentid: that.data.parentid
            },
            success: function(res) {
              wx.setStorageSync('sessionid', res.data.data.sessionId)
              wx.setStorageSync('userid', res.data.data.userId)
              app.globalData.g_sessionid = wx.getStorageSync('sessionid')
              app.globalData.g_userid = wx.getStorageSync('userid')
              console.log('this is sessionid:')
              console.log(app.globalData.g_sessionid)
              console.log('this is userid')
              console.log(app.globalData.g_userid)

              wx.showToast({
                title: '登陆成功',
                icon: 'success'
              })
              that.setData({
                showModellogin: true
              })
              that.listenmsg()
              wx.onSocketClose(function(res) {
                console.log('++++++++++++WebSocket 已关闭！++++++++++++')
                that.listenmsg()
              })
            }

          })
        }
      }
    })
  },
})