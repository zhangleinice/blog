// var myname = "极客时间"
// function showName(){ 
//     console.log(myname); 
//     if(0){ 
//         var myname = "极客邦" 
//     } 
//     console.log(myname);
// }
// // showName()
// function foo(){ 
//     var a = 1 
//     let b = 2 
//     { 
//         let b = 3 
//         // console.log(c);
//         var c = 4 
//         // console.log(d);
//         let d = 5 
//         console.log(a) 
//         console.log(b) 
//     } 
//     console.log(b) 
//     console.log(c) 
//     console.log(d)
// } 
// foo()

// function bar() {
//     console.log(myName)
// }
// function foo() {
//     var myName = "极客邦"
//     bar()  // 极客时间
// }
// var myName = "极客时间"
// foo()


// function bar() {
//     var myName = "极客世界"
//     let test1 = 100
//     if (1) {
//         let myName = "Chrome浏览器"
//         console.log(test)   // 1
//     }
// }
// function foo() {
//     var myName = "极客邦"
//     let test = 2
//     {
//         let test = 3
//         bar()
//     }
// }
// var myName = "极客时间"
// let myAge = 10
// let test = 1
// foo()


let userInfo = {
    name:"jack.ma",
    age:13,
    sex:'male',
    updateInfo:function(){
      //模拟xmlhttprequest请求延时
      setTimeout(() => {
        this.name = "pony.ma"
        this.age = 39
        this.sex = 'female'
      },100)
    //   function a() {
    //     this.name = "pony.ma"
    //     this.age = 39
    //     this.sex = 'female'
    //   }
    }
  }
  
  userInfo.updateInfo()
  console.log(userInfo);
