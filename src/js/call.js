Function.prototype.call2 = function( context ) {
    // 不传this或者null，默认window
    var context = context || window;
    // this指向调用call2的函数
    context.fn = this;
    var args = [];
    for ( var i = 1, len = arguments.length; i < len; i++ ) {
        args.push( arguments[ i ] );
        // args.push( 'arguments[' + i + ']' );
    }
    var result = context.fn( ...args );
    // eval将字符串作为函数执行
    // var result = eval( 'context.fn(' + args + ')' );
    delete context.fn
    return result;
}


export default Function


// 实现思路
var foo = {
    value: 1
};

function bar() {
    // console.log( this.value );
}
bar.call( foo ); // 1
// 试想当调用 call 的时候，把 foo 对象改造成如下：
var foo = {
    value: 1,
    bar: function() {
        // console.log( this.value )
    }
};
foo.bar(); // 1


// 所以我们模拟的步骤可以分为：
// 1. 将函数设为对象的属性
// 2. 执行该函数
// 3. 删除该函数