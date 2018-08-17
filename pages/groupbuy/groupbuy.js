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
  getgrouplist: function () {
    var that = this
    wx.request({
      url: app.globalData.g_ip + '/ketuan/applet/groups/getgroup?page=1&state=1',
      success: function (res) {
        that.setData({
          grouplist: res.data.data.groups
        })
        that.showgrouplist()
        console.log(res.data.data.groups)
      }
    })
  },
  showgrouplist:function(){
    this.setData({
      testshuju: this.data.grouplist
    })
    console.log('this is showgrouplist')
    console.log(this.data.testshuju)
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
      url: app.globalData.g_ip + '/ketuan/applet/groups/search',
      data: {
        keyword: this.data.text
      },
      success: function(res) {
        that.setData({
          testshuju: res.data.data.groups,
          grouplist: res.data.data.groups
        })
        console.log(res.data)
      }
    })
  },

  tapgoods: function(e) {
    wx.navigateTo({
      url: 'groupgoods/goods?productid=' + e.currentTarget.dataset.productid + '&groupid=' + e.currentTarget.dataset.groupid
    })
  },
  onShareAppMessage: function () {
    console.log('+++++++转发++++++++++')
  }
})