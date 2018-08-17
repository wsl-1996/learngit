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

module.exports = {
  formatTime: formatTime,
  convertToStarsArray: convertToStarsArray,
  register: register,
  Register: Register,
  RndNum: RndNum
}
