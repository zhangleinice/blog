function throttle( fun, delay ) {
    let last, deferTimer
    return function( args ) {
        let that = this
        let _args = arguments
        let now = +new Date()
        if ( last && now < last + delay ) {
            clearTimeout( deferTimer )
            deferTimer = setTimeout( function() {
                last = now
                fun.apply( that, _args )
            }, delay )
        } else {
            last = now
            fun.apply( that, _args )
        }
    }
}

let throttleAjax = throttle( ajax, 1000 )

let inputc = document.getElementById( 'throttle' )
inputc.addEventListener( 'keyup', function( e ) {
    throttleAjax( e.target.value )
} )