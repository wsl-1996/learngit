// pages/my/myaddress/myaddress.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */

  data: {
    showModal: false,
    region: ['', '', ''],
  },
  /**
   * 弹窗
   */
  showDialogBtn: function(e) {
    this.setData({
      showModal: true,
      sendname: e.currentTarget.dataset.sendname,
      sendphone: e.currentTarget.dataset.sendphone,
      sendphone: e.currentTarget.dataset.sendphone,
      region: [e.currentTarget.dataset.province,
        e.currentTarget.dataset.city,
        e.currentTarget.dataset.districts
      ],
      sendstreet: e.currentTarget.dataset.street
    })
    console.log(e.currentTarget.dataset.sendphone)
  },

  addaddress: function(e) {
    this.setData({
      showModal: true,
      sendname: '',
      sendphone: '',
      sendphone: '',
      region: ['', '', ''],
      sendstreet: '',
      urlabc :'http://localhost:8080/ketuan/applet/users/addaddress?userid=01'
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
  onConfirm: function() { //单下保存按钮时，提交修改
    console.log('ok' + this.data.urlabc)
    console.log(this.data.sendPhone_edit,)
    wx.request({
      url: 'http://localhost:8080/ketuan/applet/users/addaddress?userid=01',
      data: {
        sendName: this.data.sendName_edit,
        sendPhone: this.data.sendPhone_edit,
        userstreet: this.data.street_edit,
        userprovince: this.data.province_edit,
        usercity: this.data.city_edit,
        userdistricts: this.data.districts_edit
      },
      success: function (res) {
        console.log(res)
        console.log('this is ok')
      },
      complete: function (res) {
        console.log('not ok')
      }

    })
    

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.request({
      url: 'http://localhost:8080/ketuan/applet/users/getalladdress?userid=01',
      success: function(res) {
        console.log(res.data)
        that.setData({
          addresslist: res.data.data.alladdress
        })
      }
    })
  },
  setdefault: function(e) { //设默认地址
    console.log(e.detail.value)
    wx.request({
      url: 'http://localhost:8080/ketuan/applet/users/setdefaultaddress?userid=01&fdid=' + e.detail.value,
    })
  },
  deladdress: function(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除此收货地址么？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定' + e.currentTarget.dataset.id)
          wx.request({
            url: 'http://localhost:8080/ketuan/applet/users/deleteaddress?userid=01&fdid='+e.currentTarget.dataset.id,
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  bindRegionChange: function(e) { //地区值改变时数据绑定在data中
    console.log('picker发送选择改变，携带值为', e.detail.value[0])
    this.setData({
      region_edit: e.detail.value,
      province_edit: e.detail.value[0],
      city_edit: e.detail.value[1],
      districts_edit: e.detail.value[2],
      region: [e.detail.value[0], e.detail.value[1], e.detail.value[2], ]
    })
  },
  inputChange1: function(e) { //第一个input值改变时数据绑定在data中
    console.log(e.detail.value)
    this.setData({
      sendName_edit: e.detail.value
    })
  },

  inputChange2: function(e) {
    console.log(e.detail.value)
    this.setData({
      sendPhone_edit: e.detail.value
    })
  },

  inputChange3: function(e) {
    console.log(e.detail.value)
    this.setData({
      street_edit: e.detail.value
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