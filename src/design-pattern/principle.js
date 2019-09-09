var createLoginLayer = ( function() {
    var div;
    return function() {
        if ( !div ) {
            div = document.createElement( 'div' );
            div.innerHTML = '我是登录浮窗';
            div.style.display = 'none';
            document.body.appendChild( div );
        }
        return div;
    }
} )();

/**
 *  单一职能原则 （SRP）
 */
var getSingle = function( fn ) { // 获取单例
    var result;
    return function() {
        return result || ( result = fn.apply( this, arguments ) );
    }
};
var createLoginLayer = function() { // 创建登录浮窗
    var div = document.createElement( 'div' );
    div.innerHTML = '我是登录浮窗';
    document.body.appendChild( div );
    return div;
};
var createSingleLoginLayer = getSingle( createLoginLayer );
var loginLayer1 = createSingleLoginLayer();
var loginLayer2 = createSingleLoginLayer();
alert( loginLayer1 === loginLayer2 ); // 输出： true


/**
 *  开放-封闭原则
 */
Function.prototype.after = function( afterfn ) {
    var __self = this;
    return function() {
        var ret = __self.apply( this, arguments );
        afterfn.apply( this, arguments );
        return ret;
    }
};
// 不修改源代码的情况下，打印一行日志
window.onload = ( window.onload || function() {} ).after( function() {
    console.log( document.getElementsByTagName( '*' ).length );
} );