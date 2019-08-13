var Plane = function() {
    this.blood = 100;
    this.attackLevel = 1;
    this.defenseLevel = 1;
};

var plane = new Plane();
plane.blood = 500;
plane.attackLevel = 10;
plane.defenseLevel = 7;

var clonePlane = Object.create( plane );
console.log( clonePlane ); // 输出：Object {blood: 500, attackLevel: 10, defenseLevel: 7}

//在不支持Object.create 方法的浏览器中，则可以使用以下代码：
Object.create = Object.create || function( obj ) {
    var F = function() {};
    F.prototype = obj;
    return new F();
}


var obj1 = new Object();
var obj2 = {};

console.log( Object.getPrototypeOf( obj1 ) === Object.prototype ); // 输出：true
console.log( Object.getPrototypeOf( obj2 ) === Object.prototype ); // 输出：true


//再来看看如何用new 运算符从构造器中得到一个对象，下面的代码我们再熟悉不过了：
function Person( name ) {
    this.name = name;
};

Person.prototype.getName = function() {
    return this.name;
};

var a = new Person( 'sven' )
console.log( a.name ); // 输出：sven
console.log( a.getName() ); // 输出：sven
console.log( Object.getPrototypeOf( a ) === Person.prototype ); // 输出：true

//在Chrome 和Firefox 等向外暴露了对象__proto__属性的浏览器下，我们可以通过下面这段代码来理解new 运算的过程：
function Person( name ) {
    this.name = name;
};

Person.prototype.getName = function() {
    return this.name;
};

var objectFactory = function() {
    var obj = new Object(), // 从Object.prototype 上克隆一个空的对象
        Constructor = [].shift.call( arguments ); // 取得外部传入的构造器，此例是Person
    obj.__proto__ = Constructor.prototype; // 指向正确的原型
    var ret = Constructor.apply( obj, arguments ); // 借用外部传入的构造器给obj 设置属性
    return typeof ret === 'object' ? ret : obj; // 确保构造器总是会返回一个对象
};

var a = objectFactory( Person, 'sven' );

console.log( a.name ); // 输出：sven
console.log( a.getName() ); // 输出：sven
console.log( Object.getPrototypeOf( a ) === Person.prototype ); // 输出：true





function Fn() {
    this.x = 100;
    this.sum = function() {}
}
Fn.prototype.getX = function() {
    console.log( this.x );
};
Fn.prototype.sum = function() {};
var f1 = new Fn();
var f2 = new Fn();

console.log( Fn.prototype.constructor === Fn ); // true

class Point {
    // ...
}

typeof Point // "function"
Point === Point.prototype.constructor // true

// constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象。
class Foo {
    constructor() {
        return Object.create( null );
    }
}

new Foo() instanceof Foo
// false

//   类必须使用new调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。
class Foo {
    constructor() {
        return Object.create( null );
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