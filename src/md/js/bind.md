```js
/**
 * bind
 * 第一版
 * 改变this，返回一个函数，merge两个函数的参数
 */
Function.prototype.bind2 = function(context) {
  var self = this;
  // 获取bind2函数从第二个参数到最后一个参数
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    // 这个时候的arguments是指bind返回的函数传入的参数
    var bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(context, args.concat(bindArgs));
  };
};
/**
 * 第二版(可以使用new来调用)
 * 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数
 */
Function.prototype.bind2 = function(context) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var fBound = function() {
    var bindArgs = Array.prototype.slice.call(arguments);
    // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
    // 以上面的是 demo 为例，如果改成 `this instanceof fBound ? null : context`，实例只是一个空对象，将 null 改成 this ，实例会具有 habit 属性
    // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
    return self.apply(
      this instanceof fBound ? this : context,
      args.concat(bindArgs)
    );
  };
  // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
  fBound.prototype = this.prototype;
  return fBound;
};
/**
 * 最终版
 */
Function.prototype.bind2 = function(context) {
  if (typeof this !== "function") {
    throw new Error(
      "Function.prototype.bind - what is trying to be bound is not callable"
    );
  }

  var self = this; // bar
  // 调bind方法时的参数
  var args = Array.prototype.slice.call(arguments, 1);

  var fNOP = function() {};

  var fBound = function() {
    // 调bind方法后返回函数的参数
    var bindArgs = Array.prototype.slice.call(arguments);
    // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
    // 以上面的是 demo 为例，如果改成 `this instanceof fBound ? null : context`，实例只是一个空对象，将 null 改成 this ，实例会具有 habit 属性
    // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
    return self.apply(
      this instanceof fNOP ? this : context,
      args.concat(bindArgs)
    );
  };
  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
};

// 实现思路
// 1. 返回一个函数
// 2. 可以传入参数
// 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。

// 可以分两次传参
var foo = {
  value: 1
};

function bar(name, age) {
  // console.log( this.value );
  // console.log( name );
  // console.log( age );
}

var bindFoo = bar.bind(foo, "daisy"); //第一次传参
bindFoo("18"); // 第二次传参
// 1
// daisy
// 18

// 2.使用new来调用

// var value = 2;

// var foo = {
//     value: 1
// };

// function bar( name, age ) {
//     this.habit = 'shopping';
//     console.log( this.value );
//     console.log( name );
//     console.log( age );
// }

// bar.prototype.friend = 'kevin';

// var bindFoo = bar.bind( foo, 'daisy' );

// var obj = new bindFoo( '18' );
// // undefined
// // daisy
// // 18
// console.log( obj.habit );
// console.log( obj.friend );
// shopping
// kevin
```
