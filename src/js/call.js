Function.prototype.call2 = function( context ) {
    var context = context || window;
    // this指向调用call2的函数
    context.fn = this;
    var args = [];
    for ( var i = 1, len = arguments.length; i < len; i++ ) {
        args.push( arguments[ i ] );
        // args.push( 'arguments[' + i + ']' );
    }
    // Array.prototype.slice.call(arguments, 1)
    // Array.from(arguments).slice(1)
    // [...arguments].slice(1)
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



Function.prototype.mycall = function(context = window){
    const args = [...arguments].slice(1)
    context.fn = this
    context.fn(args)
    delete context.fn
}

Function.prototype.myApply = function(context, arr=[]){
    context.fn = this
    const result = context.fn(arr)
    delete context.fn
    return result
}

Function.prototype.myBind = function(context=window) {
    const self = this;
    const args = [].slice.call(arguments, 1)
    return function() {
        const args2 = [].slice.call(arguments)
        return self.apply(context, [...args, ...args2])
    }
}


Function.prototype.call = function(context = window){
    context.fn = this
    context.fn([...arguments].slice(1))
    delete context.fn
}