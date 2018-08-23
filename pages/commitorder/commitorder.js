var app = getApp()
var flag=false
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalprice: 0,
    deduction:0,
    outcost:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this

    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/sendaddress/getdefaultaddress?sessionid=' + wx.getStorageSync('sessionid'),
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
    this.setData({
      outcost:this.data.totalprice-this.data.deduction
    })
    console.log('this is totalprice' + this.data.totalprice)
    this.getback()
  },

  commitorder: function(res) {
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/orders/createorder',
      data: {
        productid: this.data.productid,
        groupid: this.data.groupid,
        sessionid: app.globalData.g_sessionid,
        totalprice: this.data.totalprice,
        deduction: this.data.deduction,
        style: this.data.style,
        meno: this.data.meno,
        productprice: this.data.pricenow,
        sums: this.data.num,
        carriageprice: 5
      },
      success: function(res) {
        console.log(res.data)
        var data = res.data.data
        wx.requestPayment({
          'timeStamp': data.timeStamp,
          'nonceStr': data.nonceStr,
          'package': data.package,
          'signType': data.signType,
          'paySign': data.paySign,
          'appId': 'wx5733cafea467c980',
          'success': function(res) {
            console.log('调用支付success')
          },
          'fail': function(res) {
            console.log(res)
            console.log('调用支付failed' + JSON.stringify(data.nonceStr))
          }
        })
      }
    })

  },

  getback: function() {
    var that = this
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/users/getusergrade?sessionid=' + wx.getStorageSync('sessionid'),
      success: function(res) {
        that.setData({
          userBalance: res.data.data.userBalance
        })
        console.log('用户等级：', res.data)
        console.log(that.data.totalprice * 0.2)
        console.log(that.data.userBalance)
        var deduction = Math.min(that.data.totalprice * 0.2, that.data.userBalance)
        console.log('this is dedution+++++++++++', deduction)
        that.setData({
          deduction: 3.24 //deduction
        })
      }
    })

  },
  onplus: function(res) {

    this.setData({
      num: Number(this.data.num) + 1
    })
    this.setData({
      totalprice: this.data.num * this.data.pricenow
    })
    if (flag == true) {
      this.setData({
        outcost: this.data.totalprice - this.data.deduction
      })
    } else {
      this.setData({
        outcost: this.data.totalprice
      })
    }
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
      if(flag==true){
        this.setData({
          outcost: this.data.totalprice - this.data.deduction
        })
      }else{
        this.setData({
          outcost: this.data.totalprice
        })
      }
     
      console.log('这是num：',this.data.num)
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

  },
  chkRadio: function(res) {
    console.log(res)
    flag = !flag;
    res.checked =flag
    console.log(res.checked)
    this.setData({
      flag:flag
    })
  if(res.checked==true){
    this.setData({
      outcost: this.data.totalprice-this.data.deduction
    })
  }else{
    console.log('这是totalpricenow',this.data.totalprice)
   
    this.setData({
      outcost: this.data.totalprice
    })
  }
   }
})