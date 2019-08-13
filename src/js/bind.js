Function.prototype.bind2 = function( context ) {
    if ( typeof this !== "function" ) {
        throw new Error( "Function.prototype.bind - what is trying to be bound is not callable" );
    }

    var self = this;
    // 调bind方法时的参数
    var args = Array.prototype.slice.call( arguments, 1 );

    var fNOP = function() {};

    var fBound = function() {
        // 调bind方法后返回函数的参数
        var bindArgs = Array.prototype.slice.call( arguments );
        return self.apply( this instanceof fNOP ? this : context, args.concat( bindArgs ) );
    }

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}


// 实现思路
// 1. 返回一个函数
// 2. 可以传入参数
// 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。

// 传参
var foo = {
    value: 1
};

function bar( name, age ) {
    console.log( this.value );
    console.log( name );
    console.log( age );

}

var bindFoo = bar.bind( foo, 'daisy' ); //第一次传参
bindFoo( '18' ); // 第二次传参
// 1
// daisy
// 18


// 使用new来调用

var value = 2;

var foo = {
    value: 1
};

function bar( name, age ) {
    this.habit = 'shopping';
    console.log( this.value );
    console.log( name );
    console.log( age );
}

bar.prototype.friend = 'kevin';

var bindFoo = bar.bind( foo, 'daisy' );

var obj = new bindFoo( '18' );
// undefined
// daisy
// 18
console.log( obj.habit );
console.log( obj.friend );
// shopping
// kevin