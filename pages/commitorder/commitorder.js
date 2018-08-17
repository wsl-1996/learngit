var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalprice: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/sendaddress/getdefaultaddress?sessionid=' + app.globalData.g_sessionid,
      success: function(res) {
        that.setData({
          addressinfo: res.data.data.addressinfo
        })
      }
    })
    this.setData({
      num: options.num,
      style: options.style,
      firstimg: options.firstimg,
      productinfo: options.productinfo,
      pricenow: options.pricenow,
      groupid: options.groupid,
      productid: options.productid

    })
    console.log("this is thsada0")
    console.log(this.data.style)
    console.log(this.data.productinfo)
    console.log("this is groupid" + this.data.groupid)
    console.log("this is proid" + this.data.productid)
    this.setData({
      totalprice: this.data.num * this.data.pricenow
    })
    console.log('this is totalprice' + this.data.totalprice)
  },

  commitorder: function(res) {
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/orders/createorder',
      data: {
        productid: this.data.productid,
        groupid: this.data.groupid,
        sessionid: app.globalData.g_sessionid,
        totalprice: this.data.totalprice,
        style: this.data.style,
        meno: this.data.meno,
        productprice: this.data.pricenow,
        sums: this.data.num,
        carriageprice: 5
      },
      success: function(res) {
        console.log(res.data)
        var data=res.data.data
        wx.requestPayment({
          'timeStamp': data.timeStamp ,
          'nonceStr': data.nonceStr,
          'package': data.package,
          'signType': data.signType,
          'paySign': data.paySign,
          'appId':'wx5733cafea467c980',
          'success': function(res) {
            console.log('调用支付success')
          },
          'fail': function(res) {
            console.log(res)
            console.log('调用支付failed'+ JSON.stringify(data.nonceStr))
          }
        })
      }
    })

    // wx.requestPayment({
    //   timeStamp: '1490840662',
    //   nonceStr: '5K8264ILTKCH16CQ2502SI8ZNMTM67VS',
    //   package: 'prepay_id=wx2017033010242291fcfe0db70013231072',
    //   signType: 'MD5',
    //   paySign: 'MD5(appId=wx5733cafea467c980&nonceStr=5K8264ILTKCH16CQ2502SI8ZNMTM67VS&package=prepay_id=wx2017033010242291fcfe0db70013231072&signType=MD5&timeStamp=1490840662&key=qazwsxedcrfvtgbyhnujmikolp111111) = 22D9B4E54AB1950F51E0649E8810ACD6',
    //   success: function (res) {
    //     console.log('调用支付success')
    //   },
    //   fail: function (res) {
    //     console.log('调用支付failed')
    //   }
    // })
  },
  onplus: function(res) {

    this.setData({
      num: Number(this.data.num)  + 1
    })
    this.setData({
      totalprice: this.data.num * this.data.pricenow
    })
    console.log(this.data.num)
  },

  onminus: function(res) {
    var num = this.data.num
    if (num > 1) {
      this.setData({
        num: num - 1
      })
      this.setData({
        totalprice: this.data.num * this.data.pricenow
      })
      console.log(this.data.num)
    }
  },

  remarkvalue: function(e) {
    console.log(e.detail.value)
    this.setData({
      meno: e.detail.value
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
  onShareAppMessage: function() {

  }
})