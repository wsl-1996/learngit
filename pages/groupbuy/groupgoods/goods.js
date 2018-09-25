var util=require('../../../utils/util.js')
var app = getApp();
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
    chosen: '已选：',
    groupprice: "团购价",
    originalprice: "原价",
    cashback: '返现比例：',
    cashrule: '返现规则',
    tmprice: "天猫价",
    jdprice: "京东价",
    shareicon: "../../../images/share.png",
    showModellogin: false,
    showModelrule:false,
    showModal: false,
    ischecked: true,
    idx: 0,
    index: 0,
    num: 1,
    buytype:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(event) {
    var that=this
    this.setData({
      groupid: event.groupid,
      parentid: event.parentid,
      showModellogin: event.showModellogin,
      // lasttime:event.lasttime
    })
    this.getproductinfo()
    // this.setlasttime() 
    this.showusergrade()
  },
  getproductinfo:function(){
    var that = this
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/groups/getgroupinfo?groupid=' + this.data.groupid,
      header: {
        'content-type': 'application/json',
        'sessionid': wx.getStorageSync('sessionid')
      },
      success: function (res) {
        var data=res.data.data
        that.setData({
          productid: data.product.id,
          lasttime:data.group.endTime,
          groupSlideImg: JSON.parse(data.group.groupSlideImg) ,
          imagesAddress: JSON.parse(data.product.imagesAddress),
          productinfo: data.group.groupName,
          groupPrice: data.group.groupPrice,
          price:data.product.price,
          userid: data.product.userId,
          serviceHeadimg: data.product.serviceHeadimg,
          serviceNickname: data.product.serviceNickname,
          groupStyle: JSON.parse(data.group.groupStyle),
          firstimg: data.group.groupFirstImg,
          afterSale: JSON.parse(data.product.afterSale),
          afterSalekey: Object.keys(JSON.parse(data.product.afterSale)),
          returnCashRate: util.topercent(data.group.returnCashRate) ,
          returnCashRateInviter: util.topercent(data.group.returnCashRateInviter), 
          groupCount: data.group.groupCount
        })

        console.log('客服ID' + that.data.userid)
        console.log('商品详情', res)
        that.setlasttime() 
      }
    })
  },

  setlasttime:function(){
    var that=this
    var timestamp = Date.parse(new Date());
    if (timestamp > this.data.lasttime) {
      this.setData({
        endtype: true
      })
    }
    setInterval(function () {
      that.setData({
        d: util.countdown(that.data.lasttime).d,
        h: util.countdown(that.data.lasttime).h,
        m: util.countdown(that.data.lasttime).m,
        s: util.countdown(that.data.lasttime).s
      })

    }, 1000)
  },
  ondetail: function() {
    wx.redirectTo({
      url: '../groupdetail/detail?productid=' + this.data.productid+'&groupid='+this.data.groupid,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  oncomment: function() {
    wx.redirectTo({
      url: '../groupcomment/comment?productid=' + this.data.productid + '&groupid=' + this.data.groupid,
    })
    console.log('goods页面pid' + this.data.productid)
  },

  gotoorder: function(res) {

  },

  takegroup:function(){
    this.setData({
      showModal: true,
      buytype:true,
      goodsstyle: this.data.groupStyle[0]
    })
  },

  joingroup: function() {
    this.setData({
      showModal: true,
      buytype:false,
      goodsstyle:this.data.groupStyle[0]
    })

    // var that = this
    // wx.request({
    //   url: app.globalData.g_ip + '/ketuan/applet/products/getproductstyle?productid='+ this.data.productid+'&sessionid=001',
    //   success: function(res) {
    //     console.log(res.data.data)
    //     that.setData({
    //       firstimg: res.data.data.FistImg,
    //       productStyle: res.data.data.Style.productStyle,
    //       stylePrice: res.data.data.Style.stylePrice,
    //     })
    //     console.log(that.data.stylePrice)
    //     that.setData({
    //       goodsstyle: that.data.productStyle[0],
    //       pricenow: that.data.stylePrice[0]
    //     })
    //     console.log('这是默认款式：' + that.data.productStyle[0])
    //   }
    // })
  

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
    var pricenow = this.data.buytype == false ? this.data.groupPrice:this.data.price
    this.hideModal();
    console.log(e.currentTarget.dataset.goodsimg)
    wx.navigateTo({
      url: '../../commitorder/commitorder?num=' + this.data.num + '&style=' + this.data.goodsstyle + '&firstimg=' + this.data.firstimg + '&productinfo=' + this.data.productinfo + '&pricenow=' + pricenow + '&productid=' + this.data.productid + '&groupid=' + this.data.groupid
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
      // pricenow: this.data.stylePrice[index]
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

  setmsglist: function() {       //发送消息列表 存缓存
    var temp = {}
    var is_have = false
    temp = {
      "avatar": this.data.serviceHeadimg,
      "nickname": '客服：'+this.data.serviceNickname,
      "message": "",
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


  tocashrule:function(){
    this.setData({
      showModelrule:true
    })
  },

  kownrule:function(){
    this.setData({
      showModelrule: false
    })
  },

  showusergrade: function () {
    var that = this
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/users/getusergrade',
      header: {
        'content-type': 'application/json',
        'sessionid': wx.getStorageSync('sessionid')
      },
      success: function (res) {
        var usergrade=res.data.data.userGrade
        if(usergrade==0){
          usergrade='会员用户'
        }else if(usergrade==1){
          usergrade='合伙人'
        }else{
          usergrade='金牌合伙人'
        }
        that.setData({
          userGrade: usergrade

        })
        console.log('用户等级：', usergrade)
      }
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
  onShareAppMessage: function(res) {
    console.log('this is share', res)
    return {
      title: this.data.productinfo,
      path: '/pages/groupbuy/groupgoods/goods?productid=' + this.data.productid + '&parentid=' + wx.getStorageSync('userid') + '&showModellogin=' + true,       //根据推荐进来的用户会在本页面登陆
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
    if (touchMove - touchDot <= -40 && time < 10 && flag_hd == true) {
      flag_hd = false;
      //执行切换页面的方法
      console.log("向右滑动");
      wx.redirectTo({
        url: '../groupdetail/detail?productid=' + this.data.productid + '&groupid=' + this.data.groupid,
      })
    }
    // 向右滑动   
    if (touchMove - touchDot >= 40 && time < 10 && flag_hd == true) {
      flag_hd = false;
      //执行切换页面的方法
      console.log("向左滑动");
      wx.navigateTo({
        url: '../left/left'
      })
    }
    clearInterval(interval); // 清除setInterval
    time = 0;
  }
})