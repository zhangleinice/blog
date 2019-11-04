/**
 * 防抖
 * 如果输入快，上一次的定时器还没执行完，就被清除了。
 * 如果输入慢，上一次定时器是可以执行的
 * @param {*} fun 延迟执行的方法
 * @param {*} delay  延迟执行的时间
 * 这个方法的重点是，它在用户不触发事件的时，才触发动作，并且抑制了本来在事件中要执行的动作。
 */
function debounce( fn, delay ) {
    let timer;
    return function() {
        var context = this,
            args = arguments
        clearTimeout( timer )
        timer = setTimeout( () => {
            // fn.call( context, ...args )
            fn.apply( context, args )
        }, delay )
    }
}

function debounce(fn, delay){
    let time;
    return function(){
        const args = arguments
        const that = this
        clearTimeout(time)
        time = setTimeout(function(){
            fn.apply(that, args)
        }, delay)
    }
}