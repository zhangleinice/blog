/*
 * @Author: rocky 
 * @since: 2019-12-17 19:16:00 
 * 
 * 单例模式
 * 保证一个类只有一个实例，并提供全局访问
 * 
 * 用变量缓存逻辑，防止重复创建
 * 使用场景： 开销大的逻辑，可用单例
 */


/**
 * 不直接new Singleton（）创建实例
 * 只能使用Singleton.getInstance调用，该方法内部只new 一次
 */
var Singleton = function( name ) {
    this.name = name;
};
Singleton.prototype.getName = function() {
    alert( this.name );
};
Singleton.getInstance = ( function() {
    var instance = null;
    return function( name ) {
        if ( !instance ) {
            // 只创建一次实例
            instance = new Singleton( name );
        }
        return instance;
    }
} )();

var a = Singleton.getInstance( 'sven1' );
var b = Singleton.getInstance( 'sven2' );
console.log( a === b ); // true

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

var createLoginLayer = function() {
    var div = document.createElement( 'div' );
    div.innerHTML = '我是登录浮窗';
    div.style.display = 'none';
    document.body.appendChild( div );
    return div;
};
var createSingleLoginLayer = getSingle( createLoginLayer );
document.getElementById( 'loginBtn' ).onclick = function() {
    var loginLayer = createSingleLoginLayer();
    loginLayer.style.display = 'block';
};

//下面我们再试试创建唯一的iframe 用于动态加载第三方页面：
var createSingleIframe = getSingle( function() {
    var iframe = document.createElement( 'iframe' );
    document.body.appendChild( iframe );
    return iframe;
} );
document.getElementById( 'loginBtn' ).onclick = function() {
    var loginLayer = createSingleIframe();
    loginLayer.src = 'http://baidu.com';
};

/**
 * jQuery
 */
if ( window.jQuery != null ) {
    return window.jQuery
} else {
    // 只实例化一次
    return new jQuery()
}