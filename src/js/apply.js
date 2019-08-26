Function.prototype.myApply = function( context, arr ) {
    var context = Object( context ) || window;
    context.fn = this;

    var result;
    if ( !arr ) {
        result = context.fn();
    } else {
        // var args = [];
        // for ( var i = 0, len = arr.length; i < len; i++ ) {
        //     args.push( 'arr[' + i + ']' );
        // }
        // result = eval( 'context.fn(' + args + ')' )
        result = context.fn( arr )
    }

    delete context.fn
    return result;
}

const obj = {
    name: 'zhangsan',
    // getName() {
    //     console.log( this.name );
    // }
}

function a() {
    console.log( this.name );
}

a.myApply( obj, [ 1, 2 ] )

export default Function