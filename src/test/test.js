// const func = a => {
//     if ( a === 1 ) {
//         console.log( 1 );
//         return
//     }
//     if ( a === 2 ) {
//         console.log( 2 );
//         return console.log( 3 );
//     }
//     console.log( 4 );
//     if ( a === 5 ) {
//         console.log( 5 );
//         return
//     }
// }

// func( 2 )
var print = function( i ) {
    console.log( i );
};
var func = function() {
    for ( var i = 0; i < 10; i++ ) {
        for ( var j = 0; j < 10; j++ ) {
            if ( i * j > 30 ) {
                return print( i );
            }
        }
    }
};
func()