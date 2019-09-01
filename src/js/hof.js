// 1.函数作为参数传递（把变化的逻辑放到函数参数中，分离代码中变化和不变的部分）

//比如，我们想在页面中创建100 个div 节点，然后把这些div 节点都设置为隐藏。下面是一种编写代码的方式：
var appendDiv = function() {
    for ( var i = 0; i < 100; i++ ) {
        var div = document.createElement( "div" );
        div.innerHTML = i;
        document.body.appendChild( div );
        div.style.display = "block";
    }
};
appendDiv();

//于是我们把div.style.display = 'none'这行代码抽出来，用回调函数的形式传入appendDiv方法：
var appendDiv = function( callback ) {
    for ( var i = 0; i < 100; i++ ) {
        var div = document.createElement( "div" );
        div.innerHTML = i;
        document.body.appendChild( div );
        if ( typeof callback === "function" ) {
            callback( div );
        }
    }
};
appendDiv( function( node ) {
    node.style.display = "none";
} );
// Array.prototype.sort
[ 1, 4, 3 ].sort( function( a, b ) {
    return a - b;
} );

[ 1, 4, 3 ].sort( function( a, b ) {
    return b - a;
} );

// 2. 函数作为返回值输出
// 判断数据结构
var isString = function( obj ) {
    return Object.prototype.toString.call( obj ) === "[object String]";
};
var isArray = function( obj ) {
    return Object.prototype.toString.call( obj ) === "[object Array]";
};
var isNumber = function( obj ) {
    return Object.prototype.toString.call( obj ) === "[object Number]";
};

// 两次传参
var isType = function( type ) {
    // 提前植入参数type
    return function( obj ) {
        // 所需判断的数据源
        return Object.prototype.toString.call( obj ) === "[object " + type + "]";
    };
};

var isString = isType( "String" );
var isArray = isType( "Array" );
var isNumber = isType( "Number" );

console.log( isArray( [ 1, 2, 3 ] ) ); // 输出：true

/**
 * 通用惰性单例js
 * @param {*} fn 创建对象的方法
 */
var getSingle = function( fn ) {
    // 闭包缓存上一个的结果
    var result;
    return function() {
        // 只创建一次
        return result || ( result = fn.apply( this, arguments ) );
    }
};

// 3. AOP(面向切面编程，装饰器模式)
Function.prototype.before = function( beforefn ) {
    var __self = this; // 保存原函数的引用
    return function() {
        // 返回包含了原函数和新函数的"代理"函数
        beforefn.apply( this, arguments ); // 执行新函数，修正this
        return __self.apply( this, arguments ); // 执行原函数，返回this，链式调用
        // __self.apply( this, arguments );
        // return __self
    };
};

Function.prototype.after = function( afterfn ) {
    var __self = this;
    return function() {
        var ret = __self.apply( this, arguments );
        afterfn.apply( this, arguments );
        return ret;
    };
};

var func = function() {
    console.log( 2 );
};

func = func
    .before( function() {
        console.log( 1 );
    } )
    .after( function() {
        console.log( 3 );
    } );

func();

// 4.分时函数
var ary = [];
for ( var i = 1; i <= 1000; i++ ) {
    ary.push( i ); // 假设ary 装载了1000 个好友的数据
}

// 再短时间向浏览器大量添加DOM节点显然会让浏览器吃不消
var renderFriendList = function( data ) {
    for ( var i = 0, l = data.length; i < l; i++ ) {
        var div = document.createElement( "div" );
        div.innerHTML = i;
        document.body.appendChild( div );
    }
};

renderFriendList( ary );

var timeChunk = function( ary, fn, count ) {
    var obj, t;
    var len = ary.length;
    var start = function() {
        for ( var i = 0; i < Math.min( count || 1, ary.length ); i++ ) {
            var obj = ary.shift();
            fn( obj );
        }
    };
    return function() {
        t = setInterval( function() {
            if ( ary.length === 0 ) {
                // 如果全部节点都已经被创建好
                return clearInterval( t );
            }
            start();
        }, 200 ); // 分批执行的时间间隔，也可以用参数的形式传入
    };
};

var ary = [];
for ( var i = 1; i <= 1000; i++ ) {
    ary.push( i );
}
var renderFriendList = timeChunk(
    ary,
    function( n ) {
        var div = document.createElement( "div" );
        div.innerHTML = n;
        document.body.appendChild( div );
    },
    8
);
renderFriendList();

/**
 *  5.惰性加载函数
 */
var addEvent = function( elem, type, handler ) {
    if ( window.addEventListener ) {
        return elem.addEventListener( type, handler, false );
    }
    if ( window.attachEvent ) {
        return elem.attachEvent( "on" + type, handler );
    }
};

var addEvent = ( function() {
    if ( window.addEventListener ) {
        return function( elem, type, handler ) {
            elem.addEventListener( type, handler, false );
        };
    }
    if ( window.attachEvent ) {
        return function( elem, type, handler ) {
            elem.attachEvent( "on" + type, handler );
        };
    }
} )();