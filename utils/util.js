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
  var result=s.substring(0,s.indexOf('.')+3)
  return result
}

function topercent(point){
  var str=Number(point*100).toFixed(0)  
  str +='℃'
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

module.exports = {
  formatTime: formatTime,
  convertToStarsArray: convertToStarsArray,
  register: register,
  Register: Register,
  RndNum: RndNum,
  getnum: getnum,
  topercent: topercent,
  countdown: countdown,
  checkTime: checkTime
}
