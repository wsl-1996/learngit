var app = getApp();
const formatTime = date => {
  // const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [ month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function convertToStarsArray(stars) {
  var num = stars
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    }
    else {
      array.push(0);
    }
  }
  return array;
}

function Register(){
   register() 
  console.log("this is Register")
  // console.log(temp)
}

function register(res) {
  var tempdata=res
  console.log("this is register temp")
  console.log(temp)
}
// function Register({register(){}})

function RndNum() {
  var rnd = "R";
  for (var i = 0; i < 8; i++)
    rnd += Math.floor(Math.random() * 10);
  return rnd;
}

function getnum(num){
  var s=num.toString()
  if(s.indexOf('.')!=-1){
    var result = s.substring(0, s.indexOf('.') + 3)
    return result
  }
  else return num
  
}

function tohot(point){
  var str=Number(point*100).toFixed(0)  
  str +='℃'
  return str
}

function topercent(point) {
  var str = Number(point * 100).toFixed(0)
  str += '%'
  return str
}

function countdown(lasttime) {         //倒计时 ，参数为截止时间戳
  var date = new Date()
  var now = date.getTime()
  var leftTime = lasttime - now
  var d, h, m, s
  if (leftTime > 0) {
    d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
    h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
    m = Math.floor(leftTime / 1000 / 60 % 60);
    s = Math.floor(leftTime / 1000 % 60);
    h = this.checkTime(h)
    m = this.checkTime(m)
    s = this.checkTime(s)
  }
  else{
    d=0
    h = this.checkTime(0)
    m = this.checkTime(0)
    s = this.checkTime(0)
  }
  return { d, h, m, s }
}

function checkTime(i) { //将0-9的数字前面加上0，例1变为01 
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function tworandom(max,min){
  var result=Math.random()*(max-min)+min+0.01
  return result
}

function socketlink(){
  console.log('sockettype',app.globalData.socketCloseType)
  var that = this
  
  var msg = "{ messageFrom:" + "'" + wx.getStorageSync('userid') + "'" + ",messageContent:'connect',messageType: '-1'}"
  wx.connectSocket({
    url: app.globalData.g_socket + '/ketuan/websocket'
  })
  wx.onSocketOpen(function (res) {
    sendSocketMessage(msg)
    console.log("+++++++++++++开始监听+++++++++++++")
  })

  function sendSocketMessage(msg) {
    wx.sendSocketMessage({
      data: msg,
    })
  }

  wx.onSocketMessage(function (res) {  //监听消息传入

    console.log(res)
    console.log('this is res.data')
    console.log(res.data)
    var tempres = JSON.parse(res.data)
    console.log('this is tempres', tempres)
    console.log(tempres.messageContent)
    app.globalData.g_tempmsgfrom = tempres.messageFrom
    if (tempres.messageType == '4') {
      var redpacketContent = JSON.parse(tempres.messageContent)
    }
    var temp = {
      is_show_right: 0,
      msgid: tempres.id,
      messageContent: tempres.messageType == '4' ? redpacketContent.explain : tempres.messageContent,
      redpacketsum: tempres.messageType == '4' ? redpacketContent.sum : null,
      messageFrom: tempres.messageFrom,
      messageto: app.globalData.userid,
      toView: util.RndNum(),
      contentType: parseInt(tempres.contentType),
      messageType: parseInt(tempres.messageType),
      createtime: util.formatTime(new Date()),
      headOwner: tempres.headOwner,
    }
    var tampstorage = wx.getStorageSync('centendata' + tempres.messageFrom) //从缓存中把对应ID的数组取出来
    if (tampstorage == '') {
      tampstorage = []
    }
    tampstorage.push(temp)
    wx.setStorageSync('centendata' + tempres.messageFrom, tampstorage) //接收的消息存入缓存
    app.globalData.g_msgfromid = tempres.messageFrom,

      that.setmsglist(temp.headOwner, temp.messageContent, temp.messageContent, temp.messageFrom)
    app.globalData.g_newmsg = true
    console.log('+++++++++++++++您有新的消息了+++++++++++++++')
    wx.showToast({
      title: '新消息~！',
    })

  })

  wx.onSocketClose(function () {
    console.log('listenlist 监听socket close')
  })

  wx.onSocketError(function () {
    console.log('listenlist 监听socket error')
  })
}

module.exports = {
  formatTime: formatTime,
  convertToStarsArray: convertToStarsArray,
  register: register,
  Register: Register,
  RndNum: RndNum,
  getnum: getnum,
  topercent: topercent,
  countdown: countdown,
  checkTime: checkTime,
  tohot:tohot,
  socketlink: socketlink
}
