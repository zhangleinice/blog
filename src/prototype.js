function Fn() {
    this.x = 100;
    this.sum = function () {}
}
Fn.prototype.getX = function () {
    console.log(this.x);
};
Fn.prototype.sum = function () {
};
var f1 = new Fn();
var f2 = new Fn();

console.log(Fn.prototype.constructor === Fn);   // true

class Point {
    // ...
}
  
typeof Point // "function"
Point === Point.prototype.constructor // true

// constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象。
class Foo {
    constructor() {
      return Object.create(null);
    }
  }
  
  new Foo() instanceof Foo
  // false

//   类必须使用new调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。
class Foo {
    constructor() {
      return Object.create(null);
    }
  }
  
  Foo()
  // TypeError: Class constructor Foo cannot be invoked without 'new'



//   事实上，类的所有方法都定义在类的prototype属性上面。
  class Point {
    constructor() {
      // ...
    }
  
    toString() {
      // ...
    }
  
    toValue() {
      // ...
    }
  }
  
  // 等同于
  
  Point.prototype = {
    constructor() {},
    toString() {},
    toValue() {},
  };