var app = getApp();
Page({
  data: {
    id: 'id号',
    images: '图片',
    title: '标题',
    grouplist: []
  },


  onLoad: function(event) {
    this.getgrouplist()

  },

  getgrouplist:function(){
    var that = this
    wx.request({
      url: 'http://localhost:8080/ketuan/applet/groups/getgroup?page=1&state=1',
      success: function (res1) {
        that.setData({
          testshuju: res1.data.data.groups
        })
        console.log(res1.data.data.groups)
      }
    })
  },
  onbindblur: function(event) {
    this.setData({
      text: event.detail.value
    })
    console.log(this.data.text)
  },

  onsearch: function(e) {
    var that = this
    wx.request({
      url: 'url',
      data: {
        sessionid: '001',
        key: this.data.text
      },
      success: function(res) {
        that.setData({
          grouplist: res.data.data
        })
      }
    })
  },

  tapgoods: function(e) {
    wx.navigateTo({
      url: 'groupgoods/goods?productid=' + e.currentTarget.dataset.productid
    })
  }

})