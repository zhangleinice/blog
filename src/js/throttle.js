/**
 * 节流
 * 函数的触发不是由用户直接控制的
 * @param {*} fn 节流函数
 * @param {*} delay 节流时间
 *  函数节流会用在比input, keyup更频繁触发的事件中，如resize, touchmove, mousemove, scroll。
 *  throttle 会强制函数以固定的速率执行。因此这个方法比较适合应用于动画相关的场景。
 */
function throttle( fn, delay ) {
    var timeout
    var start = new Date;
    var delay = delay || 160
    return function() {
        var context = this,
            args = arguments,
            curr = new Date() - 0
        clearTimeout( timeout ) //总是干掉事件回调
        if ( curr - start >= delay ) {
            console.log( "now", curr, curr - start ) //注意这里相减的结果，都差不多是160左右
            fn.apply( context, args ) //只执行一部分方法，这些方法是在某个时间段内执行一次
            start = curr
        } else {
            // 如果时间比较短，也执行一次防抖
            timeout = setTimeout( function() {
                fn.apply( context, args )
            }, delay );
        }
    }
}