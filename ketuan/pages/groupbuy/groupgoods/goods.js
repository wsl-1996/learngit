Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:'商品',
    detail: '详情',
    comment: '评价',
    goodsbanner:[
      "../../../images/ad3.jpg",
      "../../../images/sls.jpg",
      "../../../images/ad3.jpg"
    ],
    groupprice:"团购价",
    originalprice: "原价",
    tmprice: "天猫价",
    jdprice: "京东价",
    groupPrice: "￥92",
    originalPrice: "￥201",
    tmPrice: "￥95",
    jdPrice: "￥98",
    shareicon:"../../../images/share.png",
    maininfo:"【正品保证】 厂家发货 夏日清凉套装 全棉布料 吸水顺干",
    chosen:"已选",
    chosenstyle:"红蓝白条纹",
    cashback:"返现比例",
    cashbackratio:"1.5%",
    cashrule:"返现规则",
    goodsShow:[
       "../../../images/IMG_1264.JPG",
        "../../../images/IMG_1265.JPG" ,
        "../../../images/IMG_1266.JPG" ,
        "../../../images/IMG_1267.JPG" ,
        "../../../images/IMG_1268.JPG" ,

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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